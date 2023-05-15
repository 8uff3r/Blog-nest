import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostCategory } from "./post-category-enum";

@Entity()
export class BPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  category: PostCategory | string;

  @ManyToOne((type) => User, (user) => user.posts, { eager: false })
  user: User;

  @Column()
  userId: number;
}
