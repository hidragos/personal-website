import { inject, signal } from '@angular/core';
import { SupabaseService } from '@shared';

export class SupabaseApiService<TModel extends { id: number }> {
  private supabaseService = inject(SupabaseService);

  private supabase = this.supabaseService.supabaseClient;
  tableName = '';

  private _data = signal<TModel[]>([]);

  get data() {
    return this._data();
  }

  set data(value: TModel[]) {
    this._data.set(value);
  }

  async create(item: TModel) {
    const result = await this.supabase
      .from(this.tableName)
      .insert(item)
      .select('*');

    if (result.error || !result.data || !result.data.length) return null;

    const newItem = result.data[0] as TModel;
    this.data = [...this.data, newItem];
    return newItem;
  }

  async getAll() {
    if (this.data.length > 0) return this.data;

    const result = await this.supabase.from(this.tableName).select('*');

    if (result.error || !result.data || !result.data.length) return [];

    this.data = result.data as TModel[];

    return result.data as TModel[];
  }

  async getById(id: number) {
    if (this.data.length > 0) {
      const item = this.data.find((x) => x.id === id);
      if (item) return item;
    }

    const result = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id);

    if (result.error || !result.data || !result.data.length) return null;

    return result.data[0] as TModel;
  }

  async update(id: number, item: TModel) {
    const result = await this.supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select('*');

    if (result.error || !result.data || !result.data.length) return null;

    const updatedItem = result.data[0] as TModel;
    const index = this.data.findIndex((x) => x.id === id);
    if (index > -1) {
      this.data[index] = updatedItem;
    }
    return updatedItem;
  }

  async delete(id: number) {
    const result = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    if (!result.error) this.data = this.data.filter((x) => x.id !== id);
  }
}
