export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
  tags: string[];
  category: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
}