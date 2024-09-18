import { SafeHtml } from '@angular/platform-browser';

export interface ArticleModel {
  id: number;
  title?: string;
  content?: string;
  contentSafeHtml?: SafeHtml;
  contentSafeHtmlPreview?: SafeHtml;
  tags?: string[];
  pending?: boolean;
  inserted_at: string;
  user_email: string;
  updated_at: string;
}
