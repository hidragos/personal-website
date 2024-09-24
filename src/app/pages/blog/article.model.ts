import { SafeHtml } from '@angular/platform-browser';
import { ProfileModel } from '@shared';

export interface ArticleModel {
  id: number;
  title?: string;
  content?: string;
  contentSafeHtml?: SafeHtml;
  contentSafeHtmlPreview?: SafeHtml;
  tags?: string[];
  pending?: boolean;
  inserted_at: string;
  user_id?: string;
  updated_at: string;
  description?: string;
  profiles?: ProfileModel;
  url?: string;
}
