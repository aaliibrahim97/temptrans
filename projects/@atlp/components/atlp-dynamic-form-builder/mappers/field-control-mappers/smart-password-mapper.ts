export interface ISmartFormPasswordMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormPasswordMapper implements ISmartFormPasswordMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'input';
    formcontrol.inputType = 'password';
    return formcontrol;
  }
}
