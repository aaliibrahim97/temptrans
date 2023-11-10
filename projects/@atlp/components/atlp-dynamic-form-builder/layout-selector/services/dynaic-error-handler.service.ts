import { Injectable } from '@angular/core';
import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicExpansionPanelComponent } from '../components/expansion-panel-widget/components/expansion-panel.component';

@Injectable()
export class DynamicErrorHandlerService {
  constructor(public translateService: TranslateService) {}

  setErrorDescription(errorObj) {
    if (this.translateService.currentLang === 'en') {
      return errorObj?.message_description_en;
    } else {
      return errorObj?.message_description_ar;
    }
  }

  scrollToInvalidList($this: DynamicExpansionPanelComponent, action: string) {
    action == 'prev'
      ? --$this.currentInvalidListNum
      : ++$this.currentInvalidListNum;
    const errorElement = `${
      $this.listErrors[$this.currentInvalidListNum - 1].page
    }_id`;
    this.scrollToElementById($this, errorElement);
  }

  calculateErrors(
    $this: DynamicExpansionPanelComponent,
    form: FormGroup | FormArray
  ) {
    // $this.errors = [];
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormGroup || control instanceof FormArray) {
        $this.errors = $this.errors.concat(
          this.calculateErrors($this, control)
        );
        return;
      }
      const controlErrors: ValidationErrors = control.errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          $this.errors.push({
            controlName: field,
            errorName: keyError,
            errorValue: controlErrors[keyError],
          });
        });
      }
    });
    // This removes duplicates
    if ($this.isSubmited) {
      $this.errors = $this.errors.filter(
        (error, index, self) =>
          self.findIndex((t) => {
            return (
              t.controlName === error.controlName &&
              t.errorName === error.errorName
            );
          }) === index
      );
    }

    return $this.errors;
  }

  scrollToInvalidControl(
    $this: DynamicExpansionPanelComponent,
    dir: 'prev' | 'next' = null
  ): void {
    let typesToExclude = ['mat-select', 'textarea'];
    var InvalidControls: HTMLElement[] =
      $this.elementRef.nativeElement.querySelectorAll(
        'form .field-wrap .ng-invalid'
      );

    //converted nodelist to array to replace child component with error control start
    InvalidControls = Array.prototype.slice.call(InvalidControls);
    InvalidControls = InvalidControls.map((data) => {
      if (
        data.hasChildNodes() &&
        typesToExclude.indexOf(data.tagName.toLowerCase()) < 0
      )
        data = data.querySelectorAll('input')[0];

      return data;
    });
    // //converted nodelist to array to replace child component with error control end
    let filteredInvalidaControls: any = Array.from(InvalidControls).filter(
      (ctrl) => ctrl.offsetParent != null
    ); // removed hidden controls (avoid moving to hidden controls on next click)
    // const box: HTMLElement =
    //   $this.elementRef.nativeElement.querySelector('.drawer-body');
    if (
      dir === 'next' &&
      $this.currentErrorControl < filteredInvalidaControls.length
    ) {
      $this.currentErrorControl += 1;
    }
    if (dir === 'prev' && $this.currentErrorControl !== 0) {
      $this.currentErrorControl -= 1;
    }
    if ($this.currentErrorControl > filteredInvalidaControls?.length - 1) {
      $this.currentErrorControl -= 1;
    }
    filteredInvalidaControls[$this.currentErrorControl]?.focus(); // without smooth behavior
    this.scrollToElement(
      $this,
      filteredInvalidaControls[$this.currentErrorControl]?.getAttribute('id')
    );
  }

  scrollToElement($this: DynamicExpansionPanelComponent, el): void {
    $this.directiveRef.scrollToElement(el, -100, 0.5, false);
  }

  scrollToElementById($this: DynamicExpansionPanelComponent, el): void {
    $this.directiveRef.scrollToElement(`#${el}`, -100, 0.5);
  }
}
