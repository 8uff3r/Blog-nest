import { BadRequestException, PipeTransform } from "@nestjs/common";
import { PostCategory } from "../post-category-enum";

export class PostCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [
    PostCategory.LIFE,
    PostCategory.TECH,
    PostCategory.GENERAL,
  ];
  transform(value: any) {
    value.category = value.category.toUpperCase();

    if (!this.isCategoryValid(value.category)) {
      throw new BadRequestException(`"${value}" is not a valid category`);
    }
    return value;
  }

  private isCategoryValid(category: any) {
    const idx = this.allowedCategories.indexOf(category);
    return idx !== -1;
  }
}
