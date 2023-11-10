import { IAtlpFileUploadDrop } from '../../@v2/file-upload/atlp-file-drop/models/atlp-file-drop-upload.model';

export interface IAtlpFileUploadDropProps extends IAtlpFileUploadDrop {
  sourceType?: string;
  sourceFnName?: string;
}
