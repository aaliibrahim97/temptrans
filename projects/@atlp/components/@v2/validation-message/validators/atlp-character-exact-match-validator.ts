import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function atlpCompareCharacterExactMatchValidator(
  controlName: string,
  numberOfCharacter: number
) {
  let exactMatchControl: AbstractControl;

  return function atlpCompareCharacterExactMatchValidator(
    control: AbstractControl
  ): ValidationErrors {
    if (!control.parent) {
      return null;
    }

    exactMatchControl = control.parent.get(controlName) as AbstractControl;
    const exactMatchvalue = exactMatchControl.value;
    if (exactMatchvalue && exactMatchvalue.length === numberOfCharacter) {
      return null;
    }
    return {
      charExactMatch: true,
    };
  };
}
