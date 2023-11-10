export interface BaseResponse<T> {
  data: T;
  msg: string;
  success: boolean;
  errorList?: Errorlst[];
}

export interface Errorlst {
  error: string;
  value: string;
}

export const defaultApiBaseResponse: BaseResponse<any> = {
  data: null,
  msg: 'Error',
  success: false,
  errorList: [],
};
