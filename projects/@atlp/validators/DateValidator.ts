import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';

export function DateLessThanOrEqualsValidator(
  fieldError: string,
  dateCompareControlName: string
) {
  let thisDateControl: AbstractControl;
  let otherDateControl: AbstractControl;

  return function DateLessThanOrEqualsValidate(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }
    if (!thisDateControl) {
      thisDateControl = control;
      otherDateControl =
        control.parent.parent != null &&
        control.parent.parent.get(dateCompareControlName) != null
          ? (control.parent.parent.get(
              dateCompareControlName
            ) as AbstractControl)
          : (control.parent.get(dateCompareControlName) as AbstractControl);
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
    //const date2 = moment(dateToString(otherDateControl.value));
    const date2 = otherDateControl.value;
    if (date1 !== null && date2 !== null && date1 >= date2) {
      return {
        [`${fieldError}Error`]: true,
      };
    }
    return null;
  };
}

export function dateToString(date) {
  if (date != null && date != '' && date != undefined) {
    //return `${date._i.month}/${date._i.day}/${date._i.year}`;
    let day = date.date ? date.date : date.day;
    return `${date.month}/${day}/${date.year}`;
  } else {
    return '';
  }
}
