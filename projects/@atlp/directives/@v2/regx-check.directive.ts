import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';
@Directive({
  selector: '[regxCheck]',
})
export class AtlpRegxCheckDirective implements OnChanges {
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  @Input() patterns: string[] | RegExp[];
  private regexList: RegExp[] = [];
  inputElement: HTMLInputElement;

  constructor(
    public el: ElementRef,
    private defaultSnak: SnakBarService,
    public translateService: TranslateService
  ) {
    this.inputElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patterns) {
      this.regexList = [];
      this.patterns.forEach((regxItem) => {
        if (typeof regxItem === 'object') {
          this.regexList.push(RegExp(regxItem[Object.keys(regxItem)[0]]));
        } else {
          this.regexList.push(RegExp(regxItem));
        }
      });
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // Allow: Ctrl+A
      ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // Allow: Ctrl+C
      ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // Allow: Ctrl+V
      ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // Allow: Ctrl+X
      ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // Allow: Cmd+A (Mac)
      ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // Allow: Cmd+C (Mac)
      ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // Allow: Cmd+V (Mac)
      ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    let newValue = '';

    // Ensure that it is not a space and stop the keypress
    if (e.key === ' ') {
      e.preventDefault();
      return;
    }

    newValue = newValue || this.forecastValue(e.key);
    // check the input pattern RegExp
    if (this.regexList.length > 0) {
      const isValid = this.regexList.some((regXExpression: RegExp) => {
        return !regXExpression.test(newValue);
      });
      if (isValid) {
        e.preventDefault();
      }
      return !isValid;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): boolean {
    let pastedInput: string;
    if (window['clipboardData']) {
      // Browser is IE
      pastedInput = window['clipboardData'].getData('text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      // Other browsers
      pastedInput = event.clipboardData.getData('text/plain');
    }
    event.preventDefault();
    return this.pasteData(pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): boolean {
    const textData = event.dataTransfer.getData('text');
    this.inputElement.focus();
    event.preventDefault();
    return this.pasteData(textData);
  }

  private pasteData(pastedContent: string): boolean {
    const sanitizedContent = this.sanitizeInput(pastedContent);
    if (!sanitizedContent) {
      return false;
    }
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      if (this.inputElement.setRangeText) {
        const { selectionStart: start, selectionEnd: end } = this.inputElement;
        this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
        // Angular's Reactive Form relies on "input" event, but on Firefox, the setRangeText method doesn't trigger it
        // so we have to trigger it ourself.
        if (typeof window['InstallTrigger'] !== 'undefined') {
          this.inputElement.dispatchEvent(
            new Event('input', { cancelable: true })
          );
        }
      } else {
        // Browser does not support setRangeText, e.g. IE
        this.insertAtCursor(this.inputElement, sanitizedContent);
      }
    }
    return true;
  }

  private insertAtCursor(myField: HTMLInputElement, myValue: string): void {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;

    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    const pos = startPos + myValue.length;
    myField.focus();
    myField.setSelectionRange(pos, pos);

    this.triggerEvent(myField, 'input');
  }

  private triggerEvent(el: HTMLInputElement, type: string): void {
    if ('createEvent' in document) {
      // modern browsers, IE9+
      const e = document.createEvent('HTMLEvents');
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    }
  }
  // end stack overflow code

  private sanitizeInput(pasteData: string): string {
    if (this.regexList.length > 0) {
      const isValid = this.regexList.some((regXExpression: RegExp) => {
        return !regXExpression.test(pasteData);
      });
      if (isValid) {
        this.defaultSnak.error(
          this.translateService.instant('PleasePasteValid')
        );
        return null;
      }
    }
    return pasteData;
  }

  private getSelection(): string {
    return this.inputElement.value.substring(
      this.inputElement.selectionStart,
      this.inputElement.selectionEnd
    );
  }

  private forecastValue(key: string): string {
    const selectionStart = this.inputElement.selectionStart;
    const selectionEnd = this.inputElement.selectionEnd;
    const oldValue = this.inputElement.value;
    const selection = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
          key +
          oldValue.substring(selectionStart);
  }
}
