import { TemplateRef } from '@angular/core';
import { DynamicFormAutoCompleteInputProps } from './dynamic-form-auto-complete-input-props';
import { DynamicFormInputLookupProps } from './dynamic-form-input-lookup-props';
import { DynamicSelectProps } from './dynamic-select-props';
import {
  IDynamicControlsInputModel,
  IDynamicControlsOutputModel,
} from './dynamic-controls-io-models';
import { IAtlpFileUploadButtonProps } from './dynamic-form-file-button-props';
import { IAtlpFileUploadDropProps } from './dynamic-form-file-drop-props';

export type DynamicPreDefinedFormInputType =
  | 'input'
  | 'decimal'
  | 'button'
  | 'select'
  | 'password'
  | 'date'
  | 'radiobutton'
  | 'checkbox'
  | 'autoComplete'
  | 'inputLookup'
  | 'textarea'
  | 'dynamicComponent'
  | 'dynamicNone'
  | 'dynamicHidden'
  | 'dynamicMessage'
  | 'dynamicTemplate'
  | 'registerCustomComponent'
  | 'time'
  | 'starRating'
  | 'happiness'
  | 'inputNumber'
  | 'contactNumber'
  | 'fileUploadButton'
  | 'fileDrop';

export type InputTypes =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface FieldButtonMetaData {
  color?: string;
  isIconEnabled?: boolean;
  iconName?: string;
}

export interface FieldInputMetaData {
  maxLength?: number;
  minLength?: number;
}

export interface FieldDatePickerMetaData {
  maximum?: number;
  minimum?: number;
}

export interface FieldAppearence {
  appearance?: 'before' | 'after';
}
export interface FieldMatRadioGroupMetaData extends FieldAppearence {
  fxLayout?: string;
  fxFlex?: string;
  fxLayoutAlign?: string;
}

export interface FieldMatCheckBoxMetaData extends FieldAppearence {}

export interface FieldMatSelectMetaData {
  multiple?: boolean;
}

export interface FieldMatSelectMetaData {
  multiple?: boolean;
}

export interface FieldInputNumberMetaData {
  multipleOf?: boolean;
  step?: number;
}

export interface FieldTexAreadMetaData {
  extAreaRows?: number;
  extAreaCols?: number;
}

export type alignType = 'left' | 'right';

export interface FieldInputNumberMetaData {
  align?: alignType;
}

export interface FieldMetaData
  extends FieldButtonMetaData,
    FieldInputMetaData,
    FieldDatePickerMetaData,
    FieldMatRadioGroupMetaData,
    FieldMatSelectMetaData,
    FieldInputNumberMetaData,
    FieldTexAreadMetaData,
    FieldMatCheckBoxMetaData {
  ariaDescribedby?: string;
  readonly?: boolean;
  name?: string;
  type?: string;
  pattern?: string;
  required?: boolean;
  [key: string]: any;
  multiple?: boolean;
}

export interface FieldConfigProps {
  inputComClassList?: string[];
  inputComParentClassList?: string[];
  componentStyle?: Record<string, string>;
  componentParentStyle?: Record<string, string>;
}

export interface FieldConfig {
  customClass?: string;
  truncateMultipleSpaces?: boolean;
  case?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  inputType?: InputTypes | string;
  tabindex?: number;
  options?: string[];
  collections?: any;
  type: DynamicPreDefinedFormInputType;
  value?: any;
  validations?: Validator[];
  autoCompleteInputProps?: DynamicFormAutoCompleteInputProps;
  lookupInputProps?: DynamicFormInputLookupProps;
  dynamicSelectProps?: DynamicSelectProps;
  fileUploadButtonProps?: IAtlpFileUploadButtonProps;
  fileDropProps?: IAtlpFileUploadDropProps;
  isRequired?: boolean;
  isDisabled?: boolean;
  fieldMetaData?: FieldMetaData;
  key?: string;
  props?: FieldConfigProps;
  inputFiledClasses?: string;
  inputComParentFiledClasses?: string;
  templateRef?: TemplateRef<any>;
  templateRefName?: string;
  componentRef?: any; //ComponentRef<any>;
  componentRefName?: string;
  formArray?: FieldConfig[];
  formUniqueName?: string;
  isCustomValidationMsgEnabled?: boolean;
  tooltip?: string;
  description?: string;
  inputsBindings?: IDynamicControlsInputModel;
  outputsBindings?: IDynamicControlsOutputModel;
}
