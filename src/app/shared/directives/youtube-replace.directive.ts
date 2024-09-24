import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appYoutubeReplace]',
  standalone: true,
})
export class YoutubeReplaceDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    this.replaceYoutubeLinksWithIframe();
  }

  private replaceYoutubeLinksWithIframe() {
    const nativeElement = this.el.nativeElement;
    const content = nativeElement.innerHTML;

    // Regex to detect YouTube URLs
    // Ignore the iframe in the regex
    const youtubeRegex =
      /(https?:\/\/(www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    // Replace YouTube URLs with embedded iframes
    const newContent = content.replace(
      youtubeRegex,
      (match: any, p1: any, p2: any, videoId: any) => {
        return `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
          gyroscope; picture-in-picture" allowfullscreen></iframe><br>
        `;
      }
    );

    // Update contenteditable div
    if (content !== newContent) {
      nativeElement.innerHTML = newContent;
    }

    // set cursor after the abovething was added (two lines added, cursor on the second line)
    // const range = document.createRange();
    // const sel = window.getSelection();
    // range.setStart(nativeElement, 1);
    // range.collapse(true);
    // sel?.removeAllRanges();
    // sel?.addRange(range);
  }
}
