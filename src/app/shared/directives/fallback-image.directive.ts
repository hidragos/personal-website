import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appFallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  @Input('appFallbackImage') fallbackIcon: string = 'broken_image'; // Default fallback icon if none provided

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('error') onError() {
    const matIcon = this.renderer.createElement('mat-icon');
    const text = this.renderer.createText(this.fallbackIcon);

    this.renderer.appendChild(matIcon, text);
    this.renderer.setAttribute(matIcon, 'aria-hidden', 'false');
    this.renderer.addClass(matIcon, 'mat-icon'); // Optional: Add Angular Material icon class

    const parent = this.el.nativeElement.parentNode;
    this.renderer.removeChild(parent, this.el.nativeElement);
    this.renderer.appendChild(parent, matIcon);
  }
}
