import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field(() => String)
  message: string;

  @Field(() => String)
  field: string;
}
