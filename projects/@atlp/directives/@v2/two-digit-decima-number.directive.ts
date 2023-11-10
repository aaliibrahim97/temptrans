import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[atlpDecimalDigitReplace]',
})
export class AtlpDecimalDigitReplaceDirective {
  prevInputValue: string = '';
  regex: RegExp = new RegExp(/^\d{1,11}(\.\d{0,2})?$/g);
  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    '-',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];
  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return false;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;

    const next: string = [
      current.slice(0, position),
      event.key == 'Decimal' ? '.' : event.key,
      current.slice(position),
    ].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
      this.el.nativeElement.value = this.prevInputValue;
      return false;
    } else {
      this.prevInputValue = this.el.nativeElement.value;
    }
    return true;
  }
}
