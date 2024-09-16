/* Store using signals a generic item with all the blows and whistles */
import { inject, signal } from '@angular/core';

import { SupabaseService } from './supabase.service';

export class SupabaseStoreModel<TModel> {
  private supabaseService = inject(SupabaseService);

  supabase = this.supabaseService.supabaseClient;

  private _data = signal<TModel>({} as TModel);

  get data() {
    return this._data();
  }

  set data(value: TModel) {
    this._data.set(value);
  }

  constructor(initialData?: TModel) {
    if (!initialData) return;
    this.data = initialData;
  }
}

export class SupabaseStore<TModel extends { id: number }> {
  private _data = signal<TModel[]>([]);

  get data() {
    return this._data();
  }

  set data(value: TModel[]) {
    this._data.set(value);
  }

  // the one that is open in view, the one that is being edited/ viewed
  private _one = signal<TModel>({} as TModel);

  get one() {
    return this._one();
  }

  set one(value: TModel) {
    this._one.set(value);
  }

  constructor(
    private store: SupabaseStoreModel<TModel>,
    private tableName: string
  ) {}

  async create(item: TModel) {
    const result = await this.store.supabase
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

    const result = await this.store.supabase.from(this.tableName).select('*');

    if (result.error || !result.data || !result.data.length) return [];

    this.data = result.data as TModel[];

    return result.data as TModel[];
  }

  async getById(id: number, refresh = false) {
    if (this.one && Object.keys(this.one).length > 0 && !refresh)
      return this.one;

    if (this.data.length > 0 && !refresh) {
      const item = this.data.find((x) => x.id === id);
      if (item) return item;
    }

    const result = await this.store.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id);

    if (result.error || !result.data || !result.data.length) return null;

    return result.data[0] as TModel;
  }

  async update(id: number, item: TModel) {
    const result = await this.store.supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select('*');

    if (result.error || !result.data || !result.data.length) return null;

    const updatedItem = result.data[0] as TModel;
    this.data = this.data.map((x) => (x.id === id ? updatedItem : x));
    this.one = updatedItem;
    return updatedItem;
  }

  async refresh() {
    const result = await this.store.supabase.from(this.tableName).select('*');

    if (result.error || !result.data || !result.data.length) return [];

    this.data = result.data as TModel[];
    this.clearOne();
    return result.data as TModel[];
  }

  async delete(id: number) {
    const result = await this.store.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (result.error) return false;

    this.data = this.data.filter((x) => x.id !== id);

    return true;
  }

  clearOne() {
    this.one = {} as TModel;
  }
}
