export class AtlpFileDropUploadVM {
  ImageBaseData: string;
}

export interface IAtlpFileDropService {
  upload(
    url: string,
    data: FileList,
    isFormData: boolean,
    additionalPayload?: any
  );
}

export interface IAtlpFileUploadDrop {
  isRequired?: boolean;
  fileTypes?: string[];
  disabled?: boolean;
  source?: IAtlpFileDropService;
}
