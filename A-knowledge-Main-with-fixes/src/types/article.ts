export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  is_liked?: boolean;
}

export interface ArticleLike {
  id: string;
  article_id: string;
  user_id: string;
  created_at: string;
}