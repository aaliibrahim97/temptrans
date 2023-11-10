import { EventEmitter } from '@angular/core';
import { DynamicFormFieldBindingEvents } from '../dynamic-core/dynamic-form-field-element-action-core';
import { DynamicAutocompleteProps } from './dynamic-form-auto-complete-input-props';
import { DynamicLookupProps } from './dynamic-form-input-lookup-props';
import { IAtlpFileUploadButtonProps } from './dynamic-form-file-button-props';
import { IAtlpFileUploadDropProps } from './dynamic-form-file-drop-props';

export interface IDynamicControlsInputModel {
  lookup?: DynamicLookupProps;
  events?: DynamicFormFieldBindingEvents;
  autoComplete?: DynamicAutocompleteProps;
  atlpFileUploadButton?: IAtlpFileUploadButtonProps;
  atlpFileDrop?: IAtlpFileUploadDropProps;
}

export interface IDynamicAutoCompleteOutputEventEmitters {
  modelChange?: EventEmitter<any>;
  optionSelected?: EventEmitter<any>;
  createNew?: EventEmitter<any>;
  onClear?: EventEmitter<any>;
  autoCompleteOnBlur?: EventEmitter<any>;
}
export interface IDynamicControlsOutputModel {
  events?: DynamicFormFieldBindingEvents;
  autoComplete?: IDynamicAutoCompleteOutputEventEmitters;
}
