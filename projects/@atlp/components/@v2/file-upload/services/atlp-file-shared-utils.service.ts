import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilePickerComponent, FilePreviewModel } from 'ngx-awesome-uploader';
import { Observable, fromEvent } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AtlpFileDownLoadModel,
  AtlpFilePreviewModel,
} from '../models/atlp-file-shared-models';
import { ToastrService } from 'ngx-toastr';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';

@Injectable({
  providedIn: 'root',
})
export class AtlpFileSharedUtilsService {
  fileSizeUnit: number = 1024;
  // fileServiceUrls = {
  //   uploadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/upload`,
  //   deleteUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document`,
  //   downloadUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/download`,
  //   viewUrl: `${this.api.companyInfoBaseUrl}/CompanyInformation/document/base64`,
  // };

  constructor(
    private http: HttpClient,
    private snakBarService: SnakBarService
  ) {}

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  getBlobFromUrl(docFilePath: string, fileName: string, callBack): void {
    if (docFilePath) {
      this.toDataURL(docFilePath, (dataUrl: string) => {
        if (dataUrl) {
          const b64Data = dataUrl.split(';')[1].split(',')[1];
          const fileType = dataUrl.split(';')[0].split('/')[1];
          const blobData = this.b64toBlob(
            b64Data,
            dataUrl.split(';')[0].split(':')[1]
          );
          const myFile: AtlpFilePreviewModel = {
            fileName: fileName,
            file: blobData,
            fileType: fileType,
          };
          callBack(myFile);
        }
      });
    }
  }

  setUploader(myFiles: FilePreviewModel[], uploader: FilePickerComponent) {
    if (uploader) {
      uploader.setFiles(myFiles);
    }
  }

  setFileUploaderFromFileData(
    fileData: AtlpFilePreviewModel,
    uploader: FilePickerComponent
  ) {
    const docFilePath: string = fileData.docFilePath;
    const fileName: string = fileData.fileName;
    const blobFile: Blob = fileData.file;
    if (blobFile) {
      const fileObj: FilePreviewModel = {
        fileName: fileName,
        file: blobFile,
      };
      const filesToSetInUploder: FilePreviewModel[] = [fileObj];
      this.setUploader(filesToSetInUploder, uploader);
    } else {
      this.getBlobFromUrl(
        docFilePath,
        fileName,
        (fileData: AtlpFilePreviewModel) => {
          const fileObj: FilePreviewModel = {
            fileName: fileName,
            file: fileData.file,
          };
          const filesToSetInUploder: FilePreviewModel[] = [fileObj];
          this.setUploader(filesToSetInUploder, uploader);
        }
      );
    }
  }

  getFileSize(fileSize: number): number {
    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSize = parseFloat((fileSize / this.fileSizeUnit).toFixed(2));
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSize = parseFloat(
          (fileSize / this.fileSizeUnit / this.fileSizeUnit).toFixed(2)
        );
      }
    }

    return fileSize;
  }

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }

    return fileSizeInWords;
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

  public generateBatchId(url): Observable<any> {
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

  public blobURL = (data, type) => {
    let blob = null;
    blob = this.b64toBlob(data, type);
    const blobURL = URL.createObjectURL(blob);
    // Clean up the object URL after the download
    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 1000);
    return blobURL;
  };

  checkFileType(fileType: String, configData: any) {
    let data = '';
    if (configData?.fileType && configData?.fileType?.length > 0) {
      switch (fileType) {
        case 'application/pdf':
          data = configData.fileType.find((x) => x == 'pdf');
          return data ? true : false;
        case 'image/png':
          data = configData.fileType.find((x) => x == 'png');
          return data ? true : false;
        case 'image/jpeg':
          data = configData.fileType.find((x) => x == 'jpeg');
          return data ? true : false;
        case 'image/jpg':
          data = configData.fileType.find((x) => x == 'jpg');
          return data ? true : false;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          data = configData.fileType.find((x) => x == 'excel');
          return data ? true : false;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          data = configData.fileType.find((x) => x == 'word');
          return data ? true : false;
        default:
          return false;
      }
    } else {
      return true;
    }
  }

  downloadDocument(fileItem: AtlpFileDownLoadModel): void {
    if (fileItem.fileDownLoadLink) {
      const tempDownloadLink = document.createElement('a');
      tempDownloadLink.style.display = 'none';
      tempDownloadLink.href = fileItem.fileDownLoadLink;
      tempDownloadLink.download = fileItem.fileName;
      tempDownloadLink.click();
      this.snakBarService.success(
        fileItem.fileName + ' Downloaded Successfully',
        'Download File'
      );
      document.body.removeChild(tempDownloadLink);
    } else if (fileItem.base64Data) {
      let linkSource = fileItem.base64Data;
      if (!fileItem.base64Data.includes(';base64,')) {
        linkSource = `data:${fileItem.fileContentType};base64,${fileItem.base64Data}`;
      }
      const tempDownloadLink = document.createElement('a');
      tempDownloadLink.href = linkSource;
      tempDownloadLink.download = fileItem.fileName;
      tempDownloadLink.click();
      this.snakBarService.success(
        fileItem.fileName + ' Downloaded Successfully',
        'Download File'
      );
      document.body.removeChild(tempDownloadLink);
    } else if (fileItem.file && fileItem.file instanceof Blob) {
      // usage
      // const myBlob = new Blob(['Hello, World!'], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(fileItem.file);
      link.download = fileItem.fileName;
      link.click();
      // Clean up the object URL after the download
      setTimeout(() => {
        window.URL.revokeObjectURL(link.href);
      }, 0);
      this.snakBarService.success(
        fileItem.fileName + ' Downloaded Successfully',
        'Download File'
      );
      document.body.removeChild(link);
    } else if (fileItem.file && fileItem.file instanceof File) {
      let objectURL = URL.createObjectURL(fileItem.file);
      const link = document.createElement('a');
      link.download = fileItem.fileName;
      link.href = objectURL;
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.href);
      }, 0);
      this.snakBarService.success(
        fileItem.fileName + ' Downloaded Successfully',
        'Download File'
      );
      document.body.removeChild(link);
    } else {
      this.snakBarService.success(
        fileItem.fileName + ' Download Failed',
        'Download File'
      );
    }
  }
}
