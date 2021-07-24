import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Music } from "./Music";
import { Photo } from "./Photo";
import { Poem } from "./Poem";

type typesOfArt = Photo | Poem | Music;

@ObjectType()
class Artwork {
  @Field()
  id: number;

  @Field(() => Photo || Poem || Music)
  type: typesOfArt;
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  description?: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { nullable: true, array: true })
  tags?: string[];

  @OneToMany(() => Poem, (poem) => poem.user)
  poems: Poem[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Music, (music) => music.user)
  songs: Music[];

  @Field(() => Artwork, { nullable: true })
  featuredArtwork?: Artwork;

  @Column()
  password: string;
}
