import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NavbarItem {
  icon: string;
  label: string;
  route: string;
  hidden?: boolean;
}

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

export const appSections: NavbarItem[] = [
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
  {
    label: 'labels.sections.blog',
    route: 'blog',
    icon: 'lightbulb',
    hidden: true,
  },
];
