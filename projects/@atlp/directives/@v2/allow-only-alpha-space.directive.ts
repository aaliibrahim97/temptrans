import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[allowOnlyAlphaSpace]',
})
export class AtlpAllowOnlyAlphaSpaceDirective {
  // prettier-ignore
  regexStr = "^[a-zA-Z \b]+$";
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData('text/plain')
      .replace(/[^a-zA-Z ]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }
}
