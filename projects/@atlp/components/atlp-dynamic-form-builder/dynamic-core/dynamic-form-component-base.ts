import {
  ComponentRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { DynamicContainerTypes } from '../models/dynamic-container-types';
import { FieldConfig } from '../models/dynamic-form-field.interface';
import { dynamicLayout } from '../models/dynamic-layout.interface';
import { DynamicFormService } from '../services/dynamic-form.service';
import { DynamicWidgetLibraryService } from '../services/dynamic-widget-library.service';
import { v4 as uuidv4 } from 'uuid';
import { DynamicActionRegistry } from './dynamic-action-registry';
import {
  DynamicFormFieldBindingEvents,
  DynamicBindingRegistry,
} from './dynamic-form-field-element-action-core';
import { isObject, isEmpty } from '../validators/validator.functions';
import { DynamiFieldValidationService } from '../services/dynamic-field-validation.service';
import { DynamicFormExternalLoaders } from './dynamic-form-base-utils/dynamic-form-external-loaders';
import { DynamicFormControlBase } from './dynamic-form-base-utils/dynamic-form-control-base';
import {
  AtlpMultiInheritanceMixin,
  AtlpMultiInheritanceMix,
} from '../ts-multiple-inheritance';
import { SafeHtml } from '@angular/platform-browser';

// interface DynamicFormComponentBase<T1, T2> extends DynamicFormControlBase<T1>, DynamicFormControlBase<T2> { };

@Injectable()
// @AtlpMultiInheritanceMix(DynamicFormControlBase, DynamicFormControlBase)
export abstract class DynamicFormComponentBase
  extends AtlpMultiInheritanceMixin(
    DynamicFormControlBase,
    DynamicFormExternalLoaders
  )
  implements OnInit, OnChanges, OnDestroy
{
  form: FormGroup;
  fieldConfigs: FieldConfig[] = [];
  makeFormVisible: boolean = false;

  @Input() dynamicLayout: dynamicLayout = [];
  @Input() isSubmited: boolean;
  @Input() isDisable: boolean;
  @Input() uniqueDynamicFormComponentId: string =
    'DynamicFormComponent_' + uuidv4();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formInstanceCreated: EventEmitter<FormGroup> = new EventEmitter();
  @Input() formData: any = null;
  @Input() actions: { [fieldName: string]: DynamicFormFieldBindingEvents } = {};
  @Input() validationMessages: object = null;
  @Input() parentcomponentRef: ComponentRef<any>;
  @Input() inlineStyles: string;
  sanitizedInlineStyles: SafeHtml;

  constructor(
    private translateService: TranslateService,
    protected fb: FormBuilder,
    private _iconsService: IconsService,
    protected _dynamicFormService: DynamicFormService,
    protected _dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    private _actionRegistry: DynamicActionRegistry,
    private _dynamicBindingRegistry: DynamicBindingRegistry,
    private _dynamiFieldValidationService: DynamiFieldValidationService
  ) {
    super(fb, _dynamicWidgetLibraryService);
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit() {
    // this.setLayoutConfig();
    this._dynamicFormService.setParentSliderFormInstance(
      this.uniqueDynamicFormComponentId,
      this.parentcomponentRef
    );
    this.createControlFields();
    this.form = this.createControl();
    if (this.formData) {
      this.patchValue(this.form, this.formData);
    }
    this.formInstanceCreated.emit(this.form);
    //set dynamic form form group instance
    this._dynamicFormService.setDynamicReactiveFormInstance(
      this.form,
      this.uniqueDynamicFormComponentId
    );
    this.makeFormVisible = true;
    this.resetScriptsAndStyleSheets(this.uniqueDynamicFormComponentId);
    this.loadScripts(this.uniqueDynamicFormComponentId);
    this.loadStyleSheets(this.uniqueDynamicFormComponentId);
    if (this.inlineStyles) {
      this.sanitizedInlineStyles = this.loadInlineStyles(this.inlineStyles);
    }
    if (this.validationMessages && isObject(this.validationMessages)) {
      this._dynamiFieldValidationService.add(
        this.validationMessages,
        this.uniqueDynamicFormComponentId
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.actions) {
      this.setActions();
    }
  }

  private setActions() {
    // this._dynamicBindingRegistry.clearAll();
    if (this.actions) {
      for (const actionId in this.actions) {
        if (this.actions.hasOwnProperty(actionId)) {
          this._dynamicBindingRegistry.register(
            this.uniqueDynamicFormComponentId,
            actionId,
            this.actions[actionId]
          );
        }
      }
    }
  }

  get value() {
    return this.form?.value;
  }

  onSubmit(event: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControlFields() {
    this.dynamicLayout.forEach((layoutData) => {
      layoutData.row.columns.forEach((cloumnData) => {
        if (cloumnData.components.length > 0) {
          this.fieldConfigs = this.fieldConfigs.concat(cloumnData.components);
        }
      });
    });
  }

  createControl() {
    const group = this.fb.group({});
    this.fieldConfigs.forEach((field) => {
      if (
        field.type === 'button' ||
        field.type === 'dynamicNone' ||
        field.type === 'dynamicMessage' ||
        field.type === 'dynamicTemplate'
      ) {
        return;
      }
      if (field.formArray !== undefined) {
        //check this method later as this not tested
        field.formArray.forEach((control) => {
          this.form.setControl(
            control.name,
            this.createFormArrayGroup(control.formArray)
          );
          field.formArray.push(field);
        });
      } else {
        const control = this.fb.control(
          field.value || '',
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });
    return group;
  }

  private get icons(): Array<string> {
    return ['warning-circle-fill', 'data-icon-white'];
  }

  ngOnDestroy(): void {
    //clearAll will clear all accordion action bindings settings so not using here
    // this._dynamicBindingRegistry.clearAll();
    for (const actionId in this.actions) {
      const keyToclear = `${this.uniqueDynamicFormComponentId}_${actionId}`;
      this._dynamicBindingRegistry.clear(keyToclear);
    }
    this.resetScriptsAndStyleSheets(this.uniqueDynamicFormComponentId);
    this._dynamiFieldValidationService.delete(
      this.uniqueDynamicFormComponentId
    );
  }
}
