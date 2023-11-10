import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import { DynamicAutocompleteProps } from '../../models/dynamic-form-auto-complete-input-props';

export interface ISmartAutcompleteMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartAutcompleteMapper implements ISmartAutcompleteMapper {
  map(smartcontrol: any, formcontrol: any): any {
    let jsondataforcontrol = smartcontrol?.validate?.json;
    let jsonparseddata = smartcontrol?.validate?.json
      ? JSON.parse(JSON.stringify(jsondataforcontrol))
      : smartcontrol?.validate?.json;
    formcontrol.type = 'autoComplete';
    formcontrol.value = smartcontrol?.value;
    formcontrol.inputsBindings = {} as IDynamicControlsInputModel;
    formcontrol.inputsBindings.autoComplete = {} as DynamicAutocompleteProps;
    // let props = smartcontrol.validate.json.replace(/[\r\n]/gm, '');
    //let jsonprops = JSON.parse(props);
    formcontrol.inputsBindings.autoComplete.displayItemNameInEnglish =
      jsondataforcontrol.displayItemNameInEnglish;
    formcontrol.inputsBindings.autoComplete.displayItemCode =
      jsondataforcontrol.displayItemCode;
    formcontrol.inputsBindings.autoComplete.name = smartcontrol.name;
    formcontrol.inputsBindings.autoComplete.placeholder =
      smartcontrol.placeholder;

    formcontrol.inputsBindings.autoComplete.displayItemNameInArabic =
      jsondataforcontrol.displayItemNameInArabic;
    formcontrol.inputsBindings.autoComplete.displayItemFuncName =
      jsondataforcontrol.displayItemFuncName;
    formcontrol.inputsBindings.autoComplete.sourceFnName =
      jsondataforcontrol.sourceFnName;
    formcontrol.inputsBindings.autoComplete.hasProgressBar =
      jsondataforcontrol.hasProgressBar;
    formcontrol.inputsBindings.autoComplete.sourceType =
      jsondataforcontrol.sourceType;
    formcontrol.inputsBindings.autoComplete.minChars =
      jsondataforcontrol.minChars;
    formcontrol.inputsBindings.autoComplete.itemTemplateRefName =
      jsondataforcontrol.itemTemplateRefName;
    //  console.log(JSON.stringify(formcontrol));
  }
}
