import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicActionRegistry } from '../../dynamic-core/dynamic-action-registry';
import {
  DynamicBindingRegistry,
  DynamicFormFieldBindingEvents,
  DynamicFormFieldElementActionCore,
} from '../../dynamic-core/dynamic-form-field-element-action-core';
import { DynamicFormFieldValidations } from '../../dynamic-core/dynamic-form-field-validations';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { DynamiFieldValidationService } from '../../services/dynamic-field-validation.service';
import { DynamicLogService } from '../../services/dynamic-log.service';
import {
  IDynamicControlsInputModel,
  IDynamicControlsOutputModel,
} from '../../models/dynamic-controls-io-models';

@Component({
  selector: 'dynamic-input-field',
  templateUrl: './dynamic-input-field.component.html',
  styleUrls: ['./dynamic-input-field.component.scss'],
})
export class DynamicInputFieldComponent
  extends DynamicFormFieldElementActionCore
  implements OnInit, AfterViewInit, IDynamicFieldComponent, OnDestroy
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean = false;
  isHidden: boolean = false;
  isVisible: boolean = true;
  parentSliderInstance: ComponentRef<any>;
  @ViewChild('inputRef') elementRef: ElementRef;
  formattedErrors: string;
  @Input() inputs: IDynamicControlsInputModel;
  @Output() outputs: IDynamicControlsOutputModel;

  constructor(
    bindingRegistry: DynamicBindingRegistry,
    renderer: Renderer2,
    actionRegistry: DynamicActionRegistry,
    logger: DynamicLogService,
    private _dynamiFieldValidationService: DynamiFieldValidationService
  ) {
    super(bindingRegistry, renderer, actionRegistry, logger);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.setupActionBindings(this.field, this.group, this.elementRef);
    if (this.inputs?.events) {
      this.setupInputActionBindings(
        this.field,
        this.group,
        this.elementRef,
        this.inputs?.events
      );
    }
  }

  getFormattedErrors() {
    let errors: any = this.group.controls.errors;
    let validationMessages =
      this._dynamiFieldValidationService.get(this.field.formUniqueName) ||
      this._dynamiFieldValidationService.validationMessages;
    this.formattedErrors = DynamicFormFieldValidations.formatErrors(
      errors,
      validationMessages
    );
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  computedValue(value) {
    if (this.field && this.field.case) {
      if (this.field.case == 'uppercase') {
        this.group.patchValue({ [this.field.name]: value.toUpperCase() });
      } else if (this.field.case == 'lowercase') {
        this.group.patchValue({ [this.field.name]: value.toLowerCase() });
      } else if (this.field.truncateMultipleSpaces) {
        let pp = value.replace(/ +/g, ' ');
        this.group.patchValue({ [this.field.name]: pp });
      }
    }
  }

  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    if (this.unlisten) {
      this.unlisten.forEach((unListen) => {
        unListen();
      });
    }
  }
}
