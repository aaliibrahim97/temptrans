import { FormGroup, Validators } from '@angular/forms';
import { DynamicEventNames } from '../../constants/dynamic-form-events';
import {
  FieldConfig,
  FieldConfigProps,
  Validator,
} from '../../models/dynamic-form-field.interface';

export class SmartFormControlsCommonMapper {
  smartFormControlsCommonMapper(smartcontrol, formcontrol, jsonValidators) {
    formcontrol.validations = [];
    formcontrol.options = [];
    let jsondataforcontrol = smartcontrol?.validate?.json;
    let jsonparseddata = smartcontrol?.validate?.json
      ? JSON.parse(JSON.stringify(jsondataforcontrol))
      : smartcontrol?.validate?.json;
    let jsonfinalvalidators = jsonparseddata?.Validators
      ? jsonparseddata?.Validators
      : [];
    formcontrol.placeholder = smartcontrol.placeholder
      ? smartcontrol.placeholder
      : smartcontrol.validate.json?.placeholder;
    formcontrol.tabindex = smartcontrol.tabindex
      ? smartcontrol.tabindex
      : smartcontrol.validate.json?.tabindex;
    formcontrol.tooltip = smartcontrol.tooltip
      ? smartcontrol.tooltip
      : smartcontrol.validate.json?.tooltip;
    formcontrol.customClass = smartcontrol.customClass
      ? smartcontrol.customClass
      : smartcontrol.validate.json?.customClass;
    formcontrol.description = smartcontrol.description
      ? smartcontrol.description
      : smartcontrol.validate.json?.description;
    formcontrol.isDisabled = smartcontrol.disabled
      ? smartcontrol.disabled
      : smartcontrol.validate.json?.isDisabled;
    formcontrol.inputComParentFiledClasses =
      jsonparseddata?.inputComParentFiledClasses;
    formcontrol.props = {} as FieldConfigProps;
    formcontrol.props.inputComClassList = jsonparseddata?.inputComClassList
      ? jsonparseddata?.inputComClassList
      : [];
    formcontrol.props.inputComParentClassList =
      jsonparseddata?.inputComParentClassList
        ? jsonparseddata?.inputComParentClassList
        : [];
    formcontrol.props.componentStyle = jsonparseddata?.componentStyle
      ? jsonparseddata?.componentStyle
      : [];
    formcontrol.props.componentParentStyle =
      jsonparseddata?.componentParentStyle
        ? jsonparseddata?.componentParentStyle
        : [];
    // formcontrol.componentParentStyle = jsonparseddata?.componentParentStyle;
    formcontrol.inputFiledClasses = jsonparseddata?.inputFiledClasses;
    formcontrol.componentRef = jsonparseddata?.componentRef;
    formcontrol.label = smartcontrol?.label;
    formcontrol.case = smartcontrol?.case;
    formcontrol.truncateMultipleSpaces = smartcontrol?.truncateMultipleSpaces;
    formcontrol.name = smartcontrol.name
      ? smartcontrol.name
      : smartcontrol.label;
    formcontrol.isRequired = smartcontrol.validate.required;
    if (smartcontrol.logic && smartcontrol.logic?.length) {
      smartcontrol.logic?.forEach((log) => {
        if (log.trigger && log.trigger.type == 'simple') {
          log.actions?.forEach((act) => {
            if (act.type && act.type == 'customAction') {
              formcontrol.inputsBindings = {};
              formcontrol.inputsBindings.events = {};
              let jsonca = act?.customAction
                ? JSON.parse(act?.customAction)
                : null;
              let obj = {
                [DynamicEventNames[jsonca?.eventName]]: (
                  event: Event,
                  field: FieldConfig,
                  group: FormGroup
                ) => {
                  eval(jsonca?.eventAction);
                },
              };
              if (jsonca && jsonca?.eventName && jsonca?.eventAction) {
                formcontrol.inputsBindings.events = obj;
                //formcontrol.inputsBindings.events = obj;
                // console.log(formcontrol.inputsBindings.events)
              }
            }
          });
        }
      });
    }
    smartcontrol?.values?.forEach((val) => {
      formcontrol.options.push(val?.value);
    });
    if (!smartcontrol.validate.multiple) {
      let reqvalidator: Validator = {
        name: smartcontrol.validate.required ? 'required' : '',
        validator: smartcontrol.validate.required ? Validators.required : null,
        message: smartcontrol.validate.customMessage
          ? smartcontrol.validate.customMessage
          : 'Field is required',
      };
      // if(formcontrolvalidator.validator !=null){
      formcontrol.validations.push(reqvalidator);
      //}
      if (smartcontrol.validate.pattern) {
        let patternvalidator: Validator = {
          name: 'pattern',
          validator: smartcontrol.validate.pattern
            ? Validators.pattern(smartcontrol.validate.pattern)
            : null,
          message: 'Pattern is not matched',
        };
        // if(formcontrolvalidator.validator !=null){
        formcontrol.validations.push(patternvalidator);
        //}
      }

      if (
        smartcontrol.validate.maxLength ||
        smartcontrol.validate.max ||
        jsonparseddata?.maxLength ||
        jsonparseddata?.max
      ) {
        let vltr = null;
        if (smartcontrol.validate.maxLength) {
          vltr = smartcontrol.validate.maxLength
            ? Validators.maxLength(Number(smartcontrol.validate.maxLength))
            : null;
          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.maxLength = smartcontrol.validate.maxLength;
        } else if (smartcontrol.validate.max) {
          vltr = smartcontrol.validate.max
            ? Validators.maxLength(Number(smartcontrol.validate.max))
            : null;
          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.maxLength = smartcontrol.validate.max;
        } else if (jsonparseddata?.maxLength || jsonparseddata?.max) {
          let jsonmaxval = jsonparseddata?.maxLength
            ? jsonparseddata?.maxLength
            : jsonparseddata?.max;
          vltr = jsonmaxval ? Validators.maxLength(Number(jsonmaxval)) : null;
          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.maxLength = jsonmaxval;
        }
        let maxlengthvalidator: Validator = {
          name: 'maxlength',
          validator: vltr,
          message:
            'max length (' +
            formcontrol.fieldMetaData.maxLength +
            ') is not satisfied',
        };
        // if(formcontrolvalidator.validator !=null){
        formcontrol.validations.push(maxlengthvalidator);
        // }
      }
      if (
        smartcontrol.validate.minLength ||
        smartcontrol.validate.min ||
        jsonparseddata?.min ||
        jsonparseddata?.minLength
      ) {
        let rrr = null;
        if (smartcontrol.validate.minLength) {
          rrr = smartcontrol.validate.minLength
            ? Validators.minLength(Number(smartcontrol.validate.minLength))
            : null;
          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.minLength = smartcontrol.validate.minLength;
        } else if (smartcontrol.validate.min) {
          rrr = smartcontrol.validate.min
            ? Validators.minLength(Number(smartcontrol.validate.min))
            : null;
          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.minLength = smartcontrol.validate.min;
        } else if (jsonparseddata?.min || jsonparseddata?.minLength) {
          let jsonminval = jsonparseddata?.minLength
            ? jsonparseddata?.minLength
            : jsonparseddata?.min;
          rrr = jsonminval ? Validators.minLength(Number(jsonminval)) : null;

          formcontrol.fieldMetaData = {};
          formcontrol.fieldMetaData.minLength = jsonminval;
        }
        let minlengthvalidator: Validator = {
          name: 'minlength',
          validator: rrr,
          message:
            'min length (' +
            formcontrol.fieldMetaData.minLength +
            ') is not satisfied',
        };
        // if(formcontrolvalidator.validator !=null){
        formcontrol.validations.push(minlengthvalidator);
        //}
      }
      //need to check if this is necessary
      if (smartcontrol.properties['Validator']) {
        let customvalidator: Validator = {
          name: smartcontrol.properties['Validator'],
          validator: jsonValidators[smartcontrol.properties['Validator']],
          message: 'Custom validator is not satisfied',
        };
        // if(formcontrolvalidator.validator !=null){
        formcontrol.validations.push(customvalidator);
        //}
      }
      //need to change to multiple later
      if (smartcontrol?.validate?.json) {
        // let cc = smartcontrol?.validate?.json;
        // let ii = JSON.parse(JSON.stringify(cc));

        if (jsonfinalvalidators?.length > 0) {
          jsonfinalvalidators?.forEach((Validator) => {
            let customvalidator: Validator = {
              name: Validator,
              validator: jsonValidators[Validator],
              message: `${Validator}` + ' is not satisfied',
            };
            formcontrol.validations.push(customvalidator);
          });
        }
      }
    } else {
      formcontrol.validations.push(null);
    }

    return formcontrol;
  }
}
