import argon2 from "argon2";
import { MyContext } from "MyContext";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  validateLoginInputs,
  validateReigsterInputs,
} from "../utils/validateInputs";
import { User } from "../entity/User";
import {
  UserRegisterInputs,
  UserResponse,
  UserLoginInputs,
  UserGetInputs,
} from "../types/UserTypes";
import { COOKIE_NAME } from "../constants";
import { Upload } from "../types/UploadType";
import { GraphQLUpload } from "apollo-server-express";
import cloudinary from "../utils/createCloudinaryClient";

@Resolver()
export class UserResolver {
  // @Mutation(() => UserResponse)
  // async updateProfile(@Arg("options", () => "") options: "") {}

  @Mutation(() => Boolean)
  async profilePictureUpload(
    @Arg("file", () => GraphQLUpload!) file: Upload,
    @Ctx() { req }: MyContext
  ) {
    if (typeof file === "string") {
      await cloudinary.v2.uploader.upload(
        file,
        {
          public_id: `profile_pictures/${req.session.userId}_profile_picture`,
          chunk_size: Math.pow(6.4, 7),
          invalidate: true,
        },
        (error, result) => {
          console.log(result, error);
        }
      );
    } else {
      console.log(
        "The file uploaded was not a data URL string, please try again"
      );
      return false;
    }
    return true;
  }

  @Query(() => User)
  async getUser(
    @Arg("options", () => UserGetInputs) options: UserGetInputs
  ): Promise<User | undefined> {
    if (!options) {
      console.log("Please put in arugments");
      return undefined;
    }
    if (options.id) {
      return User.findOne(options.id);
    } else {
      return User.findOne(
        options.usernameOrEmail?.includes("@")
          ? { where: { email: options.usernameOrEmail } }
          : { where: { username: options.usernameOrEmail } }
      );
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UserRegisterInputs) options: UserRegisterInputs,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateReigsterInputs(options);
    if (errors.length !== 0) {
      return { errors };
    }
    options.password = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({ ...options }).save();
      console.log("New Registerd User: ", user);
    } catch (err) {
      console.log("message: ", err);
      if (err.code == "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username or email has been taken already",
            },
          ],
        };
      }
    }

    req.session.userId = user?.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => UserLoginInputs) options: UserLoginInputs,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateLoginInputs(options);
    if (errors.length !== 0) {
      return { errors };
    }
    const user = await User.findOne(
      options.usernameOrEmail.includes("@")
        ? { where: { email: options.usernameOrEmail } }
        : { where: { username: options.usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username or email does not exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user?.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password was incorrect",
          },
        ],
      };
    }

    req.session.userId = user?.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    console.log(req.session.userId);
    if (!req.session.userId) {
      return undefined;
    }
    const user = await User.findOne(req.session.userId);
    return user;
  }
}
