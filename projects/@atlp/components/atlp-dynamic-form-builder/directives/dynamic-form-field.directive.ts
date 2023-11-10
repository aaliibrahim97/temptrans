import {
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicPreDefinedFormInputType,
  FieldConfig,
} from '../models/dynamic-form-field.interface';
import { DynamicTemplateFieldComponent } from '../form-fields/dynamic-template-field/dynamic-template-field.component';
import { DynamicCmpFieldComponent } from '../form-fields/dynamic-component-field/dynamic-component-field.component';
import { componentTypes } from '../models/dynamic-widget-types';
import { DynamicWidgetLibraryService } from '../services/dynamic-widget-library.service';
import {
  DynamicFormPropService,
  FieldPropTypes,
} from '../services/dynamic-form-field-props.service';
import { DynamicFormAutoCompleteInputProps } from '../models/dynamic-form-auto-complete-input-props';
import { DynamicFormInputLookupProps } from '../models/dynamic-form-input-lookup-props';
import { DynamicFieldsSelectorTerminatorService } from '../services/dynamic-fields-terminator.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dynamicFormField]',
})
export class DynamicFormFieldDirective implements OnInit, OnChanges {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() isSubmited: boolean;
  @Input() isDisable: boolean;
  @Input() formName: string;
  componentRef: ComponentRef<componentTypes>;
  private subs: Subscription;

  constructor(
    private container: ViewContainerRef,
    private dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    private dynamicFormPropService: DynamicFormPropService,
    private _dynamicFieldsSelectorTerminator: DynamicFieldsSelectorTerminatorService
  ) {}

  ngOnInit() {
    //to clean up memory
    this.subs = this._dynamicFieldsSelectorTerminator.onDestroy.subscribe(
      (destroy) => {
        if (destroy) {
          this.componentRef?.destroy();
        }
      }
    );

    if (this.field.type === 'dynamicComponent') {
      if (this.field.componentRef) {
        this.componentRef = this.container.createComponent(
          this.field.componentRef
        );
      } else {
        console.log(`No component reference found for ${this.field}`);
        return;
      }
    } else if (this.field.type === 'dynamicTemplate') {
      this.componentRef = this.container.createComponent(
        this.dynamicWidgetLibraryService.activeWidgets['dynamicTemplate']
      );
    } else if (this.field.type === 'registerCustomComponent') {
      this.componentRef = this.container.createComponent(
        this.dynamicWidgetLibraryService.activeWidgets[this.field.inputType]
      );
    } else {
      this.componentRef = this.container.createComponent(
        this.dynamicWidgetLibraryService.activeWidgets[this.field.type]
      );
    }
    this.field.formUniqueName = this.formName;
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.isSubmited = this.isSubmited;
    this.componentRef.instance.isDisable = this.isDisable
      ? true
      : this.field.isDisabled
      ? true
      : false;
    this.componentRef.instance.fieldMetaData = this.field.fieldMetaData || {};
    if (this.componentRef.instance.field?.props?.inputComClassList) {
      this.componentRef.instance.field.inputFiledClasses = Array.from(
        this.componentRef.instance.field.props.inputComClassList
      ).join(' ');
    }
    if (this.componentRef.instance.field?.props?.inputComParentClassList) {
      this.componentRef.instance.field.inputComParentFiledClasses = Array.from(
        this.componentRef.instance.field.props.inputComParentClassList
      ).join(' ');
    }
    if (this.field.type === 'autoComplete') {
      this.field.autoCompleteInputProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.formName,
          FieldPropTypes.dynamicAutoCompleteProps,
          this.field.name
        ) as DynamicFormAutoCompleteInputProps;
    } else if (this.field.type === 'inputLookup') {
      this.field.lookupInputProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.formName,
          FieldPropTypes.dynamicInputLookupProps,
          this.field.name
        ) as DynamicFormInputLookupProps;
    } else if (this.field.type === 'select') {
      this.field.dynamicSelectProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.formName,
          FieldPropTypes.dynamicSelectProps,
          this.field.name
        ) as DynamicFormInputLookupProps;
    }
  }

  ngOnChanges() {
    if (this.componentRef?.instance) {
      this.componentRef.instance.isSubmited = this.isSubmited;
    }
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
    this.subs.unsubscribe();
  }
}
