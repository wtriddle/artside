import { User } from "../entity/User";
import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from "./ErrorTypes";

@InputType()
export class UserRegisterInputs {
  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;
}

@InputType()
export class UserLoginInputs {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}

@InputType()
export class UserGetInputs {
  @Field({ nullable: true })
  usernameOrEmail?: string;

  @Field({ nullable: true })
  id?: number;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: Array<FieldError>;

  @Field(() => User, { nullable: true })
  user?: User;
}
