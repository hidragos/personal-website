import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  get(key: string) {
    return this.isLocalStorageAvailable ? localStorage.getItem(key) : null;
  }

  set(key: string, value: string) {
    if (this.isLocalStorageAvailable) localStorage.setItem(key, value);
  }

  remove(key: string) {
    if (this.isLocalStorageAvailable) localStorage.removeItem(key);
  }

  clear() {
    if (this.isLocalStorageAvailable) localStorage.clear();
  }
}
