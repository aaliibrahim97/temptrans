import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';

@Component({
  selector: 'dynamic-component-field',
  templateUrl: './dynamic-component-field.component.html',
  styleUrls: ['./dynamic-component-field.component.scss'],
})
export class DynamicCmpFieldComponent
  implements OnInit, OnChanges, IDynamicFieldComponent
{
  componentRef: ComponentRef<any> = null;
  dynamicComponentRef: any;
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true })
  widgetContainer: ViewContainerRef;

  constructor() {}

  ngOnInit() {
    this.dynamicComponentRef = this.field.componentRef;
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  updateComponent() {
    if (
      this.widgetContainer &&
      !this.componentRef &&
      this.dynamicComponentRef
    ) {
      this.componentRef = this.widgetContainer.createComponent(
        this.dynamicComponentRef
      );
    }
    if (this.componentRef) {
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
      this.componentRef.instance.isSubmited = this.isSubmited;
      this.componentRef.instance.isDisable = this.isDisable;
      this.componentRef.instance.fieldMetaData = this.field.fieldMetaData || {};
      this.componentRef.instance.parentSliderInstance =
        this.parentSliderInstance;
      if (this.componentRef.instance.field?.props?.inputComClassList) {
        this.componentRef.instance.field.inputFiledClasses = Array.from(
          this.componentRef.instance.field.props.inputComClassList
        ).join(' ');
      }
      if (this.componentRef.instance.field?.props?.inputComParentClassList) {
        this.componentRef.instance.field.inputComParentFiledClasses =
          Array.from(
            this.componentRef.instance.field.props.inputComParentClassList
          ).join(' ');
      }
    }
  }
}
