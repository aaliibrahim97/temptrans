import { HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { IAtlpLookupConstant } from '../../@v2/atlp-lookup/models/atlp-lookup-constants.model';
import { IAtlpInputLookUpService } from '../../@v2/atlp-lookup/models/atlp-input-lookup.interface';

export interface DynamicFormInputLookupProps {
  placeholder: string;
  displayItemCode?: string;
  displayItemNameInEnglish?: string;
  displayItemNameInArabic?: string;
  name?: string;
  isFlexEnabled: boolean;
  lookUpObject: IAtlpLookupConstant;
  source?: IAtlpInputLookUpService | any[];
  floatLabel?: string;
  doPrefetch?: boolean;
  hasSearchButton?: boolean;
  hasProgressBar?: boolean;
  minChars?: number;
  clearAfterSearch?: boolean;
  showAddNew?: boolean;
  addNewText?: string;
  isFocused?: boolean;
  validationErrors?: string[];
  serviceParams?: HttpParams;
  displayItemFn?: (item?: any) => string;
  transformResult?: (x?: any[]) => any;
  isDisabled?: boolean;
  fxFlexValue?: string;
  tabindex?: number;
  flexParentGap?: string;
  isDetailsDisabled?: boolean;
  marginRightBetweenControls?: string;
  marginLeftBetweenControls?: string;
  isRequiredValidation?: boolean;
  isInvalidObjectValidation?: boolean;
  isCustomValidatorFn?: (selectedItem: any) => { [key: string]: any } | null;
  modelChange?: EventEmitter<any>;
  optionSelected?: EventEmitter<any>;
  createNew?: EventEmitter<any>;
  minlength?: number;
  maxlength?: number;
  setSideBarProperties?: EventEmitter<any>;
  inputTextType?: string;
  lookUpId?: string;
}

export interface DynamicLookupProps extends DynamicFormInputLookupProps {
  itemTemplateRefName?: string;
  displayItemFuncName?: string;
  sourceFnName?: string;
  sourceType?: 'serviceRef' | 'data' | 'dataFnRef';
  isCustomValidatorFnName?: string;
  displayItemFnName?: string;
  transformResultFnName?: string;
  lookUpObjectName?: string;
}
