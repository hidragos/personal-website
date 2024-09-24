// Updated TextEditorComponent
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { debounceTime, Subject, Subscription } from 'rxjs';

import { FloatingToolbarComponent } from './floating-toolbar/floating-toolbar.component';
import { EditorFormField } from './wysiwyg-editor-form-field.component';

@Component({
  selector: 'app-wysiwyg-editor',
  template: `
    <ng-container *transloco="let t">
      <!-- Hidden Trigger Button for Mat Menu -->

      <app-floating-toolbar>
        <div
          toolbar-buttons
          class="flex flex-row flex-wrap justify-between items-center space-x-2 p-2"
        >
          <!-- Heading as buttons, labels will be p, h1, h2, and they will have that sizes fonts -->
          <div class="flex flex-row justify-center items-center flex-auto">
            <button
              mat-icon-button
              type="button"
              (click)="onHeadingChange('P')"
              [disabled]="disabled"
              matTooltip="{{ t('editor.paragraph') }}"
              [ngClass]="{ 'item-selected': currentHeading === 'P' }"
            >
              <mat-icon>title</mat-icon>
            </button>
            <button
              mat-icon-button
              type="button"
              (click)="onHeadingChange('H1')"
              [disabled]="disabled"
              matTooltip="{{ t('editor.heading1') }}"
              [ngClass]="{ 'item-selected': currentHeading === 'H1' }"
            >
              <mat-icon>format_h1</mat-icon>
            </button>
            <button
              mat-icon-button
              type="button"
              (click)="onHeadingChange('H2')"
              [disabled]="disabled"
              matTooltip="{{ t('editor.heading2') }}"
              [ngClass]="{ 'item-selected': currentHeading === 'H2' }"
            >
              <mat-icon>format_h2</mat-icon>
            </button>
            <button
              mat-icon-button
              type="button"
              (click)="onHeadingChange('H3')"
              [disabled]="disabled"
              matTooltip="{{ t('editor.heading3') }}"
              [ngClass]="{ 'item-selected': currentHeading === 'H3' }"
            >
              <mat-icon>format_h3</mat-icon>
            </button>
          </div>

          <!-- Formatting Buttons -->
          <div
            class="flex flex-row flex-wrap justify-between items-center flex-auto"
          >
            <div class="flex flex-row justify-center">
              <button
                mat-icon-button
                type="button"
                (click)="format('bold')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.bold') }} ({{ metaKey }} + B)"
                [ngClass]="{ 'item-selected': isBold }"
              >
                <mat-icon>format_bold</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('italic')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.italic') }} ({{ metaKey }} + I)"
                [ngClass]="{ 'item-selected': isItalic }"
              >
                <mat-icon>format_italic</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('underline')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.underline') }} ({{ metaKey }} + U)"
                [ngClass]="{ 'item-selected': isUnderline }"
              >
                <mat-icon>format_underlined</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('removeFormat')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.removeFormat') }} ({{ metaKey }} + X)"
              >
                <mat-icon>format_clear</mat-icon>
              </button>
            </div>

            @if(false){
            <!-- Text Alignment Buttons -->
            <div class="flex flex-row justify-center">
              <button
                mat-icon-button
                type="button"
                (click)="format('justifyLeft')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.alignLeft') }}"
                [ngClass]="{ 'item-selected': textAlign === 'left' }"
              >
                <mat-icon>format_align_left</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('justifyCenter')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.alignCenter') }}"
                [ngClass]="{ 'item-selected': textAlign === 'center' }"
              >
                <mat-icon>format_align_center</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('justifyRight')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.alignRight') }}"
                [ngClass]="{ 'item-selected': textAlign === 'right' }"
              >
                <mat-icon>format_align_right</mat-icon>
              </button>
            </div>

            <!-- Indent Buttons -->
            <div class="flex flex-row justify-center">
              <button
                mat-icon-button
                type="button"
                (click)="format('outdent')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.indentLeft') }} ({{ metaKey }} + [)"
              >
                <mat-icon>arrow_left_alt</mat-icon>
              </button>
              <button
                mat-icon-button
                type="button"
                (click)="format('indent')"
                [disabled]="disabled"
                matTooltip="{{ t('editor.indentRight') }} ({{ metaKey }} + ])"
              >
                <mat-icon>arrow_right_alt</mat-icon>
              </button>
            </div>
            }
          </div>
        </div>

        <!-- Editable Content Area -->
        <div editable-content>
          <mat-form-field appearance="outline" class="w-full">
            <editor-form-field
              [placeholder]="placeholder"
              [formControl]="formControl"
              (focusOut)="saveSelection()"
            ></editor-form-field>
          </mat-form-field>
        </div>
      </app-floating-toolbar>
      <!-- Toggle Source View Button -->
      <div class="flex justify-end">
        <button
          mat-button
          type="button"
          (click)="toggleSourceView()"
          [disabled]="disabled"
          matTooltip="{{
            showSource ? t('editor.hideSource') : t('editor.showSource')
          }}"
        >
          <mat-icon>{{
            showSource ? 'visibility_off' : 'visibility'
          }}</mat-icon>
          {{ showSource ? t('editor.hideSource') : t('editor.showSource') }}
        </button>
      </div>

      <!-- Source View -->
      <div *ngIf="showSource" class="mt-2 p-2 rounded">
        {{ formControl.value | json }}
      </div>
    </ng-container>
  `,
  styles: [],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    EditorFormField,
    ReactiveFormsModule,
    TranslocoDirective,
    FloatingToolbarComponent,
  ],
})
export class TextEditorComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  @ViewChild(EditorFormField) contentEditable!: EditorFormField;

  @ViewChild('textColorInput') textColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('backgroundColorInput')
  backgroundColorInput!: ElementRef<HTMLInputElement>;

  @ViewChild('menuTriggerButton')
  menuTriggerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  @Input() placeholder: string = 'Enter text here...';

  editorContent: string = '';
  disabled: boolean = false;

  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean = false;
  isNoFormat: boolean = false;
  currentHeading: string = 'P';
  textAlign: string = 'left';

  formControl = new FormControl('');

  onChange = (_: any) => {};
  onTouched = () => {};

  showSource: boolean = false;

  private savedSelection: Range | null = null;
  editableDivRef!: HTMLDivElement;
  private selectionChange$ = new Subject<void>();
  private subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    // Add mouseup listener to the editor to detect text selection
    // this.contentEditable?.editor?.addEventListener(
    //   'mouseup',
    //   this.onMouseUp.bind(this)
    // );
    // // Add keyup listener to handle caret movements without selection
    // this.contentEditable?.editor?.addEventListener(
    //   'keyup',
    //   this.onKeyUp.bind(this)
    // );
    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });

    this.editableDivRef = this.document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLDivElement;

    // Subscribe to selection changes with debounce to optimize performance
    this.subscription = this.selectionChange$
      .pipe(debounceTime(100))
      .subscribe(() => this.updateToolbarState());

    // Add event listeners to detect text selection within the editable area
    const editableDiv = this.editableDivRef;
    this.renderer.listen(editableDiv, 'mouseup', () =>
      this.selectionChange$.next()
    );
    this.renderer.listen(editableDiv, 'keyup', () =>
      this.selectionChange$.next()
    );
  }

  ngOnDestroy() {
    // Remove the mouseup and keyup listeners when the component is destroyed
    // this.contentEditable?.editor?.removeEventListener(
    //   'mouseup',
    //   this.onMouseUp.bind(this)
    // );
    // this.contentEditable?.editor?.removeEventListener(
    //   'keyup',
    //   this.onKeyUp.bind(this)
    // );
  }

  /**
   * Handler for the mouseup event on the editor.
   * It checks if there's a text selection and shows the toolbar accordingly.
   */
  onMouseUp(event: MouseEvent) {
    this.evaluateSelection();
  }

  /**
   * Handler for the keyup event on the editor.
   * It checks if there's a text selection or just caret positioning.
   */
  onKeyUp(event: KeyboardEvent) {
    // Ignore keyup events related to selection (handled elsewhere)
    const navigationKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ];
    if (navigationKeys.includes(event.key)) {
      this.evaluateSelection();
    }
  }

  /**
   * Evaluates the current selection and shows or closes the toolbar accordingly.
   */
  private evaluateSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (
        !selection.isCollapsed &&
        this.contentEditable?.editor?.contains(range.commonAncestorContainer)
      ) {
        this.saveSelection();
        this.showToolbar(range);
      } else {
        this.closeToolbar();
      }
    } else {
      this.closeToolbar();
    }
  }

  /**
   * Displays the toolbar positioned above the selected text.
   */
  private showToolbar(range: Range) {
    const rect = range.getBoundingClientRect();

    // Calculate toolbar position (above the selection, centered)
    const toolbarWidth = 300; // Approximate width of the toolbar
    const toolbarHeight = 50; // Approximate height of the toolbar
    let toolbarX = rect.left + rect.width / 2 - toolbarWidth / 2;
    let toolbarY = rect.top - toolbarHeight - 10; // 10px above the selection

    // Ensure the toolbar doesn't go off the viewport horizontally
    toolbarX = Math.max(
      10,
      Math.min(toolbarX, window.innerWidth - toolbarWidth - 10)
    );

    // Ensure the toolbar stays within the viewport vertically (always above)
    toolbarY = Math.max(10, toolbarY);

    // Position the hidden trigger button if it exists
    if (this.menuTriggerButton?.nativeElement) {
      this.renderer.setStyle(
        this.menuTriggerButton.nativeElement,
        'top',
        `${toolbarY + window.scrollY}px`
      );
      this.renderer.setStyle(
        this.menuTriggerButton.nativeElement,
        'left',
        `${toolbarX + window.scrollX}px`
      );
    }

    // Open the menu
    setTimeout(() => {
      this.menuTrigger?.openMenu();
    });
  }

  /**
   * Closes the toolbar if it's open.
   */
  private closeToolbar() {
    if (this.menuTrigger?.menuOpen) {
      this.menuTrigger?.closeMenu();
      this.contentEditable?.editor?.focus();
    }
  }

  /**
   * Saves the current text selection.
   */
  saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedSelection = selection.getRangeAt(0);
    }
  }

  /**
   * Restores the previously saved text selection.
   */
  restoreSelection() {
    if (this.savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(this.savedSelection);
      }
    }
  }

  /**
   * Formats the selected text based on the command.
   * Restores the selection before executing the command to ensure it applies correctly.
   */
  format(command: string, value: string = '') {
    this.restoreSelection();
    this.contentEditable?.editor?.focus();

    document.execCommand(command, false, value);

    this.onContentChange();
    this.updateToolbarState();
  }

  /**
   * Updates the toolbar's button states based on the current selection's formatting.
   */
  private updateToolbarState() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      this.closeToolbar();
      return;
    }

    const range = selection.getRangeAt(0);
    if (range.collapsed) {
      this.closeToolbar();
      return;
    }

    const anchorNode = selection.anchorNode;
    if (!this.contentEditable?.editor?.contains(anchorNode)) {
      this.closeToolbar();
      return;
    }

    // Update formatting state
    this.isBold = document.queryCommandState('bold');
    this.isItalic = document.queryCommandState('italic');
    this.isUnderline = document.queryCommandState('underline');
    this.isNoFormat = !this.isBold && !this.isItalic && !this.isUnderline;

    // Update heading
    const parentElement = this.getParentElement(range.startContainer);
    if (parentElement) {
      const tag = parentElement.tagName;
      if (['H1', 'H2', 'H3', 'P'].includes(tag)) {
        this.currentHeading = tag;
      } else {
        this.currentHeading = 'P';
      }
    }

    // Update text alignment
    const computedStyle = window.getComputedStyle(
      range.startContainer.parentElement!
    );
    this.textAlign = computedStyle.textAlign || 'left';
  }

  /**
   * Retrieves the parent element with specific tags.
   */
  private getParentElement(node: Node): HTMLElement | null {
    let parent = node.parentElement;
    while (parent && parent !== this.contentEditable?.editor) {
      if (['H1', 'H2', 'H3', 'P'].includes(parent!.tagName)) {
        return parent;
      }
      parent = parent!.parentElement;
    }
    return null;
  }

  /**
   * Handles changes in the heading selection.
   */
  onHeadingChange(heading: string) {
    this.restoreSelection();
    this.format('formatBlock', heading);
    this.currentHeading = heading;
    this.updateToolbarState();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.editorContent = value || '';
    this.formControl.setValue(this.editorContent, { emitEvent: false });
    if (this.contentEditable?.editor) {
      this.contentEditable.editor.innerHTML = this.editorContent;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.contentEditable?.editor) {
      this.contentEditable.editor.contentEditable = !isDisabled;
    }
  }

  /**
   * Handles content changes in the editor.
   */
  onContentChange() {
    this.editorContent = this.contentEditable?.editor?.innerHTML;
    this.onChange(this.editorContent);
  }

  /**
   * Determines if the platform is Mac for keyboard shortcuts.
   */
  get isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }

  /**
   * Returns the appropriate meta key based on the platform.
   */
  get metaKey() {
    return this.isMac ? 'Cmd' : 'Ctrl';
  }

  /**
   * Handles keyboard shortcuts for formatting and showing the toolbar.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const ctrlKey = this.isMac ? event.metaKey : event.ctrlKey;
    const shiftKey = event.shiftKey;

    // Handle formatting shortcuts
    if (
      ctrlKey &&
      this.contentEditable?.editor?.contains(
        document.getSelection()?.anchorNode
      )
    ) {
      switch (event.key.toLowerCase()) {
        case 'b':
          this.format('bold');
          break;
        case 'i':
          this.format('italic');
          break;
        case 'u':
          this.format('underline');
          break;
        case 'x':
          this.format('removeFormat');
          break;
        case 'a':
          this.format('selectAll');
          this.saveSelection();
          this.showToolbarForCurrentSelection();
          break;
        case '[':
          this.format('outdent');
          break;
        case ']':
          this.format('indent');
          break;
      }
    }

    // Handle shift + arrow keys to show toolbar
    if (
      shiftKey &&
      (event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown')
    ) {
      setTimeout(() => {
        this.evaluateSelection();
      }, 0);
    }

    // Handle caret movement without selection to close toolbar
    if (
      !shiftKey &&
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ].includes(event.key)
    ) {
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (
            range.collapsed &&
            this.contentEditable?.editor?.contains(
              range.commonAncestorContainer
            )
          ) {
            this.closeToolbar();
          }
        }
      }, 0);
    }
  }

  /**
   * Shows the toolbar based on the current selection.
   */
  private showToolbarForCurrentSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (
        this.contentEditable?.editor?.contains(range.commonAncestorContainer)
      ) {
        this.saveSelection();
        this.showToolbar(range);
      } else {
        this.closeToolbar();
      }
    } else {
      this.closeToolbar();
    }
  }

  /**
   * Converts RGB color string to HEX.
   */
  rgbToHex(string: string) {
    const rgb = string.match(/\d+/g);
    if (!rgb) return '';
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  // Color Picker Methods
  triggerTextColorInput() {
    this.textColorInput.nativeElement.click();
  }

  applyTextColor(color: string) {
    this.format('foreColor', color);
  }

  triggerBackgroundColorInput() {
    this.backgroundColorInput.nativeElement.click();
  }

  applyBackgroundColor(color: string) {
    this.format('hiliteColor', color);
  }

  // Toggle Source View
  toggleSourceView() {
    this.showSource = !this.showSource;
  }
}
