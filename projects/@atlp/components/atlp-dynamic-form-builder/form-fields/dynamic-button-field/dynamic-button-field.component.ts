import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicActionRegistry } from '../../dynamic-core/dynamic-action-registry';
import {
  DynamicBindingRegistry,
  DynamicFormFieldElementActionCore,
} from '../../dynamic-core/dynamic-form-field-element-action-core';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldButtonMetaData,
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { DynamicLogService } from '../../services/dynamic-log.service';

@Component({
  selector: 'dynamic-button-field',
  templateUrl: './dynamic-button-field.component.html',
  styleUrls: ['./dynamic-button-field.component.scss'],
})
export class DynamicButtonFieldComponent
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
  buttonstyle: any;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
  // @ViewChild('elementRef') elementRef: ElementRef;
  @ViewChild('elementRef', { static: false, read: ElementRef })
  elementRef: ElementRef;

  constructor(
    bindingRegistry: DynamicBindingRegistry,
    renderer: Renderer2,
    actionRegistry: DynamicActionRegistry,
    logger: DynamicLogService
  ) {
    super(bindingRegistry, renderer, actionRegistry, logger);
  }

  ngOnInit() {
    if (this.field.customClass == 'submit-right') {
      this.buttonstyle = 'margin-top: 30.6px';
    } else {
      this.buttonstyle = '';
    }
  }

  ngAfterViewInit(): void {
    this.setupActionBindings(this.field, this.group, this.elementRef);
  }

  clickHandler($event) {
    if (this.field?.inputType && this.field.inputType != 'submit') {
      $event.stopPropagation();
      $event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    if (this.unlisten) {
      this.unlisten.forEach((item) => {
        item();
      });
    }
  }
}
