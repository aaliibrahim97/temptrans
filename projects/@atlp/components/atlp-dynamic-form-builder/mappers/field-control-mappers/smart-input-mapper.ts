export interface ISmartFormInputMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormInputMapper implements ISmartFormInputMapper {
  map(smartcontrol: any, formcontrol: any): any {
    return '';
  }
}
