export interface ISmartFormDateTimeMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormDateTimeMapper implements ISmartFormDateTimeMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'date';
    formcontrol.inputType = 'date';
    return formcontrol;
  }
}
