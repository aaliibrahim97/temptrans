import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/dynamic-form-field.interface';
import { DynamicLogService } from '../services/dynamic-log.service';
import { DynamicActionRegistry } from './dynamic-action-registry';

// ********* example ***********
// bindings: Binding = {
//     'click': (event: MouseEvent, fieldConfig: FieldConfig) => {
//       // Handle 'click' event
//     },
//     'change': [
//       (event: Event, fieldConfig: FieldConfig) => {
//         // Handle 'change' event with first handler
//       },
//       (event: Event, fieldConfig: FieldConfig) => {
//         // Handle 'change' event with second handler
//       }
//     ]
//   };

// // Call the event handlers
// const clickEvent = new MouseEvent('click');
// const changeEvent = new Event('change');

// // Call the 'click' event handler
// bindings.click(clickEvent, { /* field config */ });

// // Call the 'change' event handlers
// bindings.change.forEach(handler => {
//   handler(changeEvent, { /* field config */ });
// });
// ********* example ***********

export interface DynamicFormFieldBindingEvents {
  [eventName: string]:
    | ((event: any, field: FieldConfig, group: FormGroup) => void)
    | ((event: any, field: FieldConfig, group: FormGroup) => void)[];
}

@Injectable({ providedIn: 'root' })
export class DynamicBindingRegistry {
  bindings: Map<string, DynamicFormFieldBindingEvents[]> = new Map<
    string,
    DynamicFormFieldBindingEvents[]
  >();

  clearAll() {
    this.bindings = new Map<string, DynamicFormFieldBindingEvents[]>();
  }

  clear(key: string) {
    if (key && this.bindings.has(key)) {
      this.bindings.delete(key);
    }
  }

  register(
    formName: string,
    fieldName: string,
    binding: DynamicFormFieldBindingEvents | DynamicFormFieldBindingEvents[]
  ) {
    this.bindings.set(`${formName}_${fieldName}`, [].concat(binding));
  }

  get(formName: string, filedName: string): DynamicFormFieldBindingEvents[] {
    let key = `${formName}_${filedName}`;
    if (this.bindings.has(key)) {
      return this.bindings.get(key);
    }
    return null;
  }
}

@Injectable()
export abstract class DynamicFormFieldElementActionCore {
  unlisten = [];
  baseFieldConfig: FieldConfig;
  baseGroup: FormGroup;
  elementRef: ElementRef;

  constructor(
    private bindingRegistry: DynamicBindingRegistry,
    private renderer: Renderer2,
    private actionRegistry: DynamicActionRegistry,
    private logger: DynamicLogService
  ) {}

  setupActionBindings(
    field: FieldConfig,
    group: FormGroup,
    elementRef: ElementRef
  ) {
    //this.parseButtons();
    this.baseFieldConfig = field;
    this.baseGroup = group;
    this.elementRef = elementRef;
    this.setupBindings();
  }

  setupInputActionBindings(
    field: FieldConfig,
    group: FormGroup,
    elementRef: ElementRef,
    binding: DynamicFormFieldBindingEvents
  ) {
    //this.parseButtons();
    this.baseFieldConfig = field;
    this.baseGroup = group;
    this.elementRef = elementRef;
    if (binding) {
      for (const eventId in binding) {
        if (binding.hasOwnProperty(eventId)) {
          this.createBinding(eventId, binding[eventId]);
        }
      }
    }
  }

  private setupBindings() {
    const bindings: DynamicFormFieldBindingEvents[] = this.bindingRegistry.get(
      this.baseFieldConfig.formUniqueName,
      this.baseFieldConfig.name || this.baseFieldConfig.key
    );
    if ((bindings || []).length) {
      bindings.forEach((binding) => {
        for (const eventId in binding) {
          this.createBinding(eventId, binding[eventId]);
        }
      });
    }
  }

  private createBinding(eventId, listeners) {
    this.unlisten.push(
      this.renderer.listen(this.elementRef.nativeElement, eventId, (event) => {
        const _listeners = Array.isArray(listeners) ? listeners : [listeners];
        for (const _listener of _listeners) {
          if (_listener instanceof Function) {
            try {
              _listener(event, this.baseFieldConfig, this.baseGroup);
            } catch (e) {
              this.logger.error(
                `Error calling bindings event listener for '${eventId}'`,
                e
              );
            }
          } else {
            this.logger.warn(
              'Calling non function handler for eventId ' +
                eventId +
                ' for path ' +
                this.baseFieldConfig.name
            );
          }
        }
      })
    );
  }

  private parseButtons() {
    // if (this.fieldConfig.schema.buttons !== undefined) {
    //   this.buttons = this.fieldConfig.schema.buttons;
    //   for (let button of this.buttons) {
    //     this.createButtonCallback(button);
    //   }
    // }
  }

  private createButtonCallback(button) {
    button.action = (e) => {
      let action;
      if (button.id && (action = this.actionRegistry.get(button.id))) {
        if (action) {
          action(this.baseFieldConfig, button.parameters);
        }
      }
      e.preventDefault();
    };
  }
}
