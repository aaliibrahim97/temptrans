import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import {
  DynamicBindingRegistry,
  DynamicFormFieldElementActionCore,
} from '../../dynamic-core/dynamic-form-field-element-action-core';
import { DynamicActionRegistry } from '../../dynamic-core/dynamic-action-registry';
import { DynamicLogService } from '../../services/dynamic-log.service';
import { DynamiFieldValidationService } from '../../services/dynamic-field-validation.service';
import { Subject } from 'rxjs';
import { IDynamicComponentSubscriptions } from '../../models/IDynamicFieldComponentSubscriptions';

@Component({
  selector: 'dynamic-auto-complete-field',
  templateUrl: './dynamic-auto-complete-field.component.html',
  styleUrls: ['./dynamic-auto-complete-field.component.scss'],
})
export class DynamicAutoCompleteFieldComponent
  extends DynamicFormFieldElementActionCore
  implements OnInit, AfterViewInit, OnDestroy, IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  @ViewChild('inputRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;
  modelChange: Subject<any> = new Subject();
  optionSelected: Subject<any> = new Subject();
  createNew: Subject<any> = new Subject();
  onClear: Subject<any> = new Subject();
  autoCompleteOnBlur: Subject<any> = new Subject();
  isHidden: boolean = false;
  isVisible: boolean = true;

  constructor(
    bindingRegistry: DynamicBindingRegistry,
    renderer: Renderer2,
    actionRegistry: DynamicActionRegistry,
    logger: DynamicLogService,
    _dynamiFieldValidationService: DynamiFieldValidationService
  ) {
    super(bindingRegistry, renderer, actionRegistry, logger);
  }

  ngOnInit(): void {
    this.setAutocompleteInputProps();
  }

  private setAutocompleteInputProps() {
    if (this.inputs?.autoComplete) {
      this.field.autoCompleteInputProps = {
        placeholder: this.inputs.autoComplete.placeholder,
        displayItemCode: this.inputs.autoComplete.displayItemCode,
        displayItemNameInEnglish:
          this.inputs.autoComplete.displayItemNameInEnglish,
        displayItemNameInArabic:
          this.inputs.autoComplete.displayItemNameInArabic,
        name: this.inputs.autoComplete.name,
        displayItemFunc:
          this.parentSliderInstance[
            this.inputs.autoComplete.displayItemFuncName
          ],
        hasProgressBar: true,
        source: this.mapServiceSource(this.inputs.autoComplete.sourceType),
        minChars: 1,
        itemTemplate:
          this.parentSliderInstance[
            this.inputs.autoComplete.itemTemplateRefName
          ],
      };
    }
  }

  private mapServiceSource(sourceType: string) {
    switch (sourceType) {
      case 'serviceRef': {
        return this.inputs.autoComplete.source;
      }
      case 'data': {
        return this.inputs.autoComplete.source;
      }
      case 'dataFnRef': {
        return this.parentSliderInstance[
          this.inputs.autoComplete.sourceFnName
        ]();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.inputs?.events) {
      this.setupInputActionBindings(
        this.field,
        this.group,
        this.elementRef,
        this.inputs?.events
      );
    }
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  get formValidator() {
    return this.group.get(this.field.name);
  }

  createNewAction($event) {
    this.createNew.next(this.mapOutputEventsData($event));
  }

  optionSelectedAction($event) {
    this.optionSelected.next(this.mapOutputEventsData($event));
  }

  onClearAction($event) {
    this.onClear.next(this.mapOutputEventsData($event));
  }

  autoCompleteOnBlurAction($event) {
    this.autoCompleteOnBlur.next(this.mapOutputEventsData($event));
  }

  modelChangeAction($event) {
    this.modelChange.next(this.mapOutputEventsData($event));
  }

  private mapOutputEventsData($event) {
    let output: IDynamicComponentSubscriptions = {
      eventData: $event,
      field: this.field,
      group: this.group,
    };
    return output;
  }

  ngOnDestroy(): void {
    if (this.unlisten) {
      this.unlisten.forEach((unListen) => {
        unListen();
      });
    }
  }
}
