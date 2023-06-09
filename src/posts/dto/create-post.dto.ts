import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  category: string;
}
