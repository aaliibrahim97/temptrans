export interface ISmartFormUrlMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormUrlMapper implements ISmartFormUrlMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'input';
    formcontrol.inputType = 'url';
    smartcontrol.validate.pattern = smartcontrol.validate.pattern
      ? smartcontrol.validate.pattern
      : '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?';
    return formcontrol;
  }
}
