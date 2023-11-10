import { Injectable } from '@angular/core';
import { DynamicFormFieldBindingEvents } from './dynamic-form-field-element-action-core';

@Injectable({ providedIn: 'root' })
export class DynamicActionRegistry {
  actions: { [key: string]: DynamicFormFieldBindingEvents } = {};

  clear(key: string) {
    if (key && this.actions[key]) {
      delete this.actions[key];
    }
  }

  clearAll() {
    this.actions = {};
  }

  register(actionId: string, action: DynamicFormFieldBindingEvents) {
    this.actions[actionId] = action;
  }

  get(actionId: string) {
    return this.actions[actionId];
  }
}
