import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { IAtlpFileUploadButtonService } from '../atlp-file-upload-button/models/atlp-file-upload-button-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AtlpFileHttpAdapterService {
  // fileServiceUrls = {
  //   uploadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/upload`,
  //   deleteUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document`,
  //   downloadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/download`,
  //   viewUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/base64`,
  // };

  constructor(private http: HttpClient) {}

  uploadMedia(apiURL: string, formData: any) {
    return this.http
      .post(`${apiURL}`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  getFile(apiURL: string) {
    return this.http.get(`${apiURL}`);
  }

  downloadFile(apiURL: string) {
    return this.http.get(`${apiURL}`, {
      responseType: 'blob',
    });
  }

  downloadAll(apiURL: string) {
    return this.http.get(`${apiURL}`, {
      responseType: 'blob',
    });
  }

  uploadFile(
    apiURL: string,
    data: any,
    isFormData?: boolean,
    additionalPayload?: any
  ) {
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
      return this.http.post(`${apiURL}`, form);
    } else {
      return this.http.post(`${apiURL}`, data);
    }
  }

  deleteFile(apiURL: string) {
    return this.http.delete(`${apiURL}`);
  }

  toBase64(blob: Blob): Observable<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return fromEvent(reader, 'load').pipe(map(() => reader.result as string));
  }

  public generateBatchId(url: string): Observable<any> {
    return this.http.get(url);
  }

  getDocument(url) {
    if (url) {
      return this.http.get(url, { responseType: 'blob' }).pipe(
        map((response: any) => {
          return new Blob([response]);
        }),
        catchError((e) => {
          return null;
        })
      );
    } else {
      return null;
    }
  }

  deleteDocument(url) {
    if (url) {
      return this.http.delete(url).pipe(
        map((response: any) => {
          return response;
        }),
        catchError((e) => {
          return null;
        })
      );
    } else {
      return null;
    }
  }
}
