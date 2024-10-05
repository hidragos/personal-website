import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  LinkReplaceDirective,
  TogglablePlaceholderDirective,
  YoutubeReplaceDirective,
} from '@shared';
import { Subject } from 'rxjs';

@Component({
  selector: 'editor-form-field',
  standalone: true,
  template: `
    <div
      class="editor-content rounded-md min-h-64 h-fit overflow-auto border-none outline-none"
      contenteditable="true"
      id="editor"
      appYoutubeReplace
      (input)="onContentChange()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut()"
      (paste)="onPaste($event)"
      [class.disabled]="disabled"
      [attr.data-placeholder]="placeholder"
    ></div>
  `,
  styles: [
    `
      .editor-content.disabled {
        background-color: #f5f5f5;
        pointer-events: none;
      }
      .editor-content::before {
        content: attr(data-placeholder);
        display: block;
      }
      .editor-content:focus::before,
      .editor-content:not(:empty)::before {
        content: '';
      }
    `,
  ],
  providers: [{ provide: MatFormFieldControl, useExisting: EditorFormField }],
  host: {
    '[attr.id]': 'id',
    '[class.floating]': 'shouldLabelFloat',
    '[attr.aria-describedby]': 'describedBy',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()',
    '(click)': 'onContainerClick($event)',
  },
  imports: [
    TogglablePlaceholderDirective,
    YoutubeReplaceDirective,
    LinkReplaceDirective,
  ],
})
export class EditorFormField
  implements
    MatFormFieldControl<string>,
    ControlValueAccessor,
    OnDestroy,
    DoCheck,
    AfterViewInit
{
  static nextId = 0;
  @HostBinding()
  id = `editor-form-field-${EditorFormField.nextId++}`;
  @Output() focusOut = new EventEmitter<boolean>();
  @Input() placeholder: string = '';
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'editor-form-field';
  errorState = false;
  describedBy = '';
  editor: any;

  @Input()
  get required() {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (!this.editor) return;

    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this._renderer.addClass(this.editor, 'disabled');
      this.editor.setAttribute('contenteditable', 'false');
    } else {
      this._renderer.removeClass(this.editor, 'disabled');
      this.editor.setAttribute('contenteditable', 'true');
    }
    this.stateChanges.next();
  }
  private _disabled = false;

  get empty() {
    return !this.value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(val: string | null) {
    this._value = val;
    this._renderer.setProperty(
      this.editor?.nativeElement,
      'innerText',
      this._value
    );
    this.stateChanges.next();
    this.onChange(val);
  }
  private _value: string | null = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  ngAfterViewInit(): void {
    // select by id
    this.editor = this._elementRef.nativeElement.querySelector('#editor');
  }

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  ngDoCheck() {
    this.updateErrorState();
  }

  updateErrorState() {
    const oldState = this.errorState;
    const control = this.ngControl ? this.ngControl.control : null;
    const parent = this._parentFormGroup || this._parentForm;
    const newState = !!(
      control &&
      control.invalid &&
      (control.touched || (parent && parent.submitted))
    );
    if (oldState !== newState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (!this.focused) {
      this.editor?.focus();
    }
  }

  onFocusIn() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut() {
    if (this.focused) {
      this.focused = false;
      this.touched = true;
      this.onTouched();
      this.stateChanges.next();
      this.focusOut.emit(false);
    }
  }

  onContentChange() {
    const text = this.editor?.innerHTML.trim() || '';
    this.value = text;
    this.onChange(text);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const htmlData = clipboardData.getData('text/html');
      const textData = clipboardData.getData('text/plain');
      let sanitizedData = '';

      if (htmlData) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');
        this.sanitizeNode(doc.body);
        sanitizedData = doc.body.innerHTML;
      } else {
        sanitizedData = textData;
      }

      // Insert the sanitized HTML at the cursor position
      this.insertHtmlAtCursor(sanitizedData);
      this.onContentChange();
    }
  }

  private insertHtmlAtCursor(html: string) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      this.editor?.insertAdjacentHTML('beforeend', html);
      return;
    }
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const el = document.createElement('div');
    el.innerHTML = html;
    const fragment = document.createDocumentFragment();
    let node: ChildNode | null;
    while ((node = el.firstChild)) {
      fragment.appendChild(node);
    }
    range.insertNode(fragment);
    // Move the cursor after the inserted content
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private sanitizeNode(node: HTMLElement) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    // Remove font-related styles
    if (node.hasAttribute('style')) {
      const styles = node.getAttribute('style')?.split(';') || [];
      const filteredStyles = styles.filter((style) => {
        const property = style.split(':')[0].trim().toLowerCase();
        return ![
          'font-family',
          'font-size',
          'font-style',
          'font-weight',
        ].includes(property);
      });
      if (filteredStyles.length > 0) {
        node.setAttribute('style', filteredStyles.join('; '));
      } else {
        node.removeAttribute('style');
      }
    }

    // Remove <font> tags but keep their content
    if (node.tagName.toLowerCase() === 'font') {
      const parent = node.parentNode;
      while (node.firstChild) {
        parent?.insertBefore(node.firstChild, node);
      }
      parent?.removeChild(node);
      return;
    }

    // Recursively sanitize child nodes
    Array.from(node.children).forEach((child) =>
      this.sanitizeNode(child as HTMLElement)
    );
  }

  writeValue(value: any): void {
    this.value = value;
    setTimeout(() => {
      this._renderer.setProperty(this.editor, 'innerHTML', this.value);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
