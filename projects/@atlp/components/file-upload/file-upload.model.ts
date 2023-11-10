export interface IFileUploadConfigData {
  uploadType: 'single' | 'multi';
  actions: boolean;
  isAPISetup: boolean;
  fileType?: string[];
  maxFileSize?: number;
  maxFileCount?: number;
  isEditMode?: boolean;
  // If isAPISetup is "true" please send the following details
  isBatchIdSetup?: boolean;
  showDownloadAll?: boolean;
  batchId?: string;
  uploadUrl?: string;
  deleteUrl?: string;
  downloadUrl?: string;
  viewUrl?: string;
  formData?: boolean;
}
