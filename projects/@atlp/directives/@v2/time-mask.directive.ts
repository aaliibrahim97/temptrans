import {
  BACKSPACE,
  DELETE,
  LEFT_ARROW,
  NINE,
  NUMPAD_NINE,
  NUMPAD_ZERO,
  RIGHT_ARROW,
  TAB,
  ZERO,
} from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  HostListener,
  OnInit,
  Renderer2,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[atlpTimeMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpTimeMaskDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AtlpTimeMaskDirective),
      multi: true,
    },
  ],
})
export class AtlpTimeMaskDirective
  implements OnInit, ControlValueAccessor, Validator
{
  /** implements ControlValueAccessorInterface */
  _onChange: (_: string) => void;

  /** implements ControlValueAccessorInterface */
  _touched: () => void;

  private _dateValue: Date;

  /**
   * This variable indicates that the field (hours or minutes) should behave like
   * if you had just received the focus
   */
  private _fieldJustGotFocus = false;

  constructor(@Self() private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    // this._el.nativeElement.style.fontFamily = 'monospace';
    this._el.nativeElement.style.cursor = 'default';
  }

  /** Treat the keys */
  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const keyCode = evt.keyCode;
    switch (keyCode) {
      case LEFT_ARROW:
      case RIGHT_ARROW:
      case TAB:
        this._decideWhetherToJumpAndSelect(keyCode, evt);
        break;

      case DELETE:
      case BACKSPACE:
        this._clearHoursOrMinutes();
        break;

      default:
        if (
          (keyCode >= ZERO && keyCode <= NINE) ||
          (keyCode >= NUMPAD_ZERO && keyCode <= NUMPAD_NINE)
        ) {
          // treat numbers
          this._setInputText(evt.key);
        }
    }

    // prevents the component from trying to update itself:
    // 1 - When the user enters a number, it would cause the screen to blink: once because
    // we are swapping the component value over and over again as standard typing response
    //     of user
    // 2 - When the user types a key different from the ones above, it must be ignored
    if (keyCode !== TAB) {
      evt.preventDefault();
    }
  }

  /** When the component is clicked, you must select hours or minutes */
  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  /** When the component receives focus, you need to select hours or minutes */
  @HostListener('focus', ['$event'])
  onFocus(evt: any) {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  /** When the component loses focus, triggers the ControlValueAccessor's touched */
  @HostListener('blur', ['$event'])
  onBlur(evt: any) {
    this._touched();
  }

  /**
   * Method called when user clicks right or left arrow
   * When the user navigates with the arrows, some actions need to be taken
   * to select the right field: hours or minutes
   */
  private _decideWhetherToJumpAndSelect(keyCode: number, evt?: KeyboardEvent) {
    const caretPosition = this._doGetCaretPosition();

    switch (keyCode) {
      case RIGHT_ARROW:
        this._el.nativeElement.setSelectionRange(3, 6);
        break;

      case LEFT_ARROW:
        this._el.nativeElement.setSelectionRange(0, 2);
        break;

      case TAB:
        if (caretPosition < 2 && !evt.shiftKey) {
          this._el.nativeElement.setSelectionRange(3, 6);
          evt.preventDefault();
        } else if (caretPosition > 2 && evt.shiftKey) {
          this._el.nativeElement.setSelectionRange(0, 2);
          evt.preventDefault();
        }
    }

    this._fieldJustGotFocus = true;
  }

  /**
   * Method called when user types a number key
   */
  private _setInputText(key: string) {
    const input: string[] = this._el.nativeElement.value.split(':');

    const hours: string = input[0];
    const minutes: string = input[1];

    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._setHours(hours, minutes, key);
    } else {
      this._setMinutes(hours, minutes, key);
    }

    this._fieldJustGotFocus = false;
  }

  /** Adjusts the hours field */
  private _setHours(hours: string, minutes: string, key) {
    const hoursArray: string[] = hours.split('');
    const firstDigit: string = hoursArray[0];
    const secondDigit: string = hoursArray[1];

    let newHour = '';

    let completeTime = '';
    let sendCaretToMinutes = false;

    if (firstDigit === '-' || this._fieldJustGotFocus) {
      newHour = `0${key}`;
      sendCaretToMinutes = Number(key) > 2;
    } else {
      newHour = `${secondDigit}${key}`;
      if (Number(newHour) > 23) {
        newHour = '23';
      }
      sendCaretToMinutes = true;
    }

    completeTime = `${newHour}:${minutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
      this._fieldJustGotFocus = true;
    }
  }

  /** Adjust the minutes field */
  private _setMinutes(hours: string, minutes: string, key) {
    const minutesArray: string[] = minutes.split('');
    const firstDigit: string = minutesArray[0];
    const secondDigit: string = minutesArray[1];

    let newMinutes = '';

    let completeTime = '';

    if (firstDigit === '-' || this._fieldJustGotFocus) {
      newMinutes = `0${key}`;
    } else {
      if (Number(minutes) === 59) {
        newMinutes = `0${key}`;
      } else {
        newMinutes = `${secondDigit}${key}`;
        if (Number(newMinutes) > 59) {
          newMinutes = '59';
        }
      }
    }

    completeTime = `${hours}:${newMinutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    this._el.nativeElement.setSelectionRange(3, 6);
  }

  /** Handles backspace or delete key event */
  _clearHoursOrMinutes() {
    const caretPosition = this._doGetCaretPosition();
    const input: string[] = this._el.nativeElement.value.split(':');

    const hours: string = input[0];
    const minutes: string = input[1];

    let newTime = '';
    let sendCaretToMinutes = false;

    if (caretPosition > 2) {
      newTime = `${hours}:--`;
      sendCaretToMinutes = true;
    } else {
      newTime = `--:${minutes}`;
      sendCaretToMinutes = false;
    }

    this._fieldJustGotFocus = true;

    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  /** Implementation for ControlValueAccessor interface */
  writeValue(value: Date): void {
    var inputValue = value;
    if (value && !(value instanceof Date)) {
      // throw new Error('The appTimeMask directive requires the component value to be of type Date');
      const timeArray: string[] = inputValue.toString().split(':');
      value = new Date(
        null,
        null,
        null,
        parseInt(timeArray[0]),
        parseInt(timeArray[1])
      );
    }

    this._dateValue = new Date(value);

    const v = value ? this._dateToStringTime(value) : '--:--';

    this._renderer.setProperty(this._el.nativeElement, 'value', v);
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnChange(fn: (_: string) => void): void {
    this._onChange = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }

  validate(c: FormControl): { [key: string]: any } {
    return this._el.nativeElement.value.indexOf('-') === -1 ? null : null;
  }

  /*
   ** Returns the caret (cursor) position of the specified text field.
   ** Return value range is 0-nativeElement.value.length.
   */
  private _doGetCaretPosition(): number {
    // Initialize
    let iCaretPos = 0;

    const nativeElement = this._el.nativeElement;

    // IE Support
    if (document.hasOwnProperty('selection')) {
      // Set focus on the element
      nativeElement.focus();

      // To get cursor position, get empty selection range
      const oSel = document['selection'].createRange();

      // Move selection start to 0 position
      oSel.moveStart('character', -nativeElement.value.length);

      // The caret position is selection length
      iCaretPos = oSel.text.length;
    } else if (
      nativeElement.selectionStart ||
      nativeElement.selectionStart === '0'
    ) {
      // Firefox support
      iCaretPos = nativeElement.selectionStart;
    }

    // Return results
    return iCaretPos;
  }

  /** build 2-character string */
  private _zeroFill(value: number): string {
    return (value > 9 ? '' : '0') + value;
  }

  /** build a time in 00:00 format */
  private _dateToStringTime(value: Date) {
    return (
      this._zeroFill(value.getHours()) +
      ':' +
      this._zeroFill(value.getMinutes())
    );
  }

  /** Turns a string in format --, -X, X-, XY into a number, considering '-' => 0 */
  private _stringToNumber(str: string) {
    if (str.indexOf('-') === -1) {
      return str;
    }

    const finalStr = str.replace('-', '0').replace('-', '0');

    return finalStr;
  }

  /** Set the NgControl and local value  */
  private _controlValueChanged() {
    const timeArray: string[] = this._el.nativeElement.value.split(':');
    // this._dateValue = new Date(this._dateValue.setHours(this._stringToNumber(timeArray[0])));
    // this._dateValue = new Date(this._dateValue.setMinutes(this._stringToNumber(timeArray[1])));
    // this._onChange(this._dateValue);
    var out = this._stringToNumber(
      this._stringToNumber(timeArray[0]) +
        ':' +
        this._stringToNumber(timeArray[1])
    );
    this._onChange(out);
  }
}
