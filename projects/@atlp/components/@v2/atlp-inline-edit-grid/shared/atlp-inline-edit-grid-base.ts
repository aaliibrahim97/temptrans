import { ComponentRef, Injectable } from '@angular/core';
import { DynamicLookupProps } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-form-input-lookup-props';
import { DynamicAutocompleteProps } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-form-auto-complete-input-props';

@Injectable()
export abstract class AtlpInlineEditGridBase {
  constructor() {}

  public setLookupInputProps(
    parentcomponentRef: ComponentRef<any>,
    inputs: DynamicLookupProps,
    colDef: string,
    lookupInputProps: { [key: string]: DynamicLookupProps }
  ) {
    if (inputs) {
      lookupInputProps[colDef] = {
        placeholder: inputs.placeholder,
        displayItemCode: inputs.displayItemCode,
        displayItemNameInEnglish: inputs.displayItemNameInEnglish,
        displayItemNameInArabic: inputs.displayItemNameInArabic,
        name: inputs.name,
        hasProgressBar: inputs.hasProgressBar || true,
        source: this.mapServiceSource(inputs, parentcomponentRef),
        isFlexEnabled: inputs.isFlexEnabled || true,
        lookUpObject: inputs.lookUpObject,
        floatLabel: inputs.floatLabel,
        doPrefetch: inputs.doPrefetch || false,
        hasSearchButton: inputs.hasSearchButton || true,
        minChars: inputs.minChars || 1,
        clearAfterSearch: inputs.clearAfterSearch,
        showAddNew: inputs.showAddNew || false,
        addNewText: inputs.addNewText,
        isFocused: inputs.isFocused,
        validationErrors: inputs.validationErrors,
        serviceParams: inputs.serviceParams,
        displayItemFn: inputs.displayItemFn, //parentcomponentRef[inputs.displayItemFnName],
        transformResult: inputs.transformResult, //parentcomponentRef[inputs.transformResultFnName],
        isDisabled: inputs.isDisabled,
        fxFlexValue: inputs.fxFlexValue,
        tabindex: inputs.tabindex,
        flexParentGap: inputs.flexParentGap,
        isDetailsDisabled: inputs.isDetailsDisabled,
        marginRightBetweenControls: inputs.marginRightBetweenControls,
        marginLeftBetweenControls: inputs.marginLeftBetweenControls,
        isRequiredValidation: inputs.isRequiredValidation,
        isInvalidObjectValidation: inputs.isInvalidObjectValidation,
        isCustomValidatorFn: parentcomponentRef[inputs.isCustomValidatorFnName],
        minlength: inputs.minlength,
        maxlength: inputs.maxlength,
        inputTextType: inputs.inputTextType,
        lookUpId: inputs.lookUpId,
      };
    }
  }

  public setAutocompleteInputProps(
    parentcomponentRef: ComponentRef<any>,
    inputs: DynamicAutocompleteProps,
    colDef: string,
    autoCompleteInputProps: { [key: string]: DynamicAutocompleteProps }
  ) {
    if (inputs) {
      autoCompleteInputProps[colDef] = {
        placeholder: inputs.placeholder || '',
        displayItemCode: inputs.displayItemCode,
        displayItemNameInEnglish: inputs.displayItemNameInEnglish,
        displayItemNameInArabic: inputs.displayItemNameInArabic,
        name: inputs.name,
        displayItemFunc: inputs.displayItemFunc, //parentcomponentRef[inputs.displayItemFuncName],
        hasProgressBar: true,
        source: this.mapServiceSource(inputs, parentcomponentRef),
        minChars: inputs.minChars || 1,
        itemTemplate: inputs.itemTemplate, //parentcomponentRef[inputs.itemTemplateRefName],
        lookUpObject: inputs.lookUpObject,
        transformResult: inputs.transformResult,
      };
    }
  }

  private mapServiceSource(
    inputs: DynamicAutocompleteProps | DynamicLookupProps,
    parentcomponentRef: ComponentRef<any>
  ) {
    switch (inputs.sourceType) {
      case 'serviceRef': {
        return inputs.source;
      }
      case 'data': {
        return inputs.source;
      }
      case 'dataFnRef': {
        return parentcomponentRef[inputs.sourceFnName]();
      }
    }
  }
}
