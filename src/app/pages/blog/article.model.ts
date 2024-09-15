export interface ArticleModel {
  id: number;
  title?: string;
  content?: string;
  contentPreview?: string;
  tags?: string[];
  inserted_at: string;
  updated_at: string;
}
