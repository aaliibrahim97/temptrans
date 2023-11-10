import { Input, Directive, Attribute, ElementRef } from '@angular/core';
import { FormControlName, NgControl } from '@angular/forms';

// *********usage**********
// [disableControl]="true"
@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    // const action = condition ? 'disable' : 'enable';
    // this.ngControl.control[action]();
    // this.formControlName.isDisabled = true;
    if (condition) {
      this.ngControl['_parent'].form.controls[this.ngControl.name].disable();
    }
  }

  constructor(private ngControl: NgControl) {}
}
