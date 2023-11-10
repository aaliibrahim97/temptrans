export interface ISmartFormButtonMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormButtonMapper implements ISmartFormButtonMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'button';
    formcontrol.inputType = 'input';
    return formcontrol;
  }
}
