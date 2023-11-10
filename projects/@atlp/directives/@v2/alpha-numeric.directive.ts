import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[alphaNumeric]',
})
export class AtlpAlphaNumericDirective implements OnChanges {
  // public static ALPHA: RegExp = /^[a-zA-Z]*$/;
  // public static ALPHA_SPACE: RegExp = /^[a-zA-Z\s]*$/;
  // public static ALPHA_NUM: RegExp = /^[a-zA-Z0-9]*$/;
  // public static ALPHA_NUM_SPACE: RegExp = /^[a-zA-Z0-9\s]*$/;
  // public static ARABIC: RegExp = /^[\u0621-\u064A]*$/;
  // public static ARABIC_SPACE: RegExp = /^[\u0621-\u064A\s]*$/;
  // public static ARABIC_NUM: RegExp = /^[\u0621-\u064A\u0660-\u0669]*$/;
  // public static ARABIC_NUM_SPACE: RegExp = /^[\u0621-\u064A\u0660-\u0669\s]*$/;
  // public static DATE_YYYYMMDD: RegExp = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;

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

  // @Input() allowSpace = true;
  // @Input() allowNumbers = true;
  // @Input() isArabic = false;
  // @Input() isDate = false;
  @Input() pattern?: string | RegExp;
  private regex: RegExp;
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
    this.regex = this.pattern ? RegExp(this.pattern) : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pattern) {
      this.regex = this.pattern ? RegExp(this.pattern) : null;
      //|| changes.isDate || changes.isArabic || changes.allowNumbers || changes.allowSpace
      // var patternName = "Patterns.";
      // if(this.isDate) {
      //   patternName += "DATE_YYYYMMDD";
      // } else {
      //   patternName += this.isArabic ? "ARABIC" : "ALPHA";
      //   if(this.allowNumbers) {
      //     patternName += "_NUM";
      //   }
      //   if(this.allowSpace) {
      //     patternName += "_SPACE";
      //   }
      // }
      // console.log(patternName + " : " + eval(patternName))
      // this.regex = this.pattern ? RegExp(this.pattern) : eval(patternName);
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

    let newValue = this.forecastValue(e.key);
    // check the input pattern RegExp
    if (this.regex) {
      var isSuccess = this.regex.test(newValue);
      //console.log(this.regex + " : " + newValue + " : " + isSuccess)
      if (!isSuccess) {
        e.preventDefault();
        return;
      }
    }

    const newNumber = newValue.toString().length;
    if (
      newNumber > this.inputElement.maxLength &&
      this.inputElement.maxLength > 0
    ) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): void {
    let pastedInput: string;
    if (window['clipboardData']) {
      // Browser is IE
      pastedInput = window['clipboardData'].getData('text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      // Other browsers
      pastedInput = event.clipboardData.getData('text/plain');
    }

    this.pasteData(pastedInput);
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    const textData = event.dataTransfer.getData('text');
    this.inputElement.focus();
    this.pasteData(textData);
    event.preventDefault();
  }

  private pasteData(pastedContent: string): void {
    const sanitizedContent = this.sanitizeInput(pastedContent);
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
  }

  // The following 2 methods were added from the below article for browsers that do not support setRangeText
  // https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
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

  private sanitizeInput(input: string): string {
    let strPattern = this.pattern.toString();
    let negatedPattern = strPattern;
    if (strPattern.lastIndexOf('[') > 0 && strPattern.lastIndexOf(']') > 0) {
      negatedPattern = strPattern.substring(
        strPattern.lastIndexOf('[') + 1,
        strPattern.lastIndexOf(']')
      );
    }
    const negatedRegex = new RegExp(`[^${negatedPattern}]`, 'g');
    let result = input.replace(negatedRegex, '');

    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) {
      // the input element has maxLength limit
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
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
