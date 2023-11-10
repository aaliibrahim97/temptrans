import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { Subject } from 'rxjs';
import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import {
  DynamicBindingRegistry,
  DynamicFormFieldElementActionCore,
} from '../../dynamic-core/dynamic-form-field-element-action-core';
import { DynamicActionRegistry } from '../../dynamic-core/dynamic-action-registry';
import { DynamicLogService } from '../../services/dynamic-log.service';
import { IDynamicComponentSubscriptions } from '../../models/IDynamicFieldComponentSubscriptions';
import { AtlpLookupPaginationService } from 'projects/@atlp/components/@v2/atlp-lookup/services/atlp-lookup-pagination.service';
import { IAtlpLookupConstant } from 'projects/@atlp/components/@v2/atlp-lookup/models/atlp-lookup-constants.model';

@Component({
  selector: 'dynamic-input-lookup-field',
  templateUrl: './dynamic-input-lookup-field.component.html',
  styleUrls: ['./dynamic-input-lookup-field.component.scss'],
  providers: [AtlpLookupPaginationService],
})
export class DynamicInputLookupFieldComponent
  extends DynamicFormFieldElementActionCore
  implements OnInit, AfterViewInit, OnDestroy, IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
  @ViewChild('inputRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;
  optionSelected: Subject<any> = new Subject();
  setSideBarProperties: Subject<any> = new Subject();
  modelChange: Subject<any> = new Subject();
  createNew: Subject<any> = new Subject();

  constructor(
    bindingRegistry: DynamicBindingRegistry,
    renderer: Renderer2,
    actionRegistry: DynamicActionRegistry,
    logger: DynamicLogService,
    protected atlpLookupPaginationService: AtlpLookupPaginationService
  ) {
    super(bindingRegistry, renderer, actionRegistry, logger);
  }

  ngOnInit(): void {
    this.setLookupInputProps();
    this.defaultLookupSourceMaping();
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

  defaultLookupSourceMaping() {
    if (!this.field.lookupInputProps.source) {
      if (
        this.field.lookupInputProps.lookUpObject.isServerSidePaginationEnabled
      ) {
        this.atlpLookupPaginationService.setProps(
          this.inputs.lookup.lookUpObject.fullApiUrl
        );
        this.field.lookupInputProps.source = this.atlpLookupPaginationService;
      }
    }
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  private setLookupInputProps() {
    if (this.inputs?.lookup) {
      this.field.lookupInputProps = {
        placeholder: this.inputs.lookup.placeholder,
        displayItemCode: this.inputs.lookup.displayItemCode,
        displayItemNameInEnglish: this.inputs.lookup.displayItemNameInEnglish,
        displayItemNameInArabic: this.inputs.lookup.displayItemNameInArabic,
        name: this.inputs.lookup.name,
        hasProgressBar: true,
        source: this.mapServiceSource(this.inputs.lookup.sourceType),
        isFlexEnabled: this.inputs.lookup.isFlexEnabled,
        lookUpObject: this.parentSliderInstance[
          this.inputs.lookup.lookUpObjectName
        ] as IAtlpLookupConstant, //this.inputs.lookup.lookUpObject,
        floatLabel: this.inputs.lookup.floatLabel,
        doPrefetch: this.inputs.lookup.doPrefetch,
        hasSearchButton: this.inputs.lookup.hasSearchButton,
        minChars: this.inputs.lookup.minChars || 1,
        clearAfterSearch: this.inputs.lookup.clearAfterSearch,
        showAddNew: this.inputs.lookup.showAddNew,
        addNewText: this.inputs.lookup.addNewText,
        isFocused: this.inputs.lookup.isFocused,
        validationErrors: this.inputs.lookup.validationErrors,
        serviceParams: this.inputs.lookup.serviceParams,
        displayItemFn:
          this.parentSliderInstance[this.inputs.lookup.displayItemFnName],
        transformResult:
          this.parentSliderInstance[this.inputs.lookup.transformResultFnName],
        isDisabled: this.inputs.lookup.isDisabled,
        fxFlexValue: this.inputs.lookup.fxFlexValue,
        tabindex: this.inputs.lookup.tabindex,
        flexParentGap: this.inputs.lookup.flexParentGap,
        isDetailsDisabled: this.inputs.lookup.isDetailsDisabled,
        marginRightBetweenControls:
          this.inputs.lookup.marginRightBetweenControls,
        marginLeftBetweenControls: this.inputs.lookup.marginLeftBetweenControls,
        isRequiredValidation: this.inputs.lookup.isRequiredValidation,
        isInvalidObjectValidation: this.inputs.lookup.isInvalidObjectValidation,
        isCustomValidatorFn:
          this.parentSliderInstance[this.inputs.lookup.isCustomValidatorFnName],
        minlength: this.inputs.lookup.minlength,
        maxlength: this.inputs.lookup.maxlength,
        inputTextType: this.inputs.lookup.inputTextType,
        lookUpId: this.inputs.lookup.lookUpId,
      };
    }
  }

  private mapServiceSource(sourceType: string) {
    switch (sourceType) {
      case 'serviceRef': {
        return this.inputs.lookup.source;
      }
      case 'data': {
        return this.inputs.lookup.source;
      }
      case 'dataFnRef': {
        return this.parentSliderInstance[this.inputs.lookup.sourceFnName]();
      }
    }
  }

  optionSelectedAction($event) {
    this.optionSelected.next(this.mapOutputEventsData($event));
  }

  setSideBarPropertiesAction($event) {
    this.setSideBarProperties.next(this.mapOutputEventsData($event));
  }

  modelChangeAction($event) {
    this.modelChange.next(this.mapOutputEventsData($event));
  }

  createNewAction($event) {
    this.createNew.next(this.mapOutputEventsData($event));
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
