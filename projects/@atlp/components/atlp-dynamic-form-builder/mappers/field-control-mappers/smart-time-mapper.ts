export interface ISmartFormTimeMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormTimeMapper implements ISmartFormTimeMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'time';
    formcontrol.inputType = 'time';
    return formcontrol;
  }
}
