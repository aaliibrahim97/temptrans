import { TemplateRef } from '@angular/core';
import { IAtlpFileUploadButtonService } from './atlp-file-upload-button-service.interface';

export class AtlpFileUploadButtonResponseModel {
  documentId?: string = '';
  fileData: File;
  uploadResponse?: any;
  isSuccess?: boolean;
}

export class AtlpFileUploadButtonInputModel {
  label?: any;
  disabled?: boolean;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  headers?: any;
  extendedParams?: any;
  isRequired?: boolean;
  templateRef?: TemplateRef<any>;
  source?: IAtlpFileUploadButtonService;
}
