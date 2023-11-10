import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicFormComponent } from 'projects/@atlp/components/atlp-dynamic-form-builder/dynamic-form/dynamic-form.component';
import { dynamicLayout } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-layout.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormPropService } from 'projects/@atlp/components/atlp-dynamic-form-builder/services/dynamic-form-field-props.service';
import {
  DynamicFormService,
  IDynamicFormSubmit,
} from 'projects/@atlp/components/atlp-dynamic-form-builder/services/dynamic-form.service';
import _ from 'lodash';
import { DynamicFormFieldBindingEvents } from 'projects/@atlp/components/atlp-dynamic-form-builder/dynamic-core/dynamic-form-field-element-action-core';

@Component({
  selector: 'dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html',
  styleUrls: ['./dynamic-form-accordion.component.scss'],
})
export class DynamicFormAccordionComponent implements OnInit {
  @Input() isSubmited;
  @Input() uniqueDynamicFormComponentId: string;
  @Input() dynamicFormConfig: dynamicLayout;
  @Input() dynamicFieldActions: {
    [fieldName: string]: DynamicFormFieldBindingEvents;
  };
  @Input() parentcomponentRef: ComponentRef<any>;

  @ViewChild(DynamicFormComponent) dynamicFormInstance: DynamicFormComponent;

  @Output() formInstanceCreated: EventEmitter<FormGroup> = new EventEmitter();
  @Output() afterAllInstanceCreated: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  enableRenderForm: boolean = false;

  constructor(
    public cdr: ChangeDetectorRef,
    public translateService: TranslateService,
    public dynamicFormPropService: DynamicFormPropService,
    private dynamicFormService: DynamicFormService
  ) {}

  ngOnInit(): void {
    this.enableRenderForm = true;
  }

  accordionFormInstanceCreated(formInstance: FormGroup) {
    this.form = formInstance;
    this.formInstanceCreated.emit(this.form);
  }

  submit(dynamicFormComponent: DynamicFormComponent) {
    let formData: IDynamicFormSubmit = {
      formName: this.uniqueDynamicFormComponentId,
      formData: dynamicFormComponent.form,
    };
    this.dynamicFormService.dynamicFormSubmit$.next(formData);
    console.info(this.dynamicFormInstance);
  }
}
