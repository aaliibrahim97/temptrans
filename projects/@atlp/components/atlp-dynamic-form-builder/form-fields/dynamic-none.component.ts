import { Component, ComponentRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../models/dynamic-form-field.interface';

@Component({
  selector: 'dynamic-none-widget',
  template: ``,
})
export class DynamicNoneComponent implements IDynamicFieldComponent {
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
}
