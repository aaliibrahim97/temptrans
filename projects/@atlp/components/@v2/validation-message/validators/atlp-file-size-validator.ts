import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';

export function atlpFileSizeValidator(
  fileControlName: string,
  sizeinMB: number
) {
  let thisFileControl: AbstractControl;

  return function atlpFileSizeValidator(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }

    thisFileControl = control.parent.get(fileControlName) as AbstractControl;
    const file = thisFileControl.value;

    if (file && file.size / 1024 / 1024 >= sizeinMB) {
      return {
        //[`${fileControlName}Error`]: true,
        FileSizeError: true,
      };
    }
    return null;
  };
}
