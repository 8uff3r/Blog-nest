import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { EventsService } from "src/events.service";
import { PostEvent } from "./post-events.service";
import { PostsRepository } from "./post.repository";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostEvent, EventsService],
})
export class PostsModule {}
