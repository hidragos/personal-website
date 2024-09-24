import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-floating-toolbar',
  standalone: true,
  template: `
    <!-- Floating Toolbar -->
    <div
      (click)="onSelectionChange()"
      #toolbar
      class="absolute rounded-md mat-elevation-z4 hidden z-50 background backdrop-blur"
    >
      <ng-content select="[toolbar-buttons]"></ng-content>
    </div>

    <!-- Editable Content Area -->
    <ng-content select="[editable-content]"></ng-content>
  `,
})
export class FloatingToolbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toolbar', { static: true })
  toolbarRef!: ElementRef<HTMLDivElement>;
  editableDivRef!: HTMLDivElement;

  private popperInstance!: Instance | null;
  private selectionChange$ = new Subject<void>();
  private subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    this.editableDivRef = this.document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLDivElement;

    // Subscribe to selection changes with debounce to optimize performance
    this.subscription = this.selectionChange$
      .pipe(debounceTime(100))
      .subscribe(() => this.onSelectionChange());

    // Add event listeners to detect text selection within the editable area
    const editableDiv = this.editableDivRef;
    this.renderer.listen(editableDiv, 'mouseup', () =>
      this.selectionChange$.next()
    );
    this.renderer.listen(editableDiv, 'keyup', () =>
      this.selectionChange$.next()
    );

    // Listen for clicks outside the toolbar and editable area to hide the toolbar
    this.renderer.listen('document', 'click', (event: Event) =>
      this.handleClickOutside(event)
    );

    // on scroll reapply the toolbar
    this.document
      .getElementsByClassName('app-container')[0]
      .addEventListener('scroll', () => {
        this.onSelectionChange();
      });
  }

  ngOnDestroy() {
    // Clean up subscriptions and Popper.js instance to prevent memory leaks
    this.subscription.unsubscribe();
    this.hideToolbar();
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
  }

  /**
   * Responds to selection changes within the editable area.
   * Determines whether to show or hide the toolbar based on the selection.
   */
  onSelectionChange() {
    const selection = window.getSelection();

    if (
      selection &&
      !selection.isCollapsed &&
      this.isSelectionInsideEditableDiv(selection)
    ) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect && rect.width > 0 && rect.height > 0) {
        // Create a dummy span element to serve as a reference for Popper.js
        const dummy = this.renderer.createElement('span');
        this.renderer.setStyle(dummy, 'position', 'absolute');
        this.renderer.setStyle(dummy, 'top', `${rect.top + window.scrollY}px`);
        this.renderer.setStyle(
          dummy,
          'left',
          `${rect.left + window.scrollX}px`
        );
        this.renderer.setStyle(dummy, 'width', '1px'); // Ensure the span has dimensions
        this.renderer.setStyle(dummy, 'height', '1px'); // Ensure the span has dimensions
        this.renderer.setStyle(dummy, 'pointer-events', 'none'); // Make it invisible to mouse events
        this.renderer.appendChild(this.document.body, dummy);

        // Show the toolbar positioned relative to the dummy span
        this.showToolbar(dummy);

        // Remove the dummy span after positioning is done
        setTimeout(() => {
          this.renderer.removeChild(this.document.body, dummy);
        }, 100);
      }
    } else {
      this.hideToolbar();
    }
  }

  /**
   * Handles clicks outside the toolbar and editable area to hide the toolbar.
   * @param event The click event.
   */
  private handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (
      this.toolbarRef &&
      !this.toolbarRef.nativeElement.contains(target) &&
      !this.editableDivRef.contains(target)
    ) {
      this.hideToolbar();
    }
  }

  /**
   * Determines if the current selection is within the editable div.
   * @param selection The current text selection.
   * @returns True if the selection is inside the editable div, false otherwise.
   */
  private isSelectionInsideEditableDiv(selection: Selection): boolean {
    if (selection.rangeCount === 0) return false;
    const range = selection.getRangeAt(0);
    let node: Node | null = range.commonAncestorContainer;
    while (node) {
      if (node === this.editableDivRef) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  /**
   * Positions and displays the toolbar using Popper.js.
   * @param reference The HTML element to position the toolbar relative to.
   */
  private showToolbar(reference: HTMLElement) {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }

    // Initialize Popper.js to position the toolbar
    this.popperInstance = createPopper(
      reference,
      this.toolbarRef.nativeElement,
      {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8], // Adjusts the distance between the reference and the toolbar
            },
          },
        ],
      }
    );

    // Display the toolbar
    this.toolbarRef.nativeElement.style.display = 'block';
  }

  /**
   * Hides the toolbar and destroys the Popper.js instance.
   */
  private hideToolbar() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
    this.toolbarRef.nativeElement.style.display = 'none';
  }

  /**
   * Executes the specified formatting command and hides the toolbar.
   * @param command The formatting command (e.g., 'bold', 'italic', 'underline').
   */
  formatText(command: string) {
    document.execCommand(command, false);
    this.hideToolbar();
  }
}
