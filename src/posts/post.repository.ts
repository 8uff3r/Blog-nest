import { Injectable } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsFilterDto } from "./dto/get-posts-filter.dto";
import { PostCategory } from "./post-category-enum";
import { BPost } from "./post.entity";

@Injectable()
export class PostsRepository extends Repository<BPost> {
  constructor(private dataSource: DataSource) {
    super(BPost, dataSource.createEntityManager());
  }
  async createPost(createPostDto: CreatePostDto, user: User) {
    const { title, text } = createPostDto;
    const post = new BPost();
    post.title = title;
    post.text = text;
    post.category = PostCategory.GENERAL;
    // TODO add signin to UI
    post.user = user;
    await post.save();
    return post;
  }

  async getPosts(filterDto: GetPostsFilterDto, user: User): Promise<BPost[]> {
    const { category, search } = filterDto;
    const query = this.createQueryBuilder("b_post");
    query.where("b_post.userId = :userId", { userId: user.id });
    if (category) {
      query.andWhere("b_post.category ILIKE :category", { category });
    }

    if (search) {
      query.andWhere(
        "b_post.title ILIKE :search OR b_post.text ILIKE :search",
        { search: `%${search}%` },
      );
    }

    const posts = await query.getMany();
    return posts;
  }

  async getAllPosts() {
    return this.find({
      order: { id: "DESC" },
    });
    // return await posts.execute();
  }
}
