import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function atlpCompareRexCustomPatternMatchValidator(
  controlName: string,
  regexStr: string,
  validatorError: Object
) {
  let exactMatchControl: AbstractControl;

  return function atlpCompareRexCustomPatternMatchValidator(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }

    exactMatchControl = control.parent.get(controlName) as AbstractControl;
    const exactMatchvalue = exactMatchControl.value;
    if (new RegExp(regexStr).test(exactMatchvalue)) {
      return null;
    }
    return validatorError;
  };
}
