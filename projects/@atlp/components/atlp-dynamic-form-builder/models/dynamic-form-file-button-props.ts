import { AtlpFileUploadButtonInputModel } from 'projects/@atlp/components/@v2/file-upload/atlp-file-upload-button/models/atlp-file-upload-button.model';

export interface IAtlpFileUploadButtonProps
  extends AtlpFileUploadButtonInputModel {
  sourceType?: string;
  sourceFnName?: string;
}
