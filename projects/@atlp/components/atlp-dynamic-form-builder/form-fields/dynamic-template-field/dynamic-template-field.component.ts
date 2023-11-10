import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'dynamic-template-field',
  templateUrl: './dynamic-template-field.component.html',
  styleUrls: ['./dynamic-template-field.component.scss'],
})
export class DynamicTemplateFieldComponent
  implements OnInit, IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  templateRef: TemplateRef<any>;
  dynamicFieldComponentData: IDynamicFieldComponent;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;

  constructor() {}

  ngOnInit() {
    this.dynamicFieldComponentData = {
      field: this.field,
      group: this.group,
      isSubmited: this.isSubmited,
      fieldMetaData: this.fieldMetaData,
      isDisable: this.isDisable,
      parentSliderInstance: this.parentSliderInstance,
      isHidden: false,
      isVisible: true,
    };
    this.templateRef = this.field.templateRef;
  }
}
