import { inject } from '@angular/core';
import { SupabaseService } from '@shared';

export class SupabaseApiService<TModel extends { id: string }> {
  private supabaseService = inject(SupabaseService);

  private supabase = this.supabaseService.supabaseClient;
  tableName = '';

  create(item: TModel) {
    return this.supabase.from(this.tableName).insert(item);
  }

  async getAll() {
    const result = await this.supabase.from(this.tableName).select('*');
    if (result.data) return result.data as TModel[];
    else return [];
  }

  async getById(id: string) {
    const result = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id);
    if (result.data && result.data.length > 0) return result.data[0] as TModel;
    else return null;
  }

  update(id: string, item: TModel) {
    return this.supabase.from(this.tableName).update(item).eq('id', id);
  }

  delete(id: string) {
    return this.supabase.from(this.tableName).delete().eq('id', id);
  }
}
