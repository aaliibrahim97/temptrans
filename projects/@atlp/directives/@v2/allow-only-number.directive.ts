import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[allowOnlyNumber]',
})
export class IacAllowOnlyNumberDirective {
  // prettier-ignore
  regexStr = "^[0-9]+$";
  @Input() allowOnlyNumber: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.allowOnlyNumber) {
      return new RegExp(this.regexStr).test(event.key);
    }
    return null;
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    if (this.allowOnlyNumber) {
      this.validateFields(event);
    }
    return null;
  }

  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData('text/plain')
      .replace(/[^0-9 ]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }
}
