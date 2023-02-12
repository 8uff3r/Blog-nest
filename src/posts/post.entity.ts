import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostCategory } from "./posts.model";

@Entity()
export class BPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @Column()
  category: PostCategory
}
