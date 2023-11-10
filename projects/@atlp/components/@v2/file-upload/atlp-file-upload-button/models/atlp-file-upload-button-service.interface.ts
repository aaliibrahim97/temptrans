export interface IAtlpFileUploadButtonService {
  upload(data: File, isFormData: boolean, additionalPayload?: any);
}
