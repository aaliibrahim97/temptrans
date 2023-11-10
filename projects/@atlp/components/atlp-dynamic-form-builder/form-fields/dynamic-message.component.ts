import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../models/dynamic-form-field.interface';

@Component({
  selector: 'dynamic-message-widget',
  template: ` <span
    *ngIf="fieldMetaData?.message"
    [class]="fieldMetaData?.labelHtmlClass || ''"
    [innerHTML]="fieldMetaData.message"
  ></span>`,
})
export class DynamicMessageComponent implements OnInit, IDynamicFieldComponent {
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
