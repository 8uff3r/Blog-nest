import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { PostsRepository } from "./posts/post.repository";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PostsModule, AuthModule],
  providers: [PostsRepository],
  controllers: [AppController],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
