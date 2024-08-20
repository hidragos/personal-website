import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _scrollTop = new BehaviorSubject<number>(0);
  scrollTop$ = this._scrollTop.asObservable();

  setScrollTop(scrollTop: number): void {
    this._scrollTop.next(scrollTop);
  }
}
