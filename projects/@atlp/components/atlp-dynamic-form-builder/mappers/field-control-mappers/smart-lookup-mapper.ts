import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import { DynamicLookupProps } from '../../models/dynamic-form-input-lookup-props';

export interface ISmartFormLookUpMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormLookUpMapper implements ISmartFormLookUpMapper {
  map(smartcontrol: any, formcontrol: any): any {
    let jsondataforcontrol = smartcontrol?.validate?.json;
    let jsonparseddata = smartcontrol?.validate?.json
      ? JSON.parse(JSON.stringify(jsondataforcontrol))
      : smartcontrol?.validate?.json;
    formcontrol.type = 'inputLookup';
    formcontrol.value = smartcontrol?.value;
    formcontrol.inputsBindings = {} as IDynamicControlsInputModel;
    formcontrol.inputsBindings.lookup = {} as DynamicLookupProps;
    formcontrol.inputsBindings.lookup.placeholder = smartcontrol.placeholder;
    formcontrol.inputsBindings.lookup.displayItemNameInEnglish =
      jsondataforcontrol.displayItemNameInEnglish;
    formcontrol.inputsBindings.lookup.displayItemCode =
      jsondataforcontrol.displayItemCode;
    formcontrol.inputsBindings.lookup.sourceFnName =
      jsondataforcontrol.sourceFnName;
    formcontrol.inputsBindings.lookup.name = smartcontrol.name;
    formcontrol.inputsBindings.lookup.displayItemNameInArabic =
      jsondataforcontrol.displayItemNameInArabic;
    formcontrol.inputsBindings.lookup.hasProgressBar =
      jsondataforcontrol.hasProgressBar;
    formcontrol.inputsBindings.lookup.sourceType =
      jsondataforcontrol.sourceType;
    formcontrol.inputsBindings.lookup.minChars = jsondataforcontrol.minChars;
    formcontrol.inputsBindings.lookup.lookUpId = jsondataforcontrol.lookUpId;
    formcontrol.inputsBindings.lookup.inputTextType =
      jsondataforcontrol.inputTextType;
    formcontrol.inputsBindings.lookup.maxlength = jsondataforcontrol.maxlength;
    formcontrol.inputsBindings.lookup.minlength = jsondataforcontrol.minlength;
    formcontrol.inputsBindings.lookup.isCustomValidatorFnName =
      jsondataforcontrol.isCustomValidatorFnName;
    formcontrol.inputsBindings.lookup.isInvalidObjectValidation =
      jsondataforcontrol.isInvalidObjectValidation;
    formcontrol.inputsBindings.lookup.isRequiredValidation =
      jsondataforcontrol.isRequiredValidation;
    formcontrol.inputsBindings.lookup.name = jsondataforcontrol.name;
    formcontrol.inputsBindings.lookup.marginLeftBetweenControls =
      jsondataforcontrol.marginLeftBetweenControls;
    formcontrol.inputsBindings.lookup.marginRightBetweenControls =
      jsondataforcontrol.marginRightBetweenControls;
    formcontrol.inputsBindings.lookup.isDetailsDisabled =
      jsondataforcontrol.isDetailsDisabled;
    formcontrol.inputsBindings.lookup.flexParentGap =
      jsondataforcontrol.flexParentGap;
    formcontrol.inputsBindings.lookup.tabindex = jsondataforcontrol.tabindex;
    formcontrol.inputsBindings.lookup.isDisabled =
      jsondataforcontrol.isDisabled;
    formcontrol.inputsBindings.lookup.transformResultFnName =
      jsondataforcontrol.transformResultFnName;
    formcontrol.inputsBindings.lookup.displayItemFnName =
      jsondataforcontrol.displayItemFnName;
    formcontrol.inputsBindings.lookup.serviceParams =
      jsondataforcontrol.serviceParams;
    formcontrol.inputsBindings.lookup.isFocused = jsondataforcontrol.isFocused;
    formcontrol.inputsBindings.lookup.validationErrors =
      jsondataforcontrol.validationErrors;
    formcontrol.inputsBindings.lookup.showAddNew =
      jsondataforcontrol.showAddNew;
    formcontrol.inputsBindings.lookup.clearAfterSearch =
      jsondataforcontrol.clearAfterSearch;
    formcontrol.inputsBindings.lookup.hasSearchButton =
      jsondataforcontrol.hasSearchButton;
    formcontrol.inputsBindings.lookup.doPrefetch =
      jsondataforcontrol.doPrefetch;
    formcontrol.inputsBindings.lookup.floatLabel =
      jsondataforcontrol.floatLabel;
    formcontrol.inputsBindings.lookup.lookUpObjectName =
      jsondataforcontrol.lookUpObjectName;
    formcontrol.inputsBindings.lookup.isFlexEnabled =
      jsondataforcontrol.isFlexEnabled;
    formcontrol.inputsBindings.lookup.displayItemNameInArabic =
      jsondataforcontrol.displayItemNameInArabic;
    formcontrol.inputsBindings.lookup.sourceType =
      jsondataforcontrol.sourceType;
  }
}
