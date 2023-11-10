import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../models/dynamic-form-field.interface';
import { DynamicWidgetLibraryService } from '../../services/dynamic-widget-library.service';
import { dynamicLayout } from '../../models/dynamic-layout.interface';

export class DynamicFormControlBase {
  constructor(
    protected fb: FormBuilder,
    protected _dynamicWidgetLibraryService: DynamicWidgetLibraryService
  ) {}

  /**
   * Create an form array element
   * @param layoutConfig layout of form array
   * @returns Form array group
   */
  protected createFormArrayGroup(componentConfig: FieldConfig[]): FormGroup {
    var formGroup: FormGroup = this.fb.group({});
    componentConfig.forEach((item, index) => {
      var control = null;
      if (item.formArray !== undefined) {
        control =
          item.formArray.length > 0
            ? this.fb.array(
                [
                  this.createFormArrayGroup(
                    item.formArray[item.formArray.length - 1].formArray
                  ),
                ],
                this.bindValidations(item.validations || [])
              )
            : this.fb.array([], this.bindValidations(item.validations || []));
      } else {
        control = this.fb.control(
          {
            value: item.value,
            disabled: item.isDisabled,
          },
          this.bindValidations(item.validations || [])
        );
      }
      formGroup.addControl(item.name, control);
    });
    return formGroup;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach((valid) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  /**
   * @description
   * Reset fild values to default or specify some value.
   * @param defaultValues Specify the specific value to set to the controls.
   * @returns void.
   */
  public reset(form: FormGroup, defaultValues?: any): void {
    form.reset(defaultValues);
  }

  /**
   * @description
   * Reset specific fild Errors.
   * @param name Name of the field to reset the error.
   * @returns void.
   */
  resetFieldErrors(form: FormGroup, name: string): void {
    form.get(name).setErrors(null);
  }

  /**
   * @description
   * Updating parts of the data model.
   * Use the patchValue() method to replace any properties defined in the object that have changed in the form model.
   * @returns Form controls values.
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   *  @usageNotes
   * The following snippet shows how a component can implement this abstract class to
   * define its own initialization method.
   * ```ts
   *   this.form.patchValue({
   *     name: 'Todd Motto',
   *     event: {
   *       title: 'AngularCamp 2016',
   *       location: 'Barcelona, Spain'
   *     }
   *   });
   * ```
   */
  protected patchValue(
    form: FormGroup,
    value: { [key: string]: any },
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ) {
    return form.patchValue(value, options);
  }

  /**
   * @description
   * Updating parts of the data model.
   * Use the setValue() method to set a new value for an individual control. The setValue() method strictly adheres to the structure of the form group and replaces the entire value for the control.
   * @returns Form controls values.
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   *  @usageNotes
   * The following snippet shows how a component can implement this abstract class to
   * define its own initialization method.
   * ```ts
   *   this.form.setValue({
   *     name: 'Todd Motto',
   *     event: {
   *       title: 'AngularCamp 2016',
   *       location: 'Barcelona, Spain'
   *     }
   *   });
   * ```
   */
  protected setValue(
    form: FormGroup,
    value: { [key: string]: any },
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ) {
    return form.setValue(value, options);
  }

  /**
   * @description
   * Dynamically remove the form control.
   * @param index Index of item.
   * @usageNotes
   * The following snippet shows how to remove the form control from Froup Group
   * ```ts
   *    removeControl(1,1,1);
   * ```
   */
  protected removeControl(
    dynamicLayout: dynamicLayout,
    form: FormGroup,
    rowIndex: number,
    columnIndex: number,
    componentIndex: number
  ) {
    form.removeControl(
      dynamicLayout[rowIndex].row.columns[columnIndex].components[
        componentIndex
      ].name
    );
    dynamicLayout[rowIndex].row.columns[columnIndex].components.splice(
      componentIndex,
      1
    );
  }
}
