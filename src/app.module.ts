import { RedisModule } from "@liaoliaots/nestjs-redis";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { EventsService } from "./events.service";
import { PostEvent } from "./posts/post-events.service";
import { PostsRepository } from "./posts/post.repository";
import { PostsModule } from "./posts/posts.module";
import { PostsService } from "./posts/posts.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // RedisModule.forRoot({
    //   config: {
    //     host: "localhost",
    //     port: 6379,
    //   },
    // }),
    PostsModule,
    AuthModule,
  ],
  providers: [PostsRepository, PostsService, EventsService, PostEvent],
  controllers: [AppController],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
