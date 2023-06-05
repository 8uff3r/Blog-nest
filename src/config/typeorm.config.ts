import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { BPost } from "src/posts/post.entity";
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "blog",
  entities: [BPost, User],
  autoLoadEntities: true,
  synchronize: true,
};
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: "postgres",
//   host: "nestblog",
//   port: 5432,
//   username: "root",
//   password: "0kvhvRz6Fobs63kkQFHIyJWy",
//   database: "postgress",
//   entities: [BPost, User],
//   autoLoadEntities: true,
//   synchronize: true,
// };
