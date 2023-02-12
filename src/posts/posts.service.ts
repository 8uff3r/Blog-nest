import { Injectable, NotFoundException, Param, Post } from '@nestjs/common';
import { BPost, PostCategory } from './posts.model';
import { randomUUID } from 'crypto';
import { CreatePostDto } from './dto/create-post.dto';
import { log } from 'console';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';

@Injectable()
export class PostsService {
  private posts: BPost[] = []

  // getters:

  getAllPosts(): BPost[] {
    return this.posts
  }

  getPostById(id: string): BPost {
    const found = this.posts.find(post => post.id === id)
    if (!found) throw new NotFoundException()
    return found
  }

  getPostsByFilters(filterDto: GetPostsFilterDto): BPost[] {
    const { category, search } = filterDto

    let posts = this.getAllPosts()

    if (category) {
      posts = posts.filter(post => post.category == category)
    }

    if (search) {
      posts = posts.filter(post => post.title.includes(search) || post.text.includes(search))
    }

    return posts
  }
  //
  createPost(createPostDto: CreatePostDto): BPost {
    const { title, text, category } = createPostDto
    const bPost: BPost = {
      id: randomUUID(),
      title,
      text, category: PostCategory[category]
    }

    this.posts.push(bPost)
    return bPost
  }

  updatePostCategory(id: string, category: PostCategory) {
    const post = this.getPostById(id)
    post.category = category
    return post
  }

  deletePostById(id: string) {
    const found = this.getPostById(id)
    this.posts = this.posts.filter(post => post.id !== found.id)
  }
}
