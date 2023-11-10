import { FormGroup } from '@angular/forms';
import { FieldConfig } from './dynamic-form-field.interface';

export interface IDynamicComponentSubscriptions {
  eventData: any;
  field: FieldConfig;
  group: FormGroup;
}
