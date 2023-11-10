import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { saveAs as fileSaverSave } from 'file-saver';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { CommonFunctionsService } from 'projects/@atlp/services/common-functions.service';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { IAnnouncementModel } from '../user-announcement/user-announcement';
import { UserAnnouncementComponent } from '../user-announcement/user-announcement.component';
import { IFileUploadConfigData } from './file-upload.model';
import { TypeFile } from './type-file.enum';
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'atlp-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUploadService],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('multiFileUpload') multiFileUpload: ElementRef;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('singleFileUpload') singleFileUpload: ElementRef;
  @ViewChild('excelTemplate') excelTemplate: TemplateRef<any>;
  @ViewChild('documentTemplate') documentTemplate: TemplateRef<any>;
  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() batchId?: string = '';
  @Input() isRequired?: boolean = false;
  @Input() configData?: IFileUploadConfigData;
  @Input() additionalPayload?: any = [];
  @Input() uploadedFiles: Array<any> = [];
  @Output() fileUpdated = new EventEmitter<any>();
  @Output() batchEmitter = new EventEmitter<any>();
  content: SafeResourceUrl | {};
  public tableData: any;
  public tableTitle: any;
  sheets: any = [];
  wb: XLSX.WorkBook;

  constructor(
    private _iconsService: IconsService,
    @Self() private fileUploadService: FileUploadService,
    public dialog: MatDialog,
    private commonFunctionsService: CommonFunctionsService,
    public translate: TranslateService,
    private envService: AtlpEnvService,
    private sanitizer: DomSanitizer
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

  generateBatch(fileData: File[]) {
    this.fileUploadService.generateBatchId().subscribe((res) => {
      if (res) {
        this.batchId = res.data;
        this.batchEmitter.emit(this.batchId);
        this.onFileChange(fileData);
      }
    });
  }

  onFileChange(data: File[]) {
    if (!this.disabled) {
      if (
        !this.uploadedFiles ||
        (this.uploadedFiles &&
          this.uploadedFiles.length < this.configData.maxFileCount)
      ) {
        if (
          !this.batchId &&
          this.configData?.isAPISetup &&
          this.configData?.isBatchIdSetup
        ) {
          this.generateBatch(data);
        } else {
          let files = data;
          if (this.configData.uploadType == 'single') {
            if (files && files.length == 1) {
              this.fileValidation(files);
              this.singleFileUpload.nativeElement.value = '';
            } else {
              this.commonFunctionsService.showToaster(
                'error',
                'Upload_Single_File'
              );
            }
          } else {
            this.fileValidation(files);
          }
        }
      } else {
        this.commonFunctionsService.showToaster(
          'error',
          'Maximum_Allowed_File',
          this.configData.maxFileCount
        );
      }
    }
  }

  fileValidation(files: any) {
    let addedFiles = Object.keys(files).map((key) => files[key]);
    let newFiles = addedFiles.filter(
      (obj1) => !this.uploadedFiles.some((obj2) => obj1.name === obj2.name)
    );
    let alreadyEistingFiles = addedFiles.filter((obj1) =>
      this.uploadedFiles.some((obj2) => obj1.name === obj2.name)
    );
    if (this.uploadedFiles?.length < this.configData.maxFileCount) {
      if (alreadyEistingFiles && alreadyEistingFiles.length > 0) {
        this.commonFunctionsService.showToaster('error', 'File_Already_Exist');
      } else {
        if (this.uploadedFiles?.length == 0) {
          this.processFiles(files);
        } else if (
          newFiles &&
          this.uploadedFiles &&
          this.uploadedFiles.length > 0
        ) {
          this.processFiles(newFiles);
        } else {
          this.commonFunctionsService.showToaster(
            'success',
            'Maximum_File_Count_Reached'
          );
        }
      }
    } else {
      this.commonFunctionsService.showToaster(
        'error',
        'Maximum_Allowed_File',
        this.configData.maxFileCount
      );
    }
  }

  processFiles(files) {
    for (const file of files) {
      if (this.fileUploadService.checkFileType(file?.type, this.configData)) {
        if (file?.size / 1024 / 1024 <= this.configData?.maxFileSize) {
          if (this.configData.formData && this.configData?.isAPISetup) {
            this.fileUploadService
              .uploadFile(
                this.configData?.uploadUrl,
                file,
                this.configData.formData,
                this.additionalPayload
              )
              .subscribe(
                (res: any) => {
                  this.uploadedFiles.push(res.data);
                  this.fileUpdated.emit(this.uploadedFiles);
                },
                (error: any) => {
                  this.commonFunctionsService.showToaster(
                    'error',
                    'Error_Uploading_File'
                  );
                }
              );
          } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event: any) => {
              if (this.configData?.isAPISetup) {
                const fileObj: any = {
                  fileName: file.name,
                  mimeType: file.type,
                  metaData: event.target.result,
                };
                if (this.configData?.isBatchIdSetup) {
                  fileObj.batchId = this.batchId;
                }
                this.fileUploadService
                  .uploadFile(
                    this.configData?.uploadUrl,
                    fileObj,
                    this.configData.formData,
                    this.additionalPayload
                  )
                  .subscribe(
                    (res: any) => {
                      this.uploadedFiles.push(res);
                      this.fileUpdated.emit(this.uploadedFiles);
                    },
                    (error: any) => {
                      this.commonFunctionsService.showToaster(
                        'error',
                        'Error_Uploading_File'
                      );
                    }
                  );
              } else {
                const fileObj = {
                  name: file.name,
                  mimeType: file.type,
                  metaData: event.target.result,
                };
                this.uploadedFiles.push(fileObj);
                this.fileUpdated.emit(this.uploadedFiles);
              }
            };
          }
        } else {
          this.commonFunctionsService.showToaster('error', 'File_Size_Exceed');
        }
      } else {
        this.commonFunctionsService.showToaster('error', 'Invalid_File_Type');
      }
    }
  }

  showDropBox(): boolean {
    return this.uploadedFiles && this.uploadedFiles.length > 0 ? false : true;
  }

  viewFile(fileItem: any) {
    if (this.configData?.isAPISetup) {
      this.fileUploadService
        .getFile(`${this.configData.viewUrl}/${fileItem.referenceId}`)
        .subscribe((res: any) => {
          if (res && res?.data) {
            this.processView(fileItem, res?.data);
          }
        });
    } else {
      if (fileItem?.links?.download) {
        this.fileUploadService
          .downloadFile(fileItem?.links?.download)
          .subscribe((res) => {
            this.fileUploadService.toBase64(res).subscribe((blob) => {
              let data = blob;
              const displayData: IAnnouncementModel = {
                title: fileItem?.name,
                message: data,
                showConfirmButton: true,
                confirmButtonText: 'Download',
                showRejectButton: true,
                rejectButtonText: 'Close',
                isDocViewer: true,
                fileType: 'application/pdf',
              };
              this.openViewPopup(displayData, fileItem);
            });
          });
      }
    }
  }

  processView(fileItem, fileData: any) {
    let displayData: IAnnouncementModel = <IAnnouncementModel>{};
    switch (fileItem?.mimeType) {
      case TypeFile.EXCEL:
        this.processExcelView(fileItem, fileData);
        break;
      default:
        this.content =
          fileItem.mimeType == TypeFile.PDF ||
          fileItem.mimeType == TypeFile.WORD
            ? this.sanitizer.bypassSecurityTrustResourceUrl(
                this.fileUploadService.blobURL(fileData, fileItem.mimeType)
              )
            : this.sanitizer.bypassSecurityTrustResourceUrl(
                `data:${fileItem.mimeType};base64,${fileData}`
              );
        break;
    }
    displayData = {
      title: fileItem?.name,
      message: this.getTemplate(fileItem.mimeType),
      showConfirmButton: true,
      confirmButtonText: 'Download',
      showRejectButton: true,
      rejectButtonText: 'Close',
      isDocViewer: true,
      fileType: fileItem.mimeType,
      isExcelFile: true,
    };
    this.openViewPopup(displayData, fileItem);
  }

  getTemplate(fileType: string) {
    switch (fileType) {
      case TypeFile.EXCEL:
        return this.excelTemplate;
      case TypeFile.PDF:
      case TypeFile.WORD:
        return this.documentTemplate;
      default:
        return this.imageTemplate;
    }
  }

  openViewPopup(displayData: IAnnouncementModel, fileItem: any) {
    const dialogRef = this.dialog.open(UserAnnouncementComponent, {
      data: displayData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result == 'accept') {
        this.downloadFile(fileItem);
      }
    });
  }

  downloadFile(fileItem: any) {
    if (this.configData?.isAPISetup) {
      this.fileUploadService
        .downloadFile(
          `${this.configData?.downloadUrl}/${fileItem?.referenceId}`
        )
        .subscribe((res) => {
          var blob = new Blob([res]);
          fileSaverSave(blob, fileItem?.name);
        });
    } else {
      this.fileUploadService
        .downloadFile(`${fileItem?.links?.download}`)
        .subscribe((res) => {
          var blob = new Blob([res]);
          fileSaverSave(blob, fileItem?.name);
        });
    }
  }

  downloadAll() {
    this.fileUploadService
      .downloadFile(
        `${this.envService.companyInfoBaseUrl}/CompanyInformation/batch/${this.batchId}/download`
      )
      .subscribe((res) => {
        var blob = new Blob([res], { type: 'application/zip' });
        fileSaverSave(blob, this.translate.instant(this.label));
      });
  }

  deleteFile(fileItem: any) {
    if (this.configData?.isAPISetup) {
      this.fileUploadService
        .deleteFile(`${this.configData?.deleteUrl}/${fileItem?.referenceId}`)
        .subscribe((res) => {
          if (res) {
            this.uploadedFiles = this.uploadedFiles.filter((x) => {
              return x.referenceId != fileItem.referenceId;
            });
            this.fileUpdated.emit(this.uploadedFiles);
            this.commonFunctionsService.showToaster(
              'success',
              'File_Deleted_Successfully'
            );
          }
        });
    } else {
      this.uploadedFiles = this.uploadedFiles.filter((x) => {
        return x.name != fileItem.name;
      });
      this.fileUpdated.emit(this.uploadedFiles);
      this.commonFunctionsService.showToaster(
        'success',
        'File_Deleted_Successfully'
      );
    }
  }

  public processExcelView(fileItem, fileData: any) {
    const binarystr: string = atob(fileData);
    this.wb = XLSX.read(binarystr, { type: 'binary' });
    /* selected the first sheet */
    const sheets = this.wb.SheetNames;
    let ws: XLSX.WorkSheet;
    let wsname: string;
    if (sheets && sheets.length > 0) {
      this.sheets = sheets;
      wsname = this.wb.SheetNames[0];
      ws = this.wb.Sheets[wsname];
    } else {
      wsname = this.wb.SheetNames[0];
      ws = this.wb.Sheets[wsname];
    }

    /* save data */
    const data = XLSX.utils.sheet_to_json(ws);
    this.tableData = data;
    this.tableTitle = Object.keys(this.tableData[0]);
  }

  onSheetChange(index: number) {
    let ws: XLSX.WorkSheet;
    let wsname: string;
    wsname = this.wb.SheetNames[index];
    ws = this.wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws);
    this.tableData = data;
    if (this.tableData && this.tableData.length > 0) {
      this.tableTitle = Object.keys(this.tableData[0]);
    } else {
      this.tableTitle = [];
    }
  }

  getFileIcon(fileType: String) {
    switch (fileType) {
      case TypeFile.PNG:
        return 'icon-png-dark';
      case TypeFile.PDF:
        return 'icon-pdf-dark';
      case TypeFile.JPG:
        return 'icon-jpg-dark';
      case TypeFile.EXCEL:
        return 'icon-xls-dark';
      case TypeFile.WORD:
        return 'icon-doc-dark';
      default:
        return 'icon-unknown';
    }
  }

  private get icons(): Array<string> {
    return [
      'pdf-icon',
      'icon-delete-purple',
      'folder',
      'icon-view-purple',
      'icon-download-purple',
      'folder',
      'download',
      'icon-png-dark',
      'icon-jpg-dark',
      'icon-doc-dark',
      'icon-pdf-dark',
      'icon-xls-dark',
      'icon-unknown',
    ];
  }
}
