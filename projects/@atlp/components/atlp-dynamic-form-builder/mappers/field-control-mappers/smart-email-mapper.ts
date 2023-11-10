export interface ISmartFormEmailMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormEmailMapper implements ISmartFormEmailMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'input';
    formcontrol.inputType = 'email';
    smartcontrol.validate.pattern = smartcontrol.validate.pattern
      ? smartcontrol.validate.pattern
      : '^[a-zA-Z0-9._#$!%^&*?-]+@[a-zA-Z0-9._#$!%^&*?-]+.[a-zA-Z]{2,4}$';
    return formcontrol;
  }
}
