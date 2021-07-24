import { Field, InputType } from "type-graphql";

@InputType()
export class Upload {
  @Field(() => String, { nullable: true })
  filename: string;
  @Field(() => String, { nullable: true })
  mimetype: string;
  @Field(() => String, { nullable: true })
  encoding: string;
}
