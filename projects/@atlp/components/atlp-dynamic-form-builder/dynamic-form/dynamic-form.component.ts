import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { TranslateService } from '@ngx-translate/core';
import { DynamicFormService } from '../services/dynamic-form.service';
import { DynamicWidgetLibraryService } from '../services/dynamic-widget-library.service';
import { DynamicFormComponentBase } from '../dynamic-core/dynamic-form-component-base';
import { DynamicActionRegistry } from '../dynamic-core/dynamic-action-registry';
import { DynamicBindingRegistry } from '../dynamic-core/dynamic-form-field-element-action-core';
import { DynamiFieldValidationService } from '../services/dynamic-field-validation.service';
import { DynamicFieldsSelectorTerminatorService } from '../services/dynamic-fields-terminator.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  outputs: ['submit', 'formInstanceCreated', 'afterAllInstanceCreated'],
  inputs: [
    'dynamicLayout',
    'isSubmited',
    'isDisable',
    'uniqueDynamicFormComponentId',
    'containerType',
    'formData',
    'layoutConfig',
    'actions',
    'validationMessages',
    'parentcomponentRef',
    'inlineStyles',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicFormComponent,
      multi: true,
    },
    DynamicFieldsSelectorTerminatorService,
  ],
})
export class DynamicFormComponent
  extends DynamicFormComponentBase
  implements AfterViewInit, OnDestroy
{
  @Output() afterAllInstanceCreated: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    _translateService: TranslateService,
    _fb: FormBuilder,
    _iconsService: IconsService,
    _dynamicFormService: DynamicFormService,
    _dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    _actionRegistry: DynamicActionRegistry,
    _dynamicBindingRegistry: DynamicBindingRegistry,
    _dynamiFieldValidationService: DynamiFieldValidationService,
    public _dynamicFieldsSelectorTerminator: DynamicFieldsSelectorTerminatorService
  ) {
    super(
      _translateService,
      _fb,
      _iconsService,
      _dynamicFormService,
      _dynamicWidgetLibraryService,
      _actionRegistry,
      _dynamicBindingRegistry,
      _dynamiFieldValidationService
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.afterAllInstanceCreated.emit(true);
    }, 2000);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    //to remove all dynamic fields references from memory
    this._dynamicFormService.removeParentSliderFormInstance(
      this.uniqueDynamicFormComponentId
    );
    this._dynamicFieldsSelectorTerminator.destroy();
  }
}
