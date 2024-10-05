import { User } from '@supabase/supabase-js';

export interface ProfileModel {
  full_name?: string;
  username?: string;
  email?: string;
  id?: string;
  avatar_url?: string;
  description?: string;
  issuper?: boolean;
}

export interface UserModel extends User {
  profile?: ProfileModel;
}
