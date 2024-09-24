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
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

import { YoutubeReplaceDirective } from '../directives';
import { TogglablePlaceholderDirective } from '../directives/togglable-placeholder.directive';

@Component({
  selector: 'editor-form-field',
  standalone: true,
  template: `
    <div
      class="editor-content p-2 rounded-md min-h-64 h-fit overflow-auto border-none outline-none"
      contenteditable="true"
      id="editor"
      appYoutubeReplace
      (input)="onContentChange()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut()"
      [class.disabled]="disabled"
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
        color: #aaa;
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
  imports: [TogglablePlaceholderDirective, YoutubeReplaceDirective],
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
    } else {
      this._renderer.removeClass(this.editor, 'disabled');
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
    this.editor = this._elementRef.nativeElement.children[0];
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
      this.editor?.nativeElement?.focus();
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
    const text = this.editor.innerHTML.trim();
    this.value = text;
    this.onChange(text);
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
