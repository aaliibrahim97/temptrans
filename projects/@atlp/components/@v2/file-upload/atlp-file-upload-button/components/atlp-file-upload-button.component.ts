import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { of, Subject, Subscription } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { TranslateService } from '@ngx-translate/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtlpFileUploadButtonResponseModel } from '../models/atlp-file-upload-button.model';
import { IAtlpFileUploadButtonService } from '../models/atlp-file-upload-button-service.interface';
import { AtlpFileUploadButtonService } from '../services/atlp-file-upload-button.service';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AtlpFileDocumentDetails } from '../../models/atlp-file-doc-details.model';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { AtlpFileDownLoadModel } from '../../models/atlp-file-shared-models';
import { AtlpFileSharedUtilsService } from '../../services/atlp-file-shared-utils.service';

@Component({
  selector: 'atlp-file-upload-button',
  templateUrl: './atlp-file-upload-button.component.html',
  styleUrls: ['./atlp-file-upload-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpFileUploadButtonComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AtlpFileUploadButtonComponent),
      multi: true,
    },
  ],
})
export class AtlpFileUploadButtonComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  subscriptions: Subscription[] = [];
  private _unsubscribeAll$ = new Subject<never>();
  @Input() disabled: boolean = false;
  @Input() allowedFileTypes: string[] = ['jpg', 'pdf', 'png', 'doc', 'docx'];
  fileData: string | ArrayBuffer = null;
  document: AtlpFileDocumentDetails = null;
  @Input() isRequired: boolean = false;
  @Input() set documentData(value: AtlpFileDocumentDetails) {
    if (value) {
      this.document = value;
      this.value = value;
      this.writeValue(value);
    }
  }
  @Input() maxFileSize: number = 5;
  @Input() showMaxFileSizevalidationMsg: boolean = false;
  @Input() label: string = 'Upload File';
  @Output() onDocumentUpload: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();
  @ViewChild('uploadControl') uploadControl: ElementRef;
  uploadFilePlaceHolderName = 'Choose File';
  uploadedDocResponse: AtlpFileUploadButtonResponseModel =
    new AtlpFileUploadButtonResponseModel();
  progressPercent: string;
  selectedLanguage: string;
  @Input() uploadString: string = 'Upload';
  @Input() service?: IAtlpFileUploadButtonService;
  @Input() set source(value: IAtlpFileUploadButtonService) {
    if (this.isUploadService(value)) {
      this.service = value as IAtlpFileUploadButtonService;
    }
  }
  @Input() extendedParams: any = null;
  @Input() customUploadTemplate?: TemplateRef<any> = null;
  @Input() isMultipleUploadEnabled: boolean = false;
  //to apply outer style
  @Input() fileWrapperClass: string = '';
  @Input() formControl?: FormControl;

  // this is for ng value accessor don't remove
  onChange: any = () => {};
  onTouched: any = () => {};
  value: AtlpFileDocumentDetails = null;
  inProgress: boolean = false;
  @Output() onDocumentDelete: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();

  constructor(
    private _iconsService: IconsService,
    private uploadService: AtlpFileUploadButtonService,
    private translateService: TranslateService,
    private atlpTranslationService: AtlpTranslationService,
    private ngxService: NgxUiLoaderService,
    private defaultSnakBar: SnakBarService,
    private atlpFileSharedUtilsService: AtlpFileSharedUtilsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.uploadString = this.translateService.instant(this.uploadString);
    this.uploadFilePlaceHolderName = this.label;
    this.subscriptions.push(
      this.atlpTranslationService
        .getCurrentLanguage()
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe((lang) => {
          this.selectedLanguage = lang;
          this.atlpTranslationService.setDefaultLanguageSettings(
            this.selectedLanguage,
            navigationEnglish,
            navigationArabic
          );
        })
    );
  }

  private isUploadService(object: any): object is IAtlpFileUploadButtonService {
    return object && 'upload' in object;
  }

  uploadFileEvt(e: any) {
    this.inProgress = true;
    if (e.target.files && e.target.files[0]) {
      const fileItem = e.target.files[0];
      if (this.bytesToMB(fileItem.size) > this.maxFileSize) {
        this.defaultSnakBar.error(
          this.translateService
            .instant('MAX_SIZE_VALIDATION_MSG')
            .replace('__MAX_FILE_SIZE', this.maxFileSize)
        );
        this.uploadControl.nativeElement.value = '';
        return;
      }
      if (!this.isFileTypeAllowed(fileItem.name.split('.')[1])) {
        this.defaultSnakBar.error(
          this.translateService.instant('INVALID_FILE_TYPE')
        );
        this.uploadControl.nativeElement.value = '';
        return;
      }

      if (this.service) {
        this.fileUploadByService(fileItem);
      } else {
        this.readFileDetails(fileItem);
        //this.uploadFile(fileItem);
      }
      this.uploadControl.nativeElement.value = '';
    }
  }

  fileUploadByService(fileItem: File) {
    // this.ngxService.start();
    this.service
      .upload(fileItem, this.extendedParams)
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(
        (fileResponse) => {
          this.onFileUploadResponse(fileResponse, fileItem, true);
          this._changeDetectorRef.markForCheck();
          this.inProgress = false;
          // this.ngxService.stop();
        },
        (error) => {
          // this.ngxService.stop();
          this.onFileUploadResponse(error, fileItem, false);
          this._changeDetectorRef.markForCheck();
          this.inProgress = false;
          console.log('File upload failed...! => ', error);
        }
      );
  }

  uploadFile(file: File) {
    this.ngxService.start();
    this.inProgress = true;
    this.progressPercent = this.translateService.instant('UploadInProgress');
    this.onTouched();
    this.uploadService
      .upload(file, this.extendedParams)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              setTimeout(() => {
                this.progressPercent =
                  Math.round((event.loaded * 100) / event.total) +
                  this.translateService.instant('Uploaded');
              }, 500);
              console.log('progress: ---> ', this.progressPercent);
              return null;
            case HttpEventType.Response:
              return event;
            default:
              return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // if (error?.error?.Errorlst.length > 0) {
          //   this.defaultSnakBar.error(error?.error?.Errorlst[0]?.Error);
          // } else {
          //   this.defaultSnakBar.error(`Upload failed: ${file.name}`);
          // }
          this.ngxService.stop();
          this.inProgress = false;

          this.onFileUploadResponse(error, file, false);
          return of({ fromProgress: true, error: error });
        })
      )
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(
        (event: any) => {
          if (event && typeof event === 'object') {
            this.ngxService.stop();
            this.inProgress = false;
            if (!event.fromProgress) {
              this.onFileUploadResponse(event.body, file, true);
              //console.log(event.body);
            }
          }
        },
        (error) => {
          this.ngxService.stop();
          this.inProgress = false;
          this.onFileUploadResponse(error, file, false);
          console.log(error);
        }
      );
  }

  private onFileUploadResponse(uploadRes: any, file: File, isSuccess: boolean) {
    let docUploadResponse: AtlpFileUploadButtonResponseModel = {
      documentId: this.uploadedDocResponse.documentId,
      fileData: file,
      uploadResponse: uploadRes,
      isSuccess: isSuccess,
    };
    if (docUploadResponse.isSuccess) {
      this.readFileDetails(file);
    } else {
      this.defaultSnakBar.error('Error while uploading the file');
    }
  }

  readFileDetails(file: File) {
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileData = reader.result;
        let document = new AtlpFileDocumentDetails(
          this.fileData,
          file.name,
          file.type,
          file.size
        );
        this.writeValue(document);
        this.inProgress = false;
        this._changeDetectorRef.detectChanges();
        this.onDocumentUpload.emit(document);
      };
      reader.onerror = (error) => {
        this.inProgress = false;
        this._changeDetectorRef.detectChanges();
        console.log('error while reading the file => ', error);
      };
    }
  }

  downloadFile() {
    this.ngxService.start();
    try {
      const fileDataToDownload: AtlpFileDownLoadModel = {
        fileName: this.value.name,
        fileContentType: this.value.mimeType,
        base64Data: this.value.fileData as string,
      };

      this.atlpFileSharedUtilsService.downloadDocument(fileDataToDownload);
    } catch (error) {
      this.ngxService.stop();
    } finally {
      this.ngxService.stop();
    }
  }

  private bytesToMB(size) {
    return size / (1024 * 1024);
  }

  private isFileTypeAllowed(fileType) {
    return this.allowedFileTypes.includes(fileType);
  }

  writeValue(value: AtlpFileDocumentDetails) {
    this.value = value;
    this.propagateChange(this.value);
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private propagateChange = (_: any) => {};

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate() {
    const isNotValid = AtlpCheckHelper.isNullOrEmpty(this.value);
    return (
      isNotValid &&
      this.isRequired && {
        isFileRequired: true,
      }
    );
  }

  private get icons(): Array<string> {
    return ['attachment', 'upload'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
