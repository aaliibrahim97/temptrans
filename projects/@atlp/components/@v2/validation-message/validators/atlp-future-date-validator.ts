import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';

export function atlpDateGreaterThanOrEqualsValidator(
  fieldError: string,
  dateCompareControlName: string
) {
  let thisDateControl: AbstractControl;
  let otherDateControl: AbstractControl;

  return function atlpDateGreaterThanOrEqualsValidator(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }
    if (!thisDateControl) {
      thisDateControl = control;
      otherDateControl = control.parent.get(
        dateCompareControlName
      ) as AbstractControl;
      if (!otherDateControl) {
        throw new Error(
          'dateLessThanOrEqualsValidator(): other control is not found in parent group'
        );
      }
      otherDateControl.valueChanges.subscribe(() => {
        thisDateControl.updateValueAndValidity();
      });
    }
    if (!otherDateControl || !otherDateControl.value) {
      return null;
    }
    const date1 = thisDateControl.value;
    const date2 = otherDateControl.value;
    if (
      date1 !== null &&
      date2 !== null &&
      moment(dateToString(date1)) < moment(dateToString(date2))
    ) {
      return {
        [`${fieldError}Error`]: true,
      };
    }
    return null;
  };
}

export function dateToString(date) {
  if (date != null && date != '' && date != undefined) {
    return `${date.month}/${date.day}/${date.year}`;
  } else {
    return '';
  }
}
