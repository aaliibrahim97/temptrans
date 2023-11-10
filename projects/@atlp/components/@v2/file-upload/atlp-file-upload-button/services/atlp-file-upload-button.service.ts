import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAtlpFileUploadButtonService } from '../models/atlp-file-upload-button-service.interface';
import { AtlpFileHttpAdapterService } from '../../services/atlp-file-http-adapter.service';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtlpFileUploadButtonService
  implements IAtlpFileUploadButtonService
{
  fileServiceUrls = {
    uploadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/upload`,
    deleteUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document`,
    downloadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/download`,
    viewUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/base64`,
  };

  constructor(
    private httpClient: HttpClient,
    private atlpFileHttpAdapterService: AtlpFileHttpAdapterService,
    private api: AtlpEnvService
  ) {}

  public upload(
    data: File,
    isFormData: boolean = true,
    additionalPayload?: any
  ): Observable<HttpEvent<Object>> {
    // return this.atlpFileHttpAdapterService.uploadFile(
    //   apiURL,
    //   data,
    //   isFormData,
    //   additionalPayload
    // );
    if (isFormData) {
      const form: FormData = new FormData();
      form.append('name', data.name);
      form.append('type', data.type);
      form.append('file', data, data.name);
      if (additionalPayload && additionalPayload?.length > 0) {
        additionalPayload.forEach((x) => {
          form.append(x.key, x.value);
        });
      }
      return this.httpClient.post(`${this.fileServiceUrls.uploadUrl}`, form, {
        reportProgress: true,
        observe: 'events',
      });
    } else {
      return this.httpClient.post(`${this.fileServiceUrls.uploadUrl}`, data, {
        reportProgress: true,
        observe: 'events',
      });
    }
  }

  // const formData: FormData = new FormData();
  // formData.append(fileKey, fileToUpload, fileToUpload.name);
  // return this.httpClient.post<any>(uploadUrl, formData, {
  //   reportProgress: true,
  //   observe: 'events',
  // });
}
