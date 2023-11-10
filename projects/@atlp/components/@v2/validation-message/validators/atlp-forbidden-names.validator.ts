import { AbstractControl, ValidatorFn } from '@angular/forms';

export function atlpForbiddenNamesValidator(names: string[]): ValidatorFn {
  var newArr = [];
  for (var i = 0; i < names.length; i++) {
    newArr = newArr.concat(names[i]);
  }
  return (control: AbstractControl): { [key: string]: any } | null => {
    // below findIndex will check if control.value is equal to one of our options or not
    if (control.value != null && control.value.NameEnglish != undefined) {
      const index = newArr.findIndex((name) => {
        return new RegExp('^' + name + '$').test(control.value.NameEnglish);
      });
      return index < 0
        ? { forbiddenNames: { value: control.value.NameEnglish } }
        : null;
    } else {
      let index = newArr.findIndex((name) => {
        return new RegExp('^' + name + '$').test(control.value);
      });
      if (control.value == '') {
        index = -1;
      }
      return index < 0 ? { forbiddenNames: { value: control.value } } : null;
    }
  };
}
