import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel,
} from 'ngx-awesome-uploader';
import { FileSettings } from 'projects/@atlp/components/file/file-settings-enum';

export class FileAdapter extends FilePickerAdapter {
  constructor(
    private http: HttpClient,
    private urlUpload?: string,
    private urlRemoveFile?: string,
    private docId?: any,
    private type?: string,
    private metaData?: any,
    private additionalPayload?: any
  ) {
    super();
  }

  private _documentId: string;
  public get documentId(): string {
    return this._documentId;
  }
  public set documentId(v: string) {
    this._documentId = v;
  }

  private _docMetaData: string;
  public get docMetaData(): string {
    return this._docMetaData;
  }
  public set docMetaData(v: string) {
    this._docMetaData = v;
  }

  //This is upload adapter
  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    if (!(fileItem.file instanceof Blob)) {
      return of({
        status: null,
        progress: 0,
      });
    }

    const form: FormData = new FormData();
    form.append('name', fileItem.fileName);
    form.append('type', fileItem.file.type);
    form.append('file', fileItem.file, fileItem.fileName);
    form.append('x-meta-data', JSON.stringify(this.metaData));

    if (this.additionalPayload && this.additionalPayload?.length > 0) {
      this.additionalPayload.forEach((x) => {
        form.append(x.key, x.value);
      });
    }

    const api = this.urlUpload;
    const req = new HttpRequest('POST', api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        } else if (res.type === HttpEventType.UploadProgress) {
          /** Compute and show the % done: */
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress,
          };
        } else {
          return {
            status: UploadStatus.ERROR,
            progress: 0,
          };
        }
      }),
      catchError((er) => {
        //console.log(er);
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }
  public removeFile(fileItem: any): Observable<any> {
    const id = this.docId || this.documentId;
    const responseFromBackend = fileItem.uploadResponse;
    const removeApi = this.urlRemoveFile;

    if (fileItem.moduleType === FileSettings.NoRemoveAPI) {
      return of({
        status: fileItem,
        progress: UploadStatus.UPLOADED,
      });
    }
    if (this.type != 'delete') {
      return this.http.post(removeApi, { id });
    } else {
      return this.http.delete(`${removeApi}/${id}`);
    }
  }
}
