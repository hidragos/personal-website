// Updated TextEditorComponent
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';

import { EditorFormField } from './wysiwyg-editor-form-field.component';

@Component({
  selector: 'app-wysiwyg-editor',
  template: `
    <ng-container *transloco="let t">
      <div
        class="flex flex-row flex-wrap justify-between items-center space-x-2 mb-2"
      >
        <!-- Heading Selection Dropdown -->
        <mat-form-field appearance="outline" class="pt-4 flex-auto">
          <mat-select
            [panelWidth]="'fit-content'"
            #headingSelect
            (selectionChange)="onHeadingChange($event.value)"
            [disabled]="disabled"
            [value]="currentHeading"
          >
            <mat-option value="P">
              <p>{{ t('editor.paragraph') }}</p>
            </mat-option>
            <mat-option value="H1">
              <h1>{{ t('editor.heading1') }}</h1>
            </mat-option>
            <mat-option value="H2">
              <h2>{{ t('editor.heading2') }}</h2>
            </mat-option>
            <mat-option value="H3">
              <h3>{{ t('editor.heading3') }}</h3>
            </mat-option>
          </mat-select>
        </mat-form-field>

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
              [ngClass]="{ 'item-selected': isNoFormat }"
            >
              <mat-icon>format_clear</mat-icon>
            </button>
          </div>

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

          <!-- Color Picker Buttons -->
          <div class="flex flex-row justify-center">
            <button
              mat-button
              type="button"
              (click)="triggerTextColorInput()"
              [disabled]="disabled"
              matTooltip="{{ t('editor.textColor') }}"
            >
              <input
                #textColorInput
                type="color"
                [value]="currentTextColor"
                (change)="applyTextColor(textColorInput.value)"
                class="bg-transparent w-4 h-4 cursor-pointer"
              />
              <mat-icon>format_color_text</mat-icon>
            </button>
            <button
              mat-button
              type="button"
              (click)="triggerBackgroundColorInput()"
              [disabled]="disabled"
              matTooltip="{{ t('editor.backgroundColor') }}"
            >
              <input
                #backgroundColorInput
                type="color"
                class="bg-transparent w-4 h-4 cursor-pointer"
                [value]="currentBackgroundColor"
                (change)="applyBackgroundColor(backgroundColorInput.value)"
              />
              <mat-icon>format_color_fill</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Editable Content Area -->
      <mat-form-field appearance="outline" class="w-full">
        <editor-form-field
          [placeholder]="placeholder"
          [formControl]="formControl"
          (focusOut)="saveSelection()"
        ></editor-form-field>
      </mat-form-field>

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
      <div *ngIf="showSource" class="mt-2 p-2  rounded">
        {{ formControl.value | json }}
      </div>
    </ng-container>
  `,
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
  ],
})
export class TextEditorComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  @ViewChild(EditorFormField)
  contentEditable!: EditorFormField;

  @ViewChild('textColorInput') textColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('backgroundColorInput')
  backgroundColorInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Enter text here...';

  editorContent: string = '';
  disabled: boolean = false;

  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean = false;
  isNoFormat: boolean = false;
  currentHeading: string = 'P';
  textAlign: string = 'left';

  currentTextColor: string = ''; // Default text color
  currentBackgroundColor: string = ''; // Default background color

  formControl = new FormControl('');

  onChange = (_: any) => {};
  onTouched = () => {};

  showSource: boolean = false;

  private selectionChangeHandler = this.updateToolbarState.bind(this);
  private savedSelection: Range | null = null;

  ngAfterViewInit() {
    document.addEventListener('selectionchange', this.selectionChangeHandler);
    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  ngOnDestroy() {
    document.removeEventListener(
      'selectionchange',
      this.selectionChangeHandler
    );
  }

  setFormat(style: 'bold' | 'italic' | 'underline') {
    this.format(style);
    switch (style) {
      case 'bold':
        this.isBold = !this.isBold;
        break;
      case 'italic':
        this.isItalic = !this.isItalic;
        break;
      case 'underline':
        this.isUnderline = !this.isUnderline;
        break;
    }
  }

  format(command: string, value: string = '') {
    this.contentEditable.editor.focus();
    this.restoreSelection();

    document.execCommand(command, false, value);

    this.onContentChange();
    this.updateToolbarState();
  }

  // Helper function to get all nodes within the range
  getNodesInRange(range: Range): HTMLElement[] {
    const nodes: HTMLElement[] = [];
    const treeWalker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node: Node) => {
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );

    let currentNode = treeWalker.currentNode as HTMLElement;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = treeWalker.nextNode() as HTMLElement;
    }

    return nodes;
  }

  onHeadingChange(heading: string) {
    this.restoreSelection();
    this.format('formatBlock', heading);
    this.currentHeading = heading;
    this.updateToolbarState();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.editorContent = value || '';
    this.formControl.setValue(this.editorContent);
    if (this.contentEditable) {
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
    if (this.contentEditable) {
      this.contentEditable.editor.contentEditable = !isDisabled;
    }
  }

  onContentChange() {
    this.editorContent = this.contentEditable.editor?.innerHTML;
    this.onChange(this.editorContent);
  }

  get isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }

  get metaKey() {
    return this.isMac ? 'Cmd' : 'Ctrl';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const ctrlKey = this.isMac ? event.metaKey : event.ctrlKey;
    if (
      ctrlKey &&
      this.contentEditable.editor?.contains(document.getSelection()?.anchorNode)
    ) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          this.format('bold');
          break;
        case 'i':
          event.preventDefault();
          this.format('italic');
          break;
        case 'u':
          event.preventDefault();
          this.format('underline');
          break;
        case 'x':
          event.preventDefault();
          this.format('removeFormat');
          break;
        case '[':
          event.preventDefault();
          this.format('outdent');
          break;
        case ']':
          event.preventDefault();
          this.format('indent');
          break;
      }
    }
  }

  private updateToolbarState() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const anchorNode = selection.anchorNode;
    if (!this.contentEditable.editor?.contains(anchorNode)) {
      return;
    }

    // Create a range to determine the formatting at the cursor
    const range = selection.getRangeAt(0).cloneRange();
    let parentNode = range.startContainer as HTMLElement;

    if (parentNode.nodeType === Node.TEXT_NODE) {
      parentNode = parentNode.parentElement!;
    }

    // Reset formatting flags
    this.isBold = false;
    this.isItalic = false;
    this.isUnderline = false;
    this.currentHeading = 'P';
    this.textAlign = 'left';

    // Reset color selections
    this.currentTextColor = '';
    this.currentBackgroundColor = '';

    // Traverse up the DOM tree to check for formatting
    let node: HTMLElement | null = parentNode;
    while (node && node !== this.contentEditable.editor) {
      const tagName = node.nodeName;
      switch (tagName) {
        case 'B':
        case 'STRONG':
          this.isBold = true;
          break;
        case 'I':
        case 'EM':
          this.isItalic = true;
          break;
        case 'U':
          this.isUnderline = true;
          break;
        case 'H1':
        case 'H2':
        case 'H3':
          this.currentHeading = tagName;
          break;
        case 'P':
          this.currentHeading = 'P';
          break;
      }

      const textAlign = node.style.textAlign;
      if (textAlign) {
        this.textAlign = textAlign;
      }

      // Check for text color
      const computedStyle = window.getComputedStyle(node);

      console.log(computedStyle);

      const color = computedStyle.color;
      if (color && color !== '') {
        this.currentTextColor = this.rgbToHex(color);
      }

      // Check for background color
      const backgroundColor = computedStyle.backgroundColor;
      if (backgroundColor && backgroundColor !== '') {
        this.currentBackgroundColor = this.rgbToHex(backgroundColor);
      }

      node = node.parentElement!;
    }
  }

  rgbToHex(string: string) {
    const rgb = string.match(/\d+/g);
    if (!rgb) return '';
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedSelection = selection.getRangeAt(0);
    }
  }

  restoreSelection() {
    if (this.savedSelection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedSelection);
      this.savedSelection = null;
    }
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

  // Reset Color Methods
  resetTextColor() {
    // completely remove the text color property from style
    this.format('removeFormat', 'foreColor');
    this.currentTextColor = '';
  }

  resetBackgroundColor() {
    this.format('removeFormat', 'hiliteColor');
    this.currentBackgroundColor = '';
  }

  // Toggle Source View
  toggleSourceView() {
    this.showSource = !this.showSource;
  }
}
