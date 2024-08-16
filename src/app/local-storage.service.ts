import { Injectable } from '@angular/core';

export class LocalStorageItem {
  constructor(public key: string, public value: any) {}
}

export const LocalStorageItems = ['activeLang'];

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private items!: LocalStorageItem[];

  constructor() {
    this.items = LocalStorageItems.map((key) => {
      return new LocalStorageItem(key, localStorage.getItem(key));
    });
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.items.find((item) => item.key === key)!.value = value;
  }
}
