import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Artwork extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @Column({ nullable: true })
  title: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => String)
  @Column({ nullable: true })
  poem: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { nullable: true, array: true })
  tags: string[];

  @Field(() => String)
  @Column()
  type: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @Field(() => Number)
  @Column()
  userId: number;
}
