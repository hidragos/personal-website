import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appTogglablePlaceholder]',
  standalone: true,
})
export class TogglablePlaceholderDirective implements OnInit {
  @Input('appTogglablePlaceholder') placeholderText: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.placeholder = this.placeholderText;
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.placeholder = '';
  }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.placeholder = this.placeholderText;
  }
}
