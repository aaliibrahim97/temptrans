import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export class ProgressBarCalc {
  //form parameter should be Array of controls or
  //formGroup, in case array of controls the first condition will be implemented
  //in case the form is formGroup the second condition will be implemented

  public static getCalculation(form: AbstractControl | Array<any>) {
    let totalValid = recursiveCount(form, 'valid');
    let totalFields = recursiveCount(form, 'all');
    return 100 * (totalValid / totalFields);
  }
}

// prettier-ignore
const recursiveCount = (form: AbstractControl | Array<any>, returnValidOnly: 'valid' | 'all'): number => {
  let fieldsCount = 0;
  if (form instanceof FormControl) {
    if (returnValidOnly == 'valid' && hasValidator(form) && ((form.disabled && form.value) || form.valid)) {
      fieldsCount++;
    } else if (returnValidOnly == 'all' && hasValidator(form)) {
      fieldsCount++;
    }
  } else if (form instanceof FormGroup) {
    // prettier-ignore
    Object.keys(form.controls).forEach((key) => (fieldsCount += recursiveCount(form.controls[key], returnValidOnly)));
  } else if (form instanceof FormArray) {
    // prettier-ignore
    const arrayCount = (form as FormArray)?.controls?.map((control: any) => recursiveCount(control, returnValidOnly));
    // prettier-ignore
    fieldsCount += arrayCount?.reduce((previous, current) => previous + current, 0);
  } else if (form instanceof Array) {
    // prettier-ignore
    const arrayCount = form?.map((control: any) => recursiveCount(control, returnValidOnly));
    // prettier-ignore
    fieldsCount += arrayCount?.reduce((previous, current) => previous + current, 0);
  }
  return fieldsCount;
};

const hasValidator = (abstractControl: AbstractControl): boolean => {
  if (abstractControl?.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && Object.keys(validator)?.length) {
      return true;
    }
  }
  return false;
};
