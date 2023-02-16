import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { BPost } from './post.entity';

@Injectable()
export class PostsRepository extends Repository<BPost> {
  constructor(private dataSource: DataSource) {
    super(BPost, dataSource.createEntityManager());
  }
  async createPost(text: string) {
    const post = new BPost();
    post.text = text;
    await post.save();
    return post;
  }

  async getPosts(filterDto: GetPostsFilterDto, user: User): Promise<BPost[]> {
    const { category, search } = filterDto;
    const query = this.createQueryBuilder('b_post');
    query.where('b_post.userId = :userId', { userId: user.id });
    if (category) {
      query.andWhere('b_post.category ILIKE :category', { category });
    }

    if (search) {
      query.andWhere(
        'b_post.title ILIKE :search OR b_post.text ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const posts = await query.getMany();
    return posts;
  }
}
