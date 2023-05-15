import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsFilterDto } from "./dto/get-posts-filter.dto";
import { PostCategory } from "./post-category-enum";
import { BPost } from "./post.entity";
import { PostsRepository } from "./post.repository";

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) {}

  async getPosts(filterDto: GetPostsFilterDto, user: User) {
    return await this.postRepository.getPosts(filterDto, user);
  }

  async getPostById(id: number, user: User): Promise<BPost> {
    const found = await this.postRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!found) throw new NotFoundException(`"${id}" was not found`);
    return found;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<BPost> {
    const post = await this.postRepository.createPost(createPostDto, user);
    delete post.user;
    return post;
  }

  async updatePostCategory(
    id: number,
    category: PostCategory,
    user: User,
  ): Promise<BPost> {
    const post = await this.getPostById(id, user);
    post.category = category;
    post.save();
    return post;
  }

  async deletePostById(id: number, user: User) {
    const status = await this.postRepository.delete({
      id: id,
      userId: user.id,
    });
    return status.affected;
  }
}
