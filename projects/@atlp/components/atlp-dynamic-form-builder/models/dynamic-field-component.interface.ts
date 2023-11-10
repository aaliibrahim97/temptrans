import { FormGroup } from '@angular/forms';
import { FieldConfig, FieldMetaData } from './dynamic-form-field.interface';
import { ComponentRef } from '@angular/core';

export interface IDynamicFieldComponentFns {
  updateValue?: () => void;
}

export interface IDynamicFieldComponent {
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  isHidden: boolean;
  isVisible: boolean;
  parentSliderInstance: ComponentRef<any>;
}
