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

export const appSections = [
  {
    label: 'labels.sections.about',
    route: 'about',
    icon: 'person',
  },
  {
    label: 'labels.sections.resume',
    route: 'resume',
    icon: 'description',
  },
];
export interface NavbarItem {
  label: string;
  route: string;
  icon: string;
}
