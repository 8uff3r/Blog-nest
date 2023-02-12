import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostCategoryValidationPipe } from './pipes/post-category-validation.pipe';
import { BPost, PostCategory } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  getPosts(@Query(ValidationPipe) filterDto: GetPostsFilterDto): BPost[] {
    if (Object.keys(filterDto).length) {
      return this.postsService.getPostsByFilters(filterDto)
    }
    return this.postsService.getAllPosts()
  }

  @Get(':id')
  getPostById(@Param('id') id: string): BPost {
    const found = this.postsService.getPostById(id)
    if (!found) throw new NotFoundException()
    return found
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): BPost {
    return this.postsService.createPost(createPostDto)
  }

  @Patch(':id')
  updatePostField(@Param('id') id: string, @Body('category', PostCategoryValidationPipe) category: PostCategory): BPost {
    return this.postsService.updatePostCategory(id, category)
  }

  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    this.postsService.deletePostById(id)
  }
}
