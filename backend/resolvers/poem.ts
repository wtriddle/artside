import { User } from "../entity/User";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { FieldError } from "../types/ErrorTypes";
import { Poem } from "../entity/Poem";
import { MyContext } from "../MyContext";
import { getDateTime } from "../utils/getDateTimeForPSQL";

@InputType()
class NewPoemInputs {
  @Field()
  poem: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
class PoemStream {
  @Field(() => [Poem])
  poems: Poem[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  hasMore: boolean;
}

@Resolver(Poem)
export class PoemResolver {
  @FieldResolver(() => User)
  async user(@Root() poem: Poem): Promise<User | null> {
    const user = await User.findOne(poem.userId);
    if (!user) {
      return null;
    }
    return user;
  }

  @FieldResolver(() => String)
  async type(): Promise<string | null> {
    return "poem";
  }

  @Mutation(() => Poem)
  async uploadPoem(
    @Arg("inputs", () => NewPoemInputs) inputs: NewPoemInputs,
    @Ctx() { req }: MyContext
  ): Promise<Poem> {
    return Poem.create({ ...inputs, userId: req.session.userId }).save();
  }

  @Query(() => PoemStream)
  async poemStream(
    // Assuming stream of photos is from a single category
    // If tags were added, then a tags array could be passed and a query could be run with the tags
    // To filter the photos and apply a date stream showing the latest photos as well
    // @Arg("tags", () => [String]) tags: string[] Possible additon later on
    @Arg("n", () => Int) n: number,
    @Arg("date", () => String) inputDate: string,
    @Arg("username", () => String, { nullable: true }) username?: string | null
  ): Promise<PoemStream> {
    let { date, time } = getDateTime(inputDate);
    let query: string;

    if (username != null) {
      const user = await User.findOne({ where: { username } });
      query = ` 
        SELECT * 
        FROM poem AS p
        WHERE p."createdAt" < '${date} ${time}'
        AND p."userId" = '${user?.id}'
        ORDER BY p."createdAt" DESC
        LIMIT ${n}
        `;
    } else {
      query = ` 
        SELECT * 
        FROM poem AS p
        WHERE p."createdAt" < '${date} ${time}'
        ORDER BY p."createdAt" DESC
        LIMIT ${n}
        `;
    }

    const poems: Poem[] = await getConnection().query(query);

    console.log("photos", poems);

    if (poems.length == 0) {
      return {
        poems: [],
        hasMore: false,
      };
    }

    let finalDateInFeed = poems[poems.length - 1].createdAt;
    let { date: mDate, time: mTime } = getDateTime(finalDateInFeed);

    const more = await getConnection().query(
      `
        SELECT *
        FROM poem AS p
        WHERE p."createdAt" < '${mDate} ${mTime}'
        ORDER BY p."createdAt" DESC 
        LIMIT 1
      `
    );

    return {
      poems,
      hasMore: more.length !== 0 ? true : false,
    };
  }
}
