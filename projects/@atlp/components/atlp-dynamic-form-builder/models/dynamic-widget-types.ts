import { ComponentRef } from '@angular/core';
import { DynamicAutoCompleteFieldComponent } from '../form-fields/dynamic-auto-complete-field/dynamic-auto-complete-field.component';
import { DynamicButtonFieldComponent } from '../form-fields/dynamic-button-field/dynamic-button-field.component';
import { DynamicCheckboxFieldComponent } from '../form-fields/dynamic-checkbox-field/dynamic-checkbox-field.component';
import { DynamicCmpFieldComponent } from '../form-fields/dynamic-component-field/dynamic-component-field.component';
import { DynamicDateFieldComponent } from '../form-fields/dynamic-date-field/dynamic-date-field.component';
import { DynamicHiddenComponent } from '../form-fields/dynamic-hidden.component';
import { DynamicInputFieldComponent } from '../form-fields/dynamic-input-field/dynamic-input-field.component';
import { DynamicInputLookupFieldComponent } from '../form-fields/dynamic-input-lookup-field/dynamic-input-lookup-field.component';
import { DynamicInputNumberFieldComponent } from '../form-fields/dynamic-input-number-field/dynamic-input-number-field.component';
import { DynamicMessageComponent } from '../form-fields/dynamic-message.component';
import { DynamicNoneComponent } from '../form-fields/dynamic-none.component';
import { DynamicRadiobuttonFieldComponent } from '../form-fields/dynamic-radiobutton-field/dynamic-radiobutton-field.component';
import { DynamicSelectFieldComponent } from '../form-fields/dynamic-select-field/dynamic-select-field.component';
import { DynamicTemplateFieldComponent } from '../form-fields/dynamic-template-field/dynamic-template-field.component';
import { DynamicTextareaFieldComponent } from '../form-fields/dynamic-textarea-field/dynamic-textarea-field.component';
import { IDynamicFieldComponent } from './dynamic-field-component.interface';
import { DynamicTimeFieldComponent } from '../form-fields/dynamic-time-field/dynamic-time-field.component';
import { DynamicStarRatingFieldComponent } from '../form-fields/dynamic-star-field/dynamic-star-rating-field.component';
import { DynamicHapinessFieldComponent } from '../form-fields/dynamic-hapiness-field/dynamic-hapiness-field.component';
import { DynamicDateRangeFieldComponent } from '../form-fields/dynamic-date-range-field/dynamic-date-range-field.component';
import { DynamicFileDropFieldComponent } from '../form-fields/dynamic-file-drop-field/dynamic-file-drop-field.component';
import { DynamicFileUploadButtonFieldComponent } from '../form-fields/dynamic-file-upload-button-field/dynamic-file-upload-button-field.component';

export interface DynamicComponentType
  extends IDynamicFieldComponent,
    ComponentRef<any> {}

export const componentMapper = {
  input: DynamicInputFieldComponent,
  inputNumber: DynamicInputNumberFieldComponent,
  contactNumber: DynamicInputNumberFieldComponent,
  button: DynamicButtonFieldComponent,
  select: DynamicSelectFieldComponent,
  date: DynamicDateFieldComponent,
  daterange: DynamicDateRangeFieldComponent,
  radiobutton: DynamicRadiobuttonFieldComponent,
  checkbox: DynamicCheckboxFieldComponent,
  autoComplete: DynamicAutoCompleteFieldComponent,
  inputLookup: DynamicInputLookupFieldComponent,
  textarea: DynamicTextareaFieldComponent,
  time: DynamicTimeFieldComponent,
  dynamicComponent: DynamicCmpFieldComponent,
  dynamicNone: DynamicNoneComponent,
  dynamicHidden: DynamicHiddenComponent,
  dynamicMessage: DynamicMessageComponent,
  dynamicTemplate: DynamicTemplateFieldComponent,
  fileUploadButton: DynamicFileUploadButtonFieldComponent,
  fileDrop: DynamicFileDropFieldComponent,
};

export type componentTypes =
  | DynamicInputFieldComponent
  | DynamicInputNumberFieldComponent
  | DynamicButtonFieldComponent
  | DynamicSelectFieldComponent
  | DynamicDateFieldComponent
  | DynamicRadiobuttonFieldComponent
  | DynamicCheckboxFieldComponent
  | DynamicAutoCompleteFieldComponent
  | DynamicInputLookupFieldComponent
  | DynamicTextareaFieldComponent
  | DynamicCmpFieldComponent
  | DynamicTemplateFieldComponent
  | DynamicNoneComponent
  | DynamicHiddenComponent
  | DynamicMessageComponent
  | DynamicComponentType
  | DynamicTimeFieldComponent
  | DynamicHapinessFieldComponent
  | DynamicStarRatingFieldComponent
  | DynamicDateRangeFieldComponent
  | DynamicFileUploadButtonFieldComponent
  | DynamicFileDropFieldComponent;
