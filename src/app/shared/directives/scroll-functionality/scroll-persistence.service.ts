import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from '../../local-storage/local-storage.service';

// scroll-persistence.service.ts

@Injectable({
  providedIn: 'root',
})
export class ScrollPersistenceService {
  private storageKeyPrefix = 'scroll-position-';
  localStorageService = inject(LocalStorageService);

  /**
   * Saves the scroll position for a given key.
   * @param key A unique identifier for the scrollable element (e.g., route URL or element ID).
   * @param scrollTop The vertical scroll position.
   */
  saveScrollPosition(key: string, scrollTop: number): void {
    const storageKey = this.storageKeyPrefix + key;
    this.localStorageService.set(storageKey, JSON.stringify(scrollTop));
  }

  /**
   * Retrieves the saved scroll position for a given key.
   * @param key A unique identifier for the scrollable element.
   * @returns The saved scroll position or null if none exists.
   */
  getScrollPosition(key: string): number | null {
    const storageKey = this.storageKeyPrefix + key;
    const scrollTop = this.localStorageService.get(storageKey);
    return scrollTop ? JSON.parse(scrollTop) : null;
  }

  /**
   * Clears the saved scroll position for a given key.
   * @param key A unique identifier for the scrollable element.
   */
  clearScrollPosition(key: string): void {
    const storageKey = this.storageKeyPrefix + key;
    this.localStorageService.remove(storageKey);
  }
}
