import { InjectRedis } from "@liaoliaots/nestjs-redis";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Render,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import Redis from "ioredis";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsFilterDto } from "./dto/get-posts-filter.dto";
import { PostCategoryValidationPipe } from "./pipes/post-category-validation.pipe";
import { PostCategory } from "./post-category-enum";
import { BPost } from "./post.entity";
import { PostsService } from "./posts.service";

@Controller("posts")
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService// @InjectRedis() private readonly redis: Redis
  ) {}

  @Get()
  getUserPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @GetUser() user: User,
  ): Promise<BPost[]> {
    return this.postsService.getUserPosts(filterDto, user);
  }

  @Get(":id")
  async getPostById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return await this.postsService.getPostById(id, user);
  }

  @Post("create")
  @UsePipes(ValidationPipe)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() curUser: User,
    @Res() res: Response,
  ) {
    const post = await this.postsService.createPost(createPostDto, curUser);
    // this.redis.lpush(JSON.stringify(post));
    return res.render(
      "partials/post",
      {
        layout: false,
        id: post.id,
        title: post.title,
        text: post.text,
      },
    );
  }

  @Put(":id")
  async updatePost(
    @Param("id", ParseIntPipe) id: number,
    @Body(PostCategoryValidationPipe) post: CreatePostDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const editedPost = await this.postsService.updatePost(id, post, user);
    return res.render("partials/post", {
      layout: false,
      id: editedPost.id,
      title: editedPost.title,
      text: editedPost.text,
    });
  }

  @Delete(":id")
  async deletePostById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    const status = await this.postsService.deletePostById(id, user);
    if (status == 0) {
      throw new NotFoundException(`"${id}" was not found`);
    }
  }
}
