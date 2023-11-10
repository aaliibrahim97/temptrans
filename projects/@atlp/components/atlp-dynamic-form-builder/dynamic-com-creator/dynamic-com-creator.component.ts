import {
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/dynamic-form-field.interface';
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
import { DynamicFormService } from '../services/dynamic-form.service';
import { IAtlpFileUploadDropProps } from '../models/dynamic-form-file-drop-props';
import { IAtlpFileUploadButtonProps } from '../models/dynamic-form-file-button-props';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dynamic-com-creator',
  templateUrl: `./dynamic-com-creator.component.html`,
  styleUrls: ['./dynamic-com-creator.component.scss'],
})
export class DynamicComCreatorComponent implements OnInit, OnChanges {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() isSubmited: boolean;
  @Input() isDisable: boolean;
  @Input() uniqueDynamicFormComponentId: string;
  componentInstance: ComponentRef<componentTypes>;
  selectedComponent: ComponentRef<componentTypes>;
  private subs: Subscription;
  @Input() parentcomponentRef: ComponentRef<any>;
  inputsActions = {
    inputs: {},
  };
  outputsActions = {
    outputs: {},
  };

  constructor(
    private dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    private dynamicFormPropService: DynamicFormPropService,
    private _dynamicFieldsSelectorTerminator: DynamicFieldsSelectorTerminatorService,
    private _dynamicFormService: DynamicFormService
  ) {}

  ngOnInit() {
    //to clean up memory
    this.subs = this._dynamicFieldsSelectorTerminator.onDestroy.subscribe(
      (destroy) => {
        if (destroy) {
          this.componentInstance?.destroy();
        }
      }
    );

    if (this.field.type === 'dynamicComponent') {
      if (this.field.componentRef) {
        this.selectedComponent = this.field.componentRef;
      } else if (this.field.componentRefName) {
        this.selectedComponent =
          this.parentcomponentRef[this.field.componentRefName];
      } else {
        console.log(`No dynamicComponent reference found for ${this.field}`);
        return;
      }
    } else if (this.field.type === 'dynamicTemplate') {
      let selectedTemplateWidget =
        this.dynamicWidgetLibraryService.activeWidgets['dynamicTemplate'];
      if (selectedTemplateWidget) {
        if (
          !this.field.templateRef &&
          this.parentcomponentRef[this.field.templateRefName]
        ) {
          this.field.templateRef =
            this.parentcomponentRef[this.field.templateRefName];
        }
        this.selectedComponent = selectedTemplateWidget;
      } else {
        console.log(`No dynamicTemplate reference found for ${this.field}`);
        return;
      }
    } else if (this.field.type === 'registerCustomComponent') {
      this.selectedComponent =
        this.dynamicWidgetLibraryService.activeWidgets[this.field.inputType];
    } else {
      this.selectedComponent =
        this.dynamicWidgetLibraryService.activeWidgets[this.field.type];
      this.inputsActions.inputs = this.field.inputsBindings || {};
      this.outputsActions.outputs = this.field.outputsBindings || {};
    }
  }

  onComponentLoaed(comInstance: any) {
    this._dynamicFormService.setDynamicFormFieldInstance(
      this.uniqueDynamicFormComponentId,
      this.field.name,
      comInstance
    );
    this.componentInstance = comInstance;
    this.field.formUniqueName = this.uniqueDynamicFormComponentId;
    this.componentInstance.instance.field = this.field;
    this.componentInstance.instance.group = this.group;
    this.componentInstance.instance.isSubmited = this.isSubmited;
    this.componentInstance.instance.isDisable = this.isDisable
      ? true
      : this.field.isDisabled
      ? true
      : false;
    this.componentInstance.instance.fieldMetaData =
      this.field.fieldMetaData || {};
    this.componentInstance.instance.parentSliderInstance =
      this._dynamicFormService.getParentSliderFormInstance(
        this.uniqueDynamicFormComponentId
      );
    if (this.componentInstance.instance.field?.props?.inputComClassList) {
      this.componentInstance.instance.field.inputFiledClasses = Array.from(
        this.componentInstance.instance.field.props.inputComClassList
      ).join(' ');
    }
    if (this.componentInstance.instance.field?.props?.inputComParentClassList) {
      this.componentInstance.instance.field.inputComParentFiledClasses =
        Array.from(
          this.componentInstance.instance.field.props.inputComParentClassList
        ).join(' ');
    }
    if (this.field.type === 'autoComplete') {
      this.field.autoCompleteInputProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.uniqueDynamicFormComponentId,
          FieldPropTypes.dynamicAutoCompleteProps,
          this.field.name
        ) as DynamicFormAutoCompleteInputProps;
    } else if (this.field.type === 'inputLookup') {
      this.field.lookupInputProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.uniqueDynamicFormComponentId,
          FieldPropTypes.dynamicInputLookupProps,
          this.field.name
        ) as DynamicFormInputLookupProps;
    } else if (this.field.type === 'select') {
      this.field.dynamicSelectProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.uniqueDynamicFormComponentId,
          FieldPropTypes.dynamicSelectProps,
          this.field.name
        ) as DynamicFormInputLookupProps;
    } else if (this.field.type === 'fileUploadButton') {
      this.field.fileUploadButtonProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.uniqueDynamicFormComponentId,
          FieldPropTypes.fileUploadButtonProps,
          this.field.name
        ) as IAtlpFileUploadButtonProps;
    } else if (this.field.type === 'fileDrop') {
      this.field.fileDropProps =
        this.dynamicFormPropService.getDynamicFieldProps(
          this.uniqueDynamicFormComponentId,
          FieldPropTypes.fileDropProps,
          this.field.name
        ) as IAtlpFileUploadDropProps;
    }
  }

  ngOnChanges() {
    if (this.componentInstance?.instance) {
      this.componentInstance.instance.isSubmited = this.isSubmited;
    }
  }

  ngOnDestroy() {
    this._dynamicFormService.removeDynamicFormFieldInstance(
      this.uniqueDynamicFormComponentId,
      this.field.name
    );
    this.componentInstance?.destroy();
    this.subs.unsubscribe();
  }
}
