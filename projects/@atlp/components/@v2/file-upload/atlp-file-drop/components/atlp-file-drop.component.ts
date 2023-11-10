import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { AtlpSlideBarDialogConfig } from 'projects/@atlp/components/atlp-slidebar-dialog/atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpDialogRef } from 'projects/@atlp/components/atlp-slidebar-dialog/injectors/atlp-dialog-ref';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';
import { DOCUMENT } from '@angular/common';
import { ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AtlpFileDocumentDetails } from '../../models/atlp-file-doc-details.model';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { IAtlpFileDropService } from '../models/atlp-file-drop-upload.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpFileDownLoadModel } from '../../models/atlp-file-shared-models';
import { AtlpFileSharedUtilsService } from '../../services/atlp-file-shared-utils.service';
import { AtlpFileServiceUrls } from '../models/file-service-urls.model';

@Component({
  selector: 'atlp-file-drop',
  templateUrl: './atlp-file-drop.component.html',
  styleUrls: ['./atlp-file-drop.component.scss'],
  providers: [
    AtlpSlideBarDialogConfig,
    AtlpDialogRef,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpFileDropComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AtlpFileDropComponent),
      multi: true,
    },
  ],
})
export class AtlpFileDropComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  subscriptions: Subscription[] = [];
  private _unsubscribeAll$ = new Subject<never>();
  @ViewChild('myFile')
  fileElementRef: ElementRef;
  SidebarName = SidebarName;
  documentsList: AtlpFileDocumentDetails[] = [];
  showFileSizeMsg = false;
  showFileTypeMsg = false;
  showFileExistMsg = false;
  showFileMaximumMsg = false;
  showFileSizeMaximumMsg = false;
  selectedLanguage: string;
  @Input() fileTypes?: Array<string> = ['jpg', 'pdf', 'png', 'doc', 'docx'];
  // fileData: string | ArrayBuffer = null;
  @Input() isRequired: boolean = false;
  @Input() formControl?: FormControl;
  service: IAtlpFileDropService;
  extendedParams: any;
  @Input() set source(value: IAtlpFileDropService) {
    if (this.isUploadService(value)) {
      this.service = value as IAtlpFileDropService;
    }
  }
  @Input() fileServiceUrls: AtlpFileServiceUrls = {};
  @Input() set documentData(value: AtlpFileDocumentDetails[]) {
    if (value) {
      this.value = value;
      this.writeValue(value);
    }
  }

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  value: AtlpFileDocumentDetails[] = [];
  @Output() onDocumentUpload: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();
  @Output() onDocumentDelete: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private config: AtlpSlideBarDialogConfig,
    public atplSidebarService: AtlpSidebarService,
    private iconsService: IconsService,
    private atlpTranslationService: AtlpTranslationService,
    private translateService: TranslateService,
    private ngxService: NgxUiLoaderService,
    private atlpFileSharedUtilsService: AtlpFileSharedUtilsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.iconsService.registerIcons(this.icons);
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
      });
  }

  ngOnInit(): void {
    const dropArea = this.document.querySelector('.upload-wrap');
    const dragText = this.document.getElementById('dragText');

    dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropArea.classList.add('active');
      dragText.textContent = this.translateService.instant(
        'RELEASE_TO_ADD_FILE'
      );
    });

    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('active');
      dragText.textContent = this.translateService.instant(
        'DROP_YOUR_FILE_HERE'
      );
    });

    dropArea.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      dropArea.classList.remove('active');
      dragText.textContent = this.translateService.instant(
        'DROP_YOUR_FILE_HERE'
      );
      let files: FileList;
      files = event.dataTransfer.files;
      this.selectFile(files);
    });
  }

  private isUploadService(object: any): object is IAtlpFileDropService {
    return object && 'upload' in object;
  }

  deleteFileInput(fileItem: AtlpFileDocumentDetails) {
    let fileName = fileItem.name;
    this.documentsList = this.documentsList.filter(function (value) {
      return value.name != fileName;
    });
    this.fileElementRef.nativeElement.value = '';
    this.writeValue(this.documentsList);
    if (this.documentsList.length === 0) {
      if (this.formControl) {
        this.formControl.reset();
        if (this.isRequired) {
          this.formControl.markAsDirty();
        }
      }
      this.formControl.markAsPristine();
    }
    this.onDocumentDelete.emit(fileItem);
  }

  checkIfFileNotAllowed(files: FileList) {
    let fileNotAllowed = false;
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].type != 'image/png' &&
        files[i].type != 'application/pdf' &&
        files[i].type != 'application/msword' &&
        files[i].type != 'image/jpeg' &&
        files[i].type !=
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        fileNotAllowed = true;
        break;
      }
    }
    return fileNotAllowed;
  }

  getAllFilesSize(files: FileList) {
    let fileSize = 0;
    for (let i = 0; i < files.length; i++) {
      fileSize += files[i].size;
    }
    for (let i = 0; i < this.documentsList.length; i++) {
      fileSize += this.documentsList[i].size;
    }
    return fileSize;
  }

  checkIfAllFilesSizeLimitExceeds(files: FileList) {
    let sizeExceeded = false;
    let fileSize = 0;
    for (let i = 0; i < files.length; i++) {
      fileSize += files[i].size;
    }
    for (let i = 0; i < this.documentsList.length; i++) {
      fileSize += this.documentsList[i].size;
    }

    if (fileSize > 15728640) {
      sizeExceeded = true;
    }
    return sizeExceeded;
  }

  checkIfAnyFilesSizeLimitExceeds(files: FileList) {
    let sizeExceeded = false;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 5242880) {
        sizeExceeded = true;
        break;
      }
    }
    return sizeExceeded;
  }

  getFileName(fileName: string) {
    if (fileName.length > 25) {
      fileName = fileName.substring(0, 25);
      fileName += '...';
    }
    return fileName;
  }

  checkIfFileExists(files: FileList) {
    var exists = false;
    for (let i = 0; i < files.length; i++) {
      for (let j = 0; j < this.documentsList.length; j++) {
        if (files[i].name == this.documentsList[j].name) {
          exists = true;
        }
      }
    }
    return exists;
  }

  resetFile() {
    this.documentsList = [];
    this.fileElementRef.nativeElement.value = '';
    this.showFileSizeMsg = false;
    this.showFileTypeMsg = false;
    this.showFileExistMsg = false;
    this.formControl.markAsPristine();
  }

  selectFile(files: FileList) {
    this.onTouched();
    this.showFileSizeMsg = false;
    this.showFileTypeMsg = false;
    this.showFileExistMsg = false;
    this.showFileMaximumMsg = false;
    this.showFileSizeMaximumMsg = false;

    if (this.checkIfFileNotAllowed(files)) {
      this.showFileTypeMsg = true;
    } else if (files.length + this.documentsList.length > 5) {
      this.showFileMaximumMsg = true;
    } else if (this.checkIfAllFilesSizeLimitExceeds(files)) {
      this.showFileSizeMaximumMsg = true;
    } else if (this.checkIfAnyFilesSizeLimitExceeds(files)) {
      this.showFileSizeMsg = true;
    } else if (this.checkIfFileExists(files) == true) {
      this.showFileExistMsg = true;
    } else if (this.service) {
    } else {
      this.readFileDetails(files);
      // for (let i = 0; i < files.length; i++) {
      //   let file = files[i];
      //   let reader = new FileReader();
      //   if (file) {
      //     reader.readAsDataURL(file);
      //     reader.onload = () => {
      //       this.fileData = reader.result;
      //       let document = new AtlpFileDocumentDetails(
      //         this.fileData,
      //         file.name,
      //         file.type,
      //         file.size
      //       );
      //       this.documentsList.push(document);
      //       this.formControl.markAsDirty();
      //       this.setAttachmentFormValue();
      //     };
      //     reader.onerror = function () {};
      //   }
      // }
    }
  }

  uploadFile(files: FileList) {
    this.onTouched();
    this.ngxService.start();
    this.service
      .upload(this.fileServiceUrls.uploadUrl, files, true, this.extendedParams)
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(
        (data: any) => {
          this.ngxService.stop();
          this.readFileDetails(files);
        },
        (error) => {
          this.ngxService.stop();
          console.log(error);
        }
      );
  }

  readFileDetails(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          let fileData = reader.result;
          let document = new AtlpFileDocumentDetails(
            fileData,
            file.name,
            file.type,
            file.size,
            null
          );
          this.documentsList.push(document);
          this.formControl.markAsDirty();
          this.setAttachmentFormValue();
          this._changeDetectorRef.detectChanges();
          this.onDocumentUpload.emit(document);
        };
        reader.onerror = function (error) {
          console.log('error while reading the file => ', error);
        };
      }
    }
  }

  setAttachmentFormValue() {
    this.writeValue(this.documentsList);
  }

  writeValue(value: AtlpFileDocumentDetails[]): void {
    this.value = value;
    this.propagateChange(this.value);
    this.onChange(this.value);
  }

  private propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

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

  downloadFile(fileItem: AtlpFileDocumentDetails) {
    this.ngxService.start();
    try {
      const fileDataToDownload: AtlpFileDownLoadModel = {
        fileName: fileItem.name,
        fileContentType: fileItem.mimeType,
        base64Data: fileItem.metaData as string,
      };

      this.atlpFileSharedUtilsService.downloadDocument(fileDataToDownload);
    } catch (error) {
      this.ngxService.stop();
    } finally {
      this.ngxService.stop();
    }
  }

  private get icons(): Array<string> {
    return [
      'file',
      'folder-purple',
      'png-icon',
      'jpg-icon',
      'png-icon',
      'pdf-file-icon',
      'view-files',
      'delete-button',
      'delete-grey',
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
