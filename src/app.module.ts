import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PostsModule, AuthModule],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
