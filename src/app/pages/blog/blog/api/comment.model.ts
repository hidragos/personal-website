import { ProfileModel } from '@shared';

export class CommentModel {
  id?: number;
  article_id?: number;
  user_id?: string;
  content?: string;
  created_at!: string;
  updated_at!: string;
  profiles?: ProfileModel;
}
