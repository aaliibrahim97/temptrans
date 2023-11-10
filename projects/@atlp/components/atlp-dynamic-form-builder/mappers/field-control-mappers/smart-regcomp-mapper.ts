export interface ISmartRegCompMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartRegCompMapper implements ISmartRegCompMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'registerCustomComponent';
    formcontrol.inputType = 'decimalInput';
    formcontrol.value = smartcontrol?.value;
    formcontrol.placeholder = smartcontrol.placeholder;
  }
}
