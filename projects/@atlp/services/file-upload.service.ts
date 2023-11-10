import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { Observable, fromEvent } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from './api-base.service';
import { AtlpFileSharedUtilsService } from '../components/@v2/file-upload/services/atlp-file-shared-utils.service';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService extends ApiBaseService {
  userImage: SafeResourceUrl;

  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private translate: AtlpTranslationService,
    private sanitizer: DomSanitizer,
    private atlpFileSharedUtilsService: AtlpFileSharedUtilsService
  ) {
    super(`Document`, api, http, translate);
  }

  fileSizeUnit: number = 1024;
  public isApiSetup = false;

  getFileSize(fileSize: number): number {
    return this.atlpFileSharedUtilsService.getFileSize(fileSize);
  }

  getFileSizeUnit(fileSize: number) {
    return this.atlpFileSharedUtilsService.getFileSizeUnit(fileSize);
  }

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

  public generateBatchId(): Observable<any> {
    return this.http.get(
      `${this.api.companyInfoBaseUrl}/CompanyInformation/batch/generate`
    );
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

  public blobURL = (data, type) => {
    return this.atlpFileSharedUtilsService.blobURL(data, type);
  };

  private b64toBlob = (content, contentType) => {
    return this.atlpFileSharedUtilsService.b64toBlob(content, contentType);
  };

  checkFileType(fileType: String, configData: any) {
    return this.atlpFileSharedUtilsService.checkFileType(fileType, configData);
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve('');
      } else {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result);
          };
        } catch (e) {
          resolve('');
        }
      }
    });
  }
}
