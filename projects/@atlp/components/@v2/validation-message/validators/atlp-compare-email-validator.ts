import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';

export function atlpCompareEmailValidator(email: string, confirmEmail: string) {
  let emailControl: AbstractControl;
  let confirmEmailControl: AbstractControl;

  return function atlpCompareEmailValidator(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }

    emailControl = control.parent.get(email) as AbstractControl;
    confirmEmailControl = control.parent.get(confirmEmail) as AbstractControl;
    const emailvalue = emailControl.value;
    const confirmemailvalue = confirmEmailControl.value;
    if (emailvalue && confirmemailvalue && emailvalue !== confirmemailvalue) {
      return {
        confirmEmailError: true,
      };
    }
    return null;
  };
}
