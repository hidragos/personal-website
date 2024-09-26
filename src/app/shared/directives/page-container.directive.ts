// directive to apply page-container class
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: `app-page-container, [app-page-container], [app-page-container]`,
  standalone: true,
})
export class PageContainerDirective {
  @HostBinding('class') class = 'page-container';
}
