import { BadRequestException, PipeTransform } from "@nestjs/common";
import { PostCategory } from "../posts.model";


export class PostCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = Object.keys(PostCategory)
  transform(value: string) {

    value = value.toUpperCase()

    if (!this.isCategoryValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid category`)
    }
    return value
  }

  private isCategoryValid(category: string) {
    const idx = this.allowedCategories.indexOf(category)
    return idx !== -1
  }
}
