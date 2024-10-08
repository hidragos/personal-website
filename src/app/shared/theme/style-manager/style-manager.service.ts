import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({ providedIn: 'root' })
export class StyleManagerService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  createLinkElementWithKey(key: string) {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    this.document.head.appendChild(linkEl);
    return linkEl;
  }

  getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }

  getExistingLinkElementByKey(key: string) {
    return this.document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`
    );
  }

  getLinkElementForKey(key: string) {
    return (
      this.getExistingLinkElementByKey(key) ||
      this.createLinkElementWithKey(key)
    );
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(href: string) {
    this.getLinkElementForKey('theme').setAttribute('href', href);
  }
}
