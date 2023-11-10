export interface ISmartFormNumberMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormNumberMapper implements ISmartFormNumberMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'inputNumber';
    formcontrol.inputType = 'inputNumber';
    return formcontrol;
  }
}
