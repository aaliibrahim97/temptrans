import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicActionRegistry } from '../../dynamic-core/dynamic-action-registry';
import {
  DynamicFormFieldElementActionCore,
  DynamicBindingRegistry,
} from '../../dynamic-core/dynamic-form-field-element-action-core';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { DynamicLogService } from '../../services/dynamic-log.service';
import {
  IDynamicControlsInputModel,
  IDynamicControlsOutputModel,
} from '../../models/dynamic-controls-io-models';

@Component({
  selector: 'dynamic-textarea-field',
  templateUrl: './dynamic-textarea-field.component.html',
  styleUrls: ['./dynamic-textarea-field.component.scss'],
})
export class DynamicTextareaFieldComponent
  extends DynamicFormFieldElementActionCore
  implements
    OnInit,
    IDynamicFieldComponent,
    AfterViewInit,
    IDynamicFieldComponent
{
  isDisable: boolean;
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
  @ViewChild('elementRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;
  @Output() outputs: IDynamicControlsOutputModel;

  constructor(
    bindingRegistry: DynamicBindingRegistry,
    renderer: Renderer2,
    actionRegistry: DynamicActionRegistry,
    logger: DynamicLogService
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

  ngOnDestroy(): void {
    if (this.unlisten) {
      this.unlisten.forEach((unListen) => {
        unListen();
      });
    }
  }
}
