export interface BPost {
  readonly id: string
  title: string
  text: string
  category: PostCategory
}


export enum PostCategory {
  GENERAL = 'GENERAL',
  LIFE = 'LIFE',
  TECH = 'TECH',
}
