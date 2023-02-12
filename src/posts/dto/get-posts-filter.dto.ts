import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { PostCategory } from "../posts.model";

export class GetPostsFilterDto {
  @IsOptional()
  @IsIn(Object.keys(PostCategory))
  category: PostCategory

  @IsOptional()
  @IsNotEmpty()
  search: string
}
