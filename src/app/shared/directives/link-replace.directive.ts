import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLinkReplace]',
  standalone: true,
})
export class LinkReplaceDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    this.replaceUrlsWithAnchors();
  }

  private replaceUrlsWithAnchors() {
    const nativeElement = this.el.nativeElement;
    // text not html
    const content = nativeElement.textContent;

    // Regex to detect URLs (matches http/https URLs)
    const urlRegex = /((https?:\/\/[^\s]+))/g;

    // Replace URLs with anchor tags
    const newContent = content.replace(urlRegex, (match: string) => {
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });

    // Update contenteditable div
    if (content !== newContent) {
      nativeElement.innerHTML = newContent;
    }
  }
}
