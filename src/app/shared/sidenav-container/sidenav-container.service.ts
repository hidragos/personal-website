import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavContainerService {
  private isHandheld$ = signal<boolean>(false);

  get isHandheld() {
    return this.isHandheld$();
  }

  set isHandheld(value: boolean) {
    this.isHandheld$.set(value);
  }

  private toggleDrawerSubject = new Subject<void>();

  toggleDrawer$ = this.toggleDrawerSubject.asObservable();

  toggleDrawer(): void {
    this.toggleDrawerSubject.next();
  }
}
