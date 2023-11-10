import { AbstractControl } from '@angular/forms';

export function atlpValidateZero(control: AbstractControl) {
  if (control.value === '0') {
    return { invalidValue: true };
  }
  return null;
}
