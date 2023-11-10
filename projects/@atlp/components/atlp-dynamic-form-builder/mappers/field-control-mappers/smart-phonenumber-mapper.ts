export interface ISmartFormPhoneNumberMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormPhoneNumberMapper implements ISmartFormPhoneNumberMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'inputNumber';
    formcontrol.inputType = 'inputNumber';
    smartcontrol.validate.pattern = smartcontrol.validate.pattern
      ? smartcontrol.validate.pattern
      : '^[\\d*#+]+$';
    return formcontrol;
  }
}
