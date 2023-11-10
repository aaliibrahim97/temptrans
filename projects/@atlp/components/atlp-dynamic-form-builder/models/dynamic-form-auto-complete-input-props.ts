import { HttpParams } from '@angular/common/http';
import { EventEmitter, TemplateRef } from '@angular/core';
import { IAtlpAutocompleteService } from '../../@v2/atlp-input-autocomplete/services/atlp-auto-complete.interface';
import { IAtlpLookupConstant } from '../../@v2/atlp-lookup/models/atlp-lookup-constants.model';

export interface DynamicFormAutoCompleteInputProps {
  placeholder: string;
  displayItemCode: string;
  displayItemNameInEnglish: string;
  displayItemNameInArabic: string;
  name: string;
  displayItemFunc?: (item: any) => string;
  hasProgressBar?: true;
  source?: IAtlpAutocompleteService | any[];
  minChars: number;
  itemTemplate?: TemplateRef<any>;
  floatLabel?: string;
  doPrefetch?: boolean;
  displayItem?: string;
  hasSearchButton?: boolean;
  clearAfterSearch?: boolean;
  showAddNew?: boolean;
  addNewText?: string;
  isFocused?: boolean;
  validationErrors?: string[];
  serviceParams?: HttpParams;
  displayItemFn?: (item: any) => string;
  onClearData?: (item: any) => string;
  displayTemplate?: TemplateRef<any>;
  transformResult?: (x: any[]) => any;
  tabindex?: number;
  position?: string;
  isDisabled?: boolean;
  multiplesearch?: any;
  modelChange?: EventEmitter<any>;
  optionSelected?: EventEmitter<any>;
  createNew?: EventEmitter<any>;
  onClear?: EventEmitter<any>;
  autoCompleteOnBlur?: EventEmitter<any>;
  lookUpObject?: IAtlpLookupConstant;
  isRequiredValidation?: boolean;
  isInvalidObjectValidation?: boolean;
  isCustomValidatorFn?: (selectedItem: any) => { [key: string]: any } | null;
  overlayPanelAlwaysTop?: boolean;
}

export interface DynamicAutocompleteProps
  extends DynamicFormAutoCompleteInputProps {
  itemTemplateRefName?: string;
  displayItemFuncName?: string;
  sourceFnName?: string;
  sourceType?: 'serviceRef' | 'data' | 'dataFnRef';
}
