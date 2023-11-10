import { InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface AtlpDynamicFormRef {}

export const ATLP_DYNAMIC_FORM_TOKEN = new InjectionToken<AtlpDynamicFormRef>(
  'AtlpDynamicFormRef'
);
