export interface IAnnouncementModel {
  title: string;
  message: any;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showRejectButton?: boolean;
  rejectButtonText?: string;
  pageName?: string;
  icon?: string;
  isDocViewer?: boolean;
  fileType?: string;
  hideShowIcon?: boolean;
  showTimer?: boolean;
  template?: any;
  isExcelFile?: boolean;
}
