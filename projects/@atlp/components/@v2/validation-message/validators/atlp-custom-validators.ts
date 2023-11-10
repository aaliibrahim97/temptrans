import { Validators } from '@angular/forms';

export function atlpConditionalValidator(predicate, validator) {
  return (formControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return validator(formControl);
    }
    return null;
  };
}

export function atlpRequiredIfValidator(predicate) {
  return (formControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return Validators.required(formControl);
    } else {
      return null;
    }
  };
}
