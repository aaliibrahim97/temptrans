export interface ISmartFormCheckboxMapper {
  map: (smartcontrol?: any, formcontrol?: any) => any;
}

export class SmartFormCheckboxMapper implements ISmartFormCheckboxMapper {
  map(smartcontrol: any, formcontrol: any): any {
    if (smartcontrol?.values?.length > 0) {
      formcontrol.type = 'select';
      formcontrol.inputType = 'select';
      smartcontrol.data?.values?.forEach((val) => {
        formcontrol.options.push(val?.value);
      });
      formcontrol.fieldMetaData = {};
      formcontrol.fieldMetaData.multiple = true;
    } else {
      formcontrol.type = 'checkbox';
      formcontrol.inputType = 'checkbox';
    }
    return formcontrol;
  }
}
