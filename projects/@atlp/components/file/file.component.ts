import { FileAdapter } from './../../core/adapters/file.adapter';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DemoFilePickerAdapter } from 'projects/@atlp/core/adapters/demo-file-picker.adapter';
import { TypeFile } from 'projects/@atlp/core/enums/type-file.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import {
  FilePickerComponent,
  FilePreviewModel,
  UploaderCaptions,
  ValidationError,
} from 'ngx-awesome-uploader';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() editFiles: FilePreviewModel[] = [];
  @Input() fileSizeMax: number = 5;
  @Input() typeFiles: Array<string>;
  @Input() onceFile?: boolean = false;
  @Input() metaData?: any;
  @Input() additionalPayload?: any = [];
  @Input() urlUploadFile?: string;
  @Input() urlRemoveFile?: string;
  @Input() type: string; // method verb name
  @Input() docId?: string;
  @Input() fileMaxCount? = 10;
  @Input() isEditable?: boolean = true;
  @Input() isDownloadable?: boolean = true;
  @Output() loadedRemovedFiles = new EventEmitter<any[]>();
  @Output() loadedFiles = new EventEmitter<FilePreviewModel[]>();
  @Output() selectedFile = new EventEmitter<FilePreviewModel>();
  @Output() validationErrors = new EventEmitter<any>();
  @Output() uploadFail = new EventEmitter<any>();
  @Output() download = new EventEmitter<any>();
  @Output() editFilesChanges: EventEmitter<FilePreviewModel[]> =
    new EventEmitter();
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  @ViewChild('drop', { static: true })
  dropButton: ElementRef<HTMLButtonElement>;
  adapter: FileAdapter;
  myFiles: FilePreviewModel[] = [];
  uploadType: 'multi' | 'single';
  TypeFile = TypeFile;
  showDrop: boolean = true;
  public fileMetaData: any;
  loggedInUserName: string;

  constructor(
    private _iconsService: IconsService,
    private _http: HttpClient,
    private _userInfoService: UserInfoService,
    public translate: TranslateService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    const userInfo = this._userInfoService?.userInfoDetails;
    this.loggedInUserName = userInfo?.data?.firstName['en-US'];
    if (this.docId) {
      this.showDrop = false;
    }

    this.uploadType = this.onceFile ? 'single' : 'multi';
    if (!this.fileMetaData) {
      this.fileMetaData = this.metaData;
    }
    this.adapter = new FileAdapter(
      this._http,
      this.urlUploadFile,
      this.urlRemoveFile,
      this.docId,
      this.type,
      this.fileMetaData,
      this.additionalPayload
    );
  }

  ngOnChanges() {
    let files: any = [];
    if (this.editFiles && this.editFiles.length > 0) {
      this.showDrop = false;
      this.editFiles as FilePreviewModel[];
      this.editFiles.forEach((x) => {
        let obj = {
          fileName: x.fileName,
          uploadResponse: x.file,
          file: x.file,
          data: x,
        };
        files.push(obj);
      });
      this.myFiles = files;
      this.uploader.setFiles(files);
    } else if (
      !this.editFiles &&
      this.uploader &&
      this.uploader?.files?.length > 0
    ) {
      this.uploader?.files?.forEach((item) => {
        this.uploader.removeFile(item);
      });
    } else {
      this.showDrop = true;
    }
  }

  public onValidationError(error: ValidationError): void {
    this.validationErrors.emit(error);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    let files: FilePreviewModel[] = [];
    if (e.uploadResponse.Data && e.uploadResponse.Data.ReferenceId) {
      this.docId = e.uploadResponse.Data.ReferenceId;
      this.adapter.documentId = e.uploadResponse.Data.ReferenceId;
      if (this.metaData && !e.uploadResponse) {
        e.uploadResponse = { ...e.uploadResponse, metaData: this.metaData };
      }
      files.push(e);
      this.emitFileOnSuccess(e);
    }

    if (e.uploadResponse.data && e.uploadResponse.data.referenceId) {
      this.docId = e.uploadResponse.data.referenceId;
      this.adapter.documentId = e.uploadResponse.data.referenceId;
      files.push(e);
      this.emitFileOnSuccess(e);
    }
    this.showDrop = false;
  }

  public onRemoveSuccess(e: FilePreviewModel): void {
    let index = this.myFiles.findIndex((item) => item.file == e.file);
    if (index !== -1) this.myFiles.splice(index, 1);
    this.showDrop = false;
    if (this.myFiles.length === 0) this.showDrop = true;
    //this.emitFiles(e);
    //let files: FilePreviewModel[] = [];
    this.uploader.removeFile(e);
    //this.showDrop = true;
    //files.push(e);
    this.emitOnRemoveSuccess(e);
  }

  public onUploadFail(error: any) {
    if (error && error?.error) {
      this.uploader.setFiles([]);
      this.uploadFail.emit(error);
      this.showDrop = true;
    }
  }

  downloadFile(file) {
    this.download.emit(file);
  }
  removeFile(fileItem) {
    let index = this.myFiles.findIndex((item) => item.file == fileItem.file);
    if (index !== -1) this.myFiles.splice(index, 1);
    this.showDrop = false;
    if (this.myFiles.length === 0) this.showDrop = true;
    this.uploader.setFiles(this.myFiles);
    this.emitOnRemoveSuccess(fileItem);
    //this.uploader.removeFile(fileItem);
    //this.showDrop = true;
  }

  public onFileRemoved(file: FilePreviewModel): void {
    let index = this.myFiles.findIndex((item) => item.file == file.file);
    if (index !== -1) this.myFiles.splice(index, 1);
    this.showDrop = false;
    if (this.myFiles.length === 0) this.showDrop = true;

    this.uploader.setFiles(this.myFiles);
    //this.emitFiles(this.myFiles);
  }

  public onFileAdded(file: FilePreviewModel): void {
    this.myFiles.push(file);
    this.showDrop = false;
    this;
    this.emitFile(file);
    this.myFiles.forEach((element: any) => {
      const type = element.file.type || element.file.mimeType;
      switch (type) {
        case TypeFile.PNG:
          this._iconsService.registerIcons(['png-icon']);
          break;
        case TypeFile.PDF:
          this._iconsService.registerIcons(['pdf-icon']);
          break;
        default:
          break;
      }
    });
  }

  btnClick(): void {
    const el: HTMLElement = this.dropButton.nativeElement;
    el.click();
  }

  private emitFiles(files: FilePreviewModel[]): void {
    this.loadedFiles.emit(files);
  }
  private emitFilesOnSuccess(files: FilePreviewModel[]): void {
    this.loadedFiles.emit(files);
  }
  private emitFile(files: FilePreviewModel): void {
    this.selectedFile.emit(files);
  }
  private emitFileOnSuccess(files: FilePreviewModel): void {
    this.selectedFile.emit(files);
  }

  private emitOnRemoveSuccess(files: any): void {
    let emittingData = [];
    emittingData.push(files);
    this.loadedRemovedFiles.emit(emittingData);
  }

  private get icons(): Array<string> {
    return [
      'pdf-icon',
      'file-remove',
      'folder',
      'download',
      'icon-png-dark',
      'icon-jpg-dark',
    ];
  }
}
