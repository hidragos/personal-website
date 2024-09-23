import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
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
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditorFormField } from './wysiwyg-editor-form-field.component';

@Component({
  selector: 'app-wysiwyg-editor',
  template: `
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
          <mat-option value="P">Normal Text</mat-option>
          <mat-option value="H1"><h1>Heading 1</h1></mat-option>
          <mat-option value="H2"><h2>Heading 2</h2></mat-option>
          <mat-option value="H3"><h3>Heading 3</h3></mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Formatting Buttons -->
      <div
        class="flex flex-row flex-wrap justify-between items-center flex-auto"
      >
        <button
          mat-icon-button
          type="button"
          (click)="format('bold')"
          [disabled]="disabled"
          matTooltip="Bold ({{ metaKey }} + B)"
          [ngClass]="{ 'item-selected': isBold }"
        >
          <mat-icon>format_bold</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('italic')"
          [disabled]="disabled"
          matTooltip="Italic ({{ metaKey }} + I)"
          [ngClass]="{ 'item-selected': isItalic }"
        >
          <mat-icon>format_italic</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('underline')"
          [disabled]="disabled"
          matTooltip="Underline ({{ metaKey }} + U)"
          [ngClass]="{ 'item-selected': isUnderline }"
        >
          <mat-icon>format_underlined</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('removeFormat')"
          [disabled]="disabled"
          matTooltip="Remove Formatting ({{ metaKey }} + X)"
          [ngClass]="{ 'item-selected': isNoFormat }"
        >
          <mat-icon>format_clear</mat-icon>
        </button>

        <!-- Text Alignment Buttons -->
        <button
          mat-icon-button
          type="button"
          (click)="format('justifyLeft')"
          [disabled]="disabled"
          matTooltip="Align Left"
          [ngClass]="{ 'item-selected': textAlign === 'left' }"
        >
          <mat-icon>format_align_left</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('justifyCenter')"
          [disabled]="disabled"
          matTooltip="Align Center"
          [ngClass]="{ 'item-selected': textAlign === 'center' }"
        >
          <mat-icon>format_align_center</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('justifyRight')"
          [disabled]="disabled"
          matTooltip="Align Right"
          [ngClass]="{ 'item-selected': textAlign === 'right' }"
        >
          <mat-icon>format_align_right</mat-icon>
        </button>

        <!-- Indent Buttons -->
        <button
          mat-icon-button
          type="button"
          (click)="format('outdent')"
          [disabled]="disabled"
          matTooltip="Indent Left ({{ metaKey }} + [)"
        >
          <mat-icon>arrow_left_alt</mat-icon>
        </button>
        <button
          mat-icon-button
          type="button"
          (click)="format('indent')"
          [disabled]="disabled"
          matTooltip="Indent Right ({{ metaKey }} + ])"
        >
          <mat-icon>arrow_right_alt</mat-icon>
        </button>
      </div>
    </div>

    <!-- Editable Content Area -->
    <mat-form-field appearance="outline" class="w-full">
      <editor-form-field
        [formControl]="formControl"
        (focusOut)="saveSelection()"
      ></editor-form-field>
    </mat-form-field>
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
    EditorFormField,
    ReactiveFormsModule,
  ],
})
export class TextEditorComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  @ViewChild(EditorFormField)
  contentEditable!: EditorFormField;

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

    if (!document.getSelection()?.toString()) {
      document.execCommand('insertText', false, ' ');
      const selection = window.getSelection();

      selection?.modify('extend', 'backward', 'character');
      console.log(selection?.toString());
    }

    document.execCommand(command, false, value);
    this.onContentChange();
    this.updateToolbarState();
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

    // Traverse up the DOM tree to check for formatting
    let node = parentNode;
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

      node = node.parentElement!;
    }
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
}
