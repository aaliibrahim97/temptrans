export interface ISmartFormCurrencyMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormCurrencyMapper implements ISmartFormCurrencyMapper {
  map(smartcontrol: any, formcontrol: any): any {
    return '';
  }
}
