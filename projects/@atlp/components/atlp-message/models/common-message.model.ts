import { AtlpCommonDialogEnum } from './enums/common-dialog.enum';

export interface AtlpCommonMessageDialog {
  sliderTitle: string;
  dialogType: AtlpCommonDialogEnum;
  title: string;
  messageData?: any;
  inputReason?:string;
  reasonError?:string;
  subTitle?: string;
  btnClick?: string;
  okBtnText?: string;
  cancelBtnText?: string;
  rejectAbortButtonText?: string;
  keyToCloseSlider: string;
}

export const AtlpCommonMessageDialogDefault: AtlpCommonMessageDialog = {
  sliderTitle: 'Slider Title',
  dialogType: AtlpCommonDialogEnum.ok,
  title: 'Title',
  okBtnText: 'Ok',
  cancelBtnText: 'Cancel',
  keyToCloseSlider: 'string'
};
