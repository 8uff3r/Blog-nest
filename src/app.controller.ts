import { Controller, Get, Param, ParseIntPipe, Post, Render, UseGuards } from "@nestjs/common";
import { GetUser } from "./auth/decorators/get-user.decorator";
import { JwtAuthGuard } from "./auth/JwtAuth.gaurd";
import { User } from "./auth/user.entity";
import { PostsRepository } from "./posts/post.repository";
import { PostsService } from "./posts/posts.service";
import { Public } from "./utils/decorators";

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private postRepository: PostsRepository, private postsService: PostsService) {}

  @Public()
  @Get()
  @Render("index")
  async root() {
    const posts = await this.postRepository.getAllPostsRev();
    return { posts, layout: "unsigned" };
  }

  @Get("home")
  @Render("home")
  async home(@GetUser() user: User) {
    const userPosts = await this.postsService.getUserPosts(null, user);
    return { user: user.username, userPosts };
  }

  @Post("create")
  @Render("create")
  create() {
    return { layout: false };
  }

  @Get("edit/:id")
  @Render("edit")
  async edit(@GetUser() user: User, @Param("id", ParseIntPipe) id: number) {
    const post = await this.postsService.getPostById(id, user);
    return {
      layout: false,
      id,
      title: post.title,
      text: post.text,
      tags: "hi",
    };
  }

  @Public()
  @Get("signup")
  @Render("signup")
  signUp() {
    return { layout: false };
  }

  @Public()
  @Get("signin")
  @Render("signin")
  signIn() {
    return { layout: false };
  }
}
