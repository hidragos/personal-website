import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollToEndService {
  private _scrolledToEnd = new EventEmitter<void>();

  get scrolledToEnd() {
    return this._scrolledToEnd.asObservable();
  }

  constructor() {}

  emit() {
    this._scrolledToEnd.emit();
  }
}
