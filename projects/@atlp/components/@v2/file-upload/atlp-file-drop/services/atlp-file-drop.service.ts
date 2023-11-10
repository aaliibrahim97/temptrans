import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpFileHttpAdapterService } from '../../services/atlp-file-http-adapter.service';
import { Observable } from 'rxjs';
import { IAtlpFileDropService } from '../models/atlp-file-drop-upload.model';

@Injectable({
  providedIn: 'root',
})
export class AtlpFileDropService implements IAtlpFileDropService {
  // fileServiceUrls = {
  //   uploadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/upload`,
  //   deleteUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document`,
  //   downloadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/download`,
  //   viewUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/base64`,
  // };

  constructor(
    private httpClient: HttpClient,
    private atlpFileHttpAdapterService: AtlpFileHttpAdapterService
  ) {}

  public upload(
    url: string,
    data: FileList,
    isFormData: boolean = true,
    additionalPayload?: any
  ): Observable<Object> {
    if (isFormData) {
      // const form: FormData = new FormData();
      // form.append('name', data.name);
      // form.append('type', data.type);
      // form.append('file', data, data.name);
      // if (additionalPayload && additionalPayload?.length > 0) {
      //   additionalPayload.forEach((x) => {
      //     form.append(x.key, x.value);
      //   });
      // }
      // return this.httpClient.post(`${this.fileServiceUrls.uploadUrl}`, form, {
      //   reportProgress: true,
      //   observe: 'events',
      // });
      return this.httpClient.post(url, data);
    } else {
      return this.httpClient.post(url, data);
    }
  }
}
