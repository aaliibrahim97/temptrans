export enum SnakBarInfoType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export enum SnakBarHorizontalPosition {
  right = 'right',
  left = 'left',
  center = 'center',
}

export enum SnakBarVerticalPosition {
  top = 'top',
  bottom = 'bottom',
}

export interface ISnakBarModelData {
  snakBarInfoType: SnakBarInfoType;
  message: string;
  subMessage?: string;
  duration?: number;
  isHtml?: boolean;
  isClosed?: boolean;
  snakBarHorizontalPosition?: SnakBarHorizontalPosition;
  snakBarVerticalPosition?: SnakBarVerticalPosition;
  msgWithIcon?: boolean;
}

export const SnakBarModelDefaultSuccessData = {
  snakBarInfoType: SnakBarInfoType.success,
  message: 'Success...',
  subMessage: '',
  duration: 100000,
  isClosed: true,
  snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
  snakBarVerticalPosition: SnakBarVerticalPosition.top,
};

export const SnakBarModelDefaultWarningData = {
  snakBarInfoType: SnakBarInfoType.warning,
  message: 'Warning...',
  subMessage: '',
  duration: 100000,
  isClosed: true,
  snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
  snakBarVerticalPosition: SnakBarVerticalPosition.top,
};

export const SnakBarModelDefaultInfoData = {
  snakBarInfoType: SnakBarInfoType.info,
  message: 'Info...',
  subMessage: '',
  duration: 100000,
  isClosed: true,
  snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
  snakBarVerticalPosition: SnakBarVerticalPosition.top,
};

export const SnakBarModelDefaultErrorData = {
  snakBarInfoType: SnakBarInfoType.error,
  message: 'Error...',
  subMessage: '',
  duration: 100000,
  isClosed: true,
  snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
  snakBarVerticalPosition: SnakBarVerticalPosition.top,
};
