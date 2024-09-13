import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  clear() {
    if (this.isLocalStorageAvailable) localStorage.clear();
  }

  get(key: string) {
    return this.isLocalStorageAvailable ? localStorage.getItem(key) : null;
  }

  remove(key: string) {
    if (this.isLocalStorageAvailable) localStorage.removeItem(key);
  }

  set(key: string, value: string) {
    if (this.isLocalStorageAvailable) localStorage.setItem(key, value);
  }
}
