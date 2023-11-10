export type AtlpDialogRole =
  | 'success'
  | 'error'
  | 'warning'
  | 'confirm'
  | 'rejectWithReason';

export interface AtlpConfirmationSliderDialogData {
  okButtonText: string;
  cancelButtonText: string;
  confirmationMsg: string;
  isHtml?: boolean;
}

export interface AtlpRejectReasonSliderDialogData {
  okButtonText: string;
  cancelButtonText: string;
  confirmationMsg: string;
  rejectReason?: string;
  rejectReasonValidationMsg: string;
}

export interface AtlpCommonSliderDialogData {
  okButtonText: string;
  msg: string;
  isHtml?: boolean;
}
