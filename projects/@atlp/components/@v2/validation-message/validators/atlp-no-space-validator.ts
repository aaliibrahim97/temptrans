import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AtlpTextValidator {
  static noSpaceAllowed(control: AbstractControl): ValidationErrors | null {
    // != -1 means in contains space
    if (control?.value?.toString().includes(' ')) {
      //fire validator
      return { noSpaceAllowed: true };
    } else {
      return null;
    }
  }
}
