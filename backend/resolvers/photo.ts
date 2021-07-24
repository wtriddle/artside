import { GraphQLUpload } from "apollo-server-express";
import { User } from "../entity/User";
import { MyContext } from "MyContext";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Photo } from "../entity/Photo";
import { FieldError } from "../types/ErrorTypes";
import { Upload } from "../types/UploadType";
import cloudinary from "../utils/createCloudinaryClient";
import { getDateTime } from "../utils/getDateTimeForPSQL";

@ObjectType()
class PhotoResponse {
  @Field(() => Photo, { nullable: true })
  photo?: Photo;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
class PhotoStream {
  @Field(() => [Photo], { nullable: true })
  photos: Photo[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  hasMore: boolean;
}

@Resolver(Photo)
export class PhotoResolver {
  @FieldResolver(() => User)
  async user(@Root() photo: Photo): Promise<User | null> {
    const user = await User.findOne(photo.userId);
    if (!user) {
      return null;
    }
    return user;
  }

  @FieldResolver(() => String)
  async type(): Promise<string | null> {
    return "photo";
  }

  @Mutation(() => PhotoResponse)
  async photoUpload(
    @Arg("file", () => GraphQLUpload!) file: Upload,
    @Arg("description", () => String, { nullable: true }) description: string,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { req }: MyContext
  ): Promise<PhotoResponse> {
    const photo = await Photo.create({
      title,
      description,
      userId: req.session.userId,
    }).save();

    if (!photo) {
      console.log("Could not upload photo");
      return {
        errors: [
          {
            field: "photo",
            message:
              "The photo did not save in the database correctly, please try again",
          },
        ],
      };
    }

    if (typeof file === "string") {
      await cloudinary.v2.uploader.upload(
        file,
        {
          public_id: "photos/" + photo.id,
          chunk_size: Math.pow(6.4, 7),
          invalidate: true,
        },
        (error, result) => {
          console.log(result, error);
          return {
            errors: [
              {
                field: "photo",
                message: "The photo did not upload correctly, please try again",
              },
            ],
          };
        }
      );
    } else {
      console.log("The upload photo was not a data url string");
      return {
        errors: [
          {
            field: "photo",
            message: "The photo failed to upload to cloudinary properly",
          },
        ],
      };
    }
    console.log("Photo Upload Success");
    return {
      photo,
    };
  }

  @Query(() => PhotoStream)
  async photoStream(
    // Assuming stream of photos is from a single category
    // If tags were added, then a tags array could be passed and a query could be run with the tags
    // To filter the photos and apply a date stream showing the latest photos as well
    // @Arg("tags", () => [String]) tags: string[] Possible additon later on
    @Arg("n", () => Int) n: number,
    @Arg("date", () => String) inputDate: string,
    @Arg("username", () => String, { nullable: true }) username?: string | null
  ): Promise<PhotoStream> {
    let { date, time } = getDateTime(inputDate);
    let query: string;

    if (username != null) {
      const user = await User.findOne({ where: { username } });
      query = ` 
        SELECT * 
        FROM photo AS p
        WHERE p."createdAt" < '${date} ${time}'
        AND p."userId" = '${user?.id}'
        ORDER BY p."createdAt" DESC
        LIMIT ${n}
        `;
    } else {
      query = ` 
        SELECT * 
        FROM photo AS p
        WHERE p."createdAt" < '${date} ${time}'
        ORDER BY p."createdAt" DESC
        LIMIT ${n}
        `;
    }

    const photos: Photo[] = await getConnection().query(query);
    /* 
    {
      id: 1,
      createdAt: Date object
      title: "Hello post",
      description: "This is my first post",
      userId: 5
      user : {
        ...
      }

    }
    
    
    */

    console.log("photos", photos);

    if (photos.length == 0) {
      return {
        photos: [],
        hasMore: false,
      };
    }

    let finalDateInFeed = photos[photos.length - 1].createdAt;
    let { date: mDate, time: mTime } = getDateTime(finalDateInFeed);

    const more = await getConnection().query(
      `
        SELECT *
        FROM photo AS p
        WHERE p."createdAt" < '${mDate} ${mTime}'
        ORDER BY p."createdAt" DESC 
        LIMIT 1
      `
    );

    return {
      photos,
      hasMore: more.length !== 0 ? true : false,
    };
  }
}
