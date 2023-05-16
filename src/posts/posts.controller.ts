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
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
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
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @GetUser() user: User,
  ): Promise<BPost[]> {
    return this.postsService.getPosts(filterDto, user);
  }

  @Get(":id")
  getPostById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<BPost> {
    return this.postsService.getPostById(id, user);
  }

  @Post("create")
  @UsePipes(ValidationPipe)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const post = await this.postsService.createPost(createPostDto, user);
    return res.render(
      "partials/post",
      {
        layout: false,
        title: post.title,
        text: post.text,
      },
    );
  }

  @Patch(":id")
  updatePostField(
    @Param("id", ParseIntPipe) id: number,
    @Body("category", PostCategoryValidationPipe) category: PostCategory,
    @GetUser() user: User,
  ): Promise<BPost> {
    return this.postsService.updatePostCategory(id, category, user);
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
