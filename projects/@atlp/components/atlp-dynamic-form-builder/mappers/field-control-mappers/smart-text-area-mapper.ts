export interface ISmartFormTextAreaMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormTextAreaMapper implements ISmartFormTextAreaMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = smartcontrol?.type;
    formcontrol.inputType = smartcontrol?.inputType;
    return formcontrol;
  }
}
