export interface ISmartFormSelectMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormSelectMapper implements ISmartFormSelectMapper {
  map(smartcontrol: any, formcontrol: any): any {
    formcontrol.type = 'select';
    formcontrol.inputType = 'select';
    smartcontrol.data?.values?.forEach((val) => {
      formcontrol.options.push(val?.value);
    });
    return formcontrol;
  }
}
