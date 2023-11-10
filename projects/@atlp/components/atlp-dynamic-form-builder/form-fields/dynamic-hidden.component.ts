import { FormGroup } from '@angular/forms';
import { Component, ComponentRef, OnInit } from '@angular/core';
import {
  FieldConfig,
  FieldMetaData,
} from '../models/dynamic-form-field.interface';
import { IDynamicFieldComponent } from '../models/dynamic-field-component.interface';

@Component({
  selector: 'dynamic-hidden-widget',
  template: `
    <input
      [formControlName]="field.name"
      type="hidden"
      [disableControl]="field.isDisabled ? true : null"
    />
  `,
})
export class DynamicHiddenComponent implements OnInit, IDynamicFieldComponent {
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;

  constructor() {}

  ngOnInit() {}
}
