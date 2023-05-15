import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { PostCategory } from "../post-category-enum";

export class GetPostsFilterDto {
  @IsOptional()
  @Matches(`^${Object.values(PostCategory).join("|")}$`, "i")
  category: PostCategory | string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
