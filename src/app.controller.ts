import { Controller, Get, Post, Render, UseGuards } from "@nestjs/common";
import { GetUser } from "./auth/decorators/get-user.decorator";
import { JwtAuthGuard } from "./auth/JwtAuth.gaurd";
import { User } from "./auth/user.entity";
import { PostsRepository } from "./posts/post.repository";
import { Public } from "./utils/decorators";

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private postRepository: PostsRepository) {}

  @Public()
  @Get()
  @Render("index")
  async root() {}

  @Get("home")
  @Render("home")
  async home(@GetUser() user: User) {
    const posts = await this.postRepository.getAllPosts();
    return { user: user.username, posts };
  }

  @Post("create")
  @Render("create")
  create() {
    return { layout: false };
  }
}
