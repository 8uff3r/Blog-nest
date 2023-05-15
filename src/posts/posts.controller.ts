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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
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
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<BPost> {
    return this.postsService.createPost(createPostDto, user);
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
