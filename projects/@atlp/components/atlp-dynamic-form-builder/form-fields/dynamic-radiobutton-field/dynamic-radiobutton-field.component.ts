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
  selector: 'dynamic-radiobutton-field',
  templateUrl: './dynamic-radiobutton-field.component.html',
  styleUrls: ['./dynamic-radiobutton-field.component.scss'],
})
export class DynamicRadiobuttonFieldComponent
  extends DynamicFormFieldElementActionCore
  implements
    OnInit,
    IDynamicFieldComponent,
    AfterViewInit,
    IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
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

  ngOnDestroy(): void {
    if (this.unlisten) {
      this.unlisten.forEach((unListen) => {
        unListen();
      });
    }
  }
}
