import { ComponentRef, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AtlpDynamicFormRef } from '../injectors/dynamic-form.token';
import { componentTypes } from '../models/dynamic-widget-types';

export interface FormArrayMapping {
  name?: string;
  value?: any;
  checked?: boolean;
  items?: any[];
}

export interface IDynamicFormSubmit {
  formName: string;
  formData: FormGroup;
}

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  formGroupInstances: Map<string, FormGroup> = new Map<string, FormGroup>();
  formReactiveGroup = new BehaviorSubject<Map<string, FormGroup>>(null);
  private parentSlidetFormInstances: Map<string, ComponentRef<any>> = new Map<
    string,
    ComponentRef<any>
  >();
  private formFieldInstances: Map<string, Map<string, ComponentRef<any>>> =
    new Map<string, Map<string, ComponentRef<componentTypes>>>();
  dynamicFormSubmit$ = new Subject<IDynamicFormSubmit>();

  constructor() {}

  setParentSliderFormInstance(
    uniqueFormName: string,
    instance: ComponentRef<any>
  ) {
    this.parentSlidetFormInstances.set(uniqueFormName, instance);
  }

  getParentSliderFormInstance(uniqueFormName: string): ComponentRef<any> {
    return this.parentSlidetFormInstances.get(uniqueFormName);
  }

  removeParentSliderFormInstance(uniqueFormName: string) {
    this.parentSlidetFormInstances.delete(uniqueFormName);
  }

  setDynamicFormFieldInstance(
    uniqueFormName: string,
    formControlName: string,
    componentRef: ComponentRef<any>
  ) {
    if (!this.formFieldInstances.has(uniqueFormName)) {
      this.formFieldInstances.set(
        uniqueFormName,
        new Map<string, ComponentRef<any>>()
      );
    }
    const subFieldInstances = this.formFieldInstances.get(uniqueFormName);
    subFieldInstances.set(formControlName, componentRef);
    this.formFieldInstances.set(uniqueFormName, subFieldInstances);
  }

  getDynamicFormFieldInstance(
    uniqueFormName: string,
    formControlName: string
  ): ComponentRef<any> {
    if (this.formFieldInstances.has(uniqueFormName)) {
      const subFieldInstances = this.formFieldInstances.get(uniqueFormName);
      return subFieldInstances.get(formControlName);
    }
    return null;
  }

  updateDynamicFormFieldInstance(
    uniqueFormName: string,
    formControlName: string,
    componentRef: ComponentRef<any>
  ) {
    if (this.formFieldInstances.has(uniqueFormName)) {
      const subFieldInstances = this.formFieldInstances.get(uniqueFormName);
      subFieldInstances.set(formControlName, componentRef);
    }
  }

  removeDynamicFormFieldInstance(
    uniqueFormName: string,
    formControlName: string
  ) {
    if (this.formFieldInstances.has(uniqueFormName)) {
      const subFieldInstances = this.formFieldInstances.get(uniqueFormName);
      subFieldInstances.delete(formControlName);
    }
  }

  setDynamicReactiveFormInstance(formGroup: FormGroup, formKey: string) {
    //behaviour subject to subscribe once new dynamic form is created
    this.formGroupInstances.set(formKey, formGroup);
    this.formReactiveGroup.next(this.formGroupInstances);
  }

  removeDynamicReactiveFormInstance(key: string) {
    if (this.formGroupInstances.has(key)) {
      this.formGroupInstances.delete(key);
    }
  }

  updateValue(ctx: any, value: any): void {
    // Set value of current control
    let formControl = ctx.group.get(ctx.field.name);
    if (formControl) {
      formControl.setValue(value);
      formControl.markAsDirty();
    }
  }

  updateArrayList(ctx: any, itemList: FormArrayMapping[]): void {
    const formArray = <FormArray>ctx.group.get(ctx.field.name);
    // Remove all existing items
    while (formArray.value.length) {
      formArray.removeAt(0);
    }

    // Re-add an item for each checked box
    for (const item of itemList) {
      if (item.checked) {
        const newFormControl = new FormGroup({});
        newFormControl.setValue(item);
        formArray.push(newFormControl);
      }
    }
    formArray.markAsDirty();
  }
}
