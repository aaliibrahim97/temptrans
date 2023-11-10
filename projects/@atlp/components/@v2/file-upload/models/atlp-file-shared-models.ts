export interface AtlpFilePreviewModel {
  docFilePath?: string;
  file: File | Blob;
  fileName: string;
  fileType: string;
}

export interface AtlpFileDownLoadModel {
  fileName: string;
  fileDownLoadLink?: string;
  fileContentType: string;
  base64Data?: string;
  blob?: ArrayBuffer;
  file?: File | Blob;
}
