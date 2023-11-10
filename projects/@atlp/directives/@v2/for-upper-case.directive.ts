import { A, Z } from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  OnInit,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// usage
// forUpperCase

@Directive({
  selector: '[forUpperCase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpForUpperCaseDirective),
      multi: true,
    },
  ],
})
export class AtlpForUpperCaseDirective implements ControlValueAccessor {
  _onChange: (_: any) => void;

  _touched: () => void;

  constructor(@Self() private _el: ElementRef, private _renderer: Renderer2) {}

  @HostListener('keyup', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const keyCode = evt.keyCode;
    const key = evt.key;
    console.log(evt);
    if (keyCode >= A && keyCode <= Z) {
      const value = this._el.nativeElement.value.toUpperCase();
      this._renderer.setProperty(this._el.nativeElement, 'value', value);
      this._onChange(value);
      evt.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this._touched();
  }

  writeValue(value: any): void {
    this._renderer.setProperty(this._el.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }
}
