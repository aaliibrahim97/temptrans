import { DynamicPreDefinedFormInputType } from '../../models/dynamic-form-field.interface';

export interface ISmartFormRadioButtonMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormRadioButtonMapper implements ISmartFormRadioButtonMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = (
      smartcontrol?.type == 'radio' ? 'radiobutton' : smartcontrol?.type
    ) as DynamicPreDefinedFormInputType;
    formcontrol.inputType =
      smartcontrol?.inputType == 'radio'
        ? 'radiobutton'
        : smartcontrol?.inputType;
    return formcontrol;
  }
}
