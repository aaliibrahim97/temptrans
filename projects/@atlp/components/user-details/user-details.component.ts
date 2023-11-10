import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import {
  AccountVerificationStatus,
  documentType,
} from 'projects/@atlp/core/enums/user-state.enum';
import { processErrors } from 'projects/@atlp/core/helpers/process-errors.helper';
import { ISettingsAvatar } from 'projects/@atlp/lib/atlp-layout/components/header/avatars/interfaces/ISettingsAvatar';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import {
  IProfilePicData,
  UserInfoService,
} from 'projects/@atlp/services/user-info.service';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  @Input() isdefaultScreen: boolean;
  @Input() completeDetails: any;
  @ViewChild('file') file: ElementRef;
  @Output() onUploadImageEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onVerifyUserFlyoutEvent: EventEmitter<any> =
    new EventEmitter<any>();

  private unsubscribe$: Subject<any> = new Subject<any>();

  Sidebar = SidebarName;
  settingsAvatar: ISettingsAvatar = {
    round: true,
    size: 'large',
  };
  form: FormGroup;
  referenceID: any;
  logoFile: any;
  ContactID: any;
  filePathDefault = '';
  filePath: any = '';
  deleteLink: any = '';
  documentType: any = '';
  imgUrl: any;
  currentVerificationStatus: string;
  userInfoDetails: any;
  userName: string = '';
  selectedLanguage: string;
  constructor(
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    private _iconsService: IconsService,
    private changeDetector: ChangeDetectorRef,
    public fileUploadservice: FileUploadService,
    public envservice: AtlpEnvService,
    private _formBuilder: FormBuilder,
    private defaultSnakBar: SnakBarService,
    private translate: TranslateService,
    public userInfoService: UserInfoService,
    public atlpTranslationService: AtlpTranslationService,
    private ngxService: NgxUiLoaderService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      if (lang == 'en') {
        this.selectedLanguage = 'en-US';
      } else {
        this.selectedLanguage = 'ar-AE';
      }
    });
  }

  ngOnInit(): void {
    this.userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
    this.ContactID = this.userInfoDetails?.id;
    const firstName = this.userInfoDetails?.firstName[this.selectedLanguage];
    const lastName = this.userInfoDetails?.lastName[this.selectedLanguage];
    this.userName = `${firstName} ${lastName}`;
    this.currentVerificationStatus =
      AccountVerificationStatus[
        this.userInfoDetails?.accountVerificationStatus?.email
      ];
    this.documentType = documentType.PROFILE;

    this.form = this._formBuilder.group({
      logo: [null],
      size: 0,
    });
    this.userInfoService.profilePicUpdated
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res == 'updated') {
          this.getImageByContact();
        }
      });
    this.getImageByContact();
  }

  processverificationStatus() {
    if (
      this.userInfoDetails?.accountVerificationStatus?.email == 3 &&
      this.userInfoDetails?.accountVerificationStatus?.mobile == 3
    ) {
      return 3;
    } else if (
      this.userInfoDetails?.accountVerificationStatus?.email == 3 ||
      this.userInfoDetails?.accountVerificationStatus?.mobile == 3
    ) {
      return 2;
    } else if (
      this.userInfoDetails?.accountVerificationStatus?.email == 1 ||
      this.userInfoDetails?.accountVerificationStatus?.mobile == 1
    ) {
      return 2;
    } else if (
      this.userInfoDetails?.accountVerificationStatus?.email == 2 &&
      this.userInfoDetails?.accountVerificationStatus?.mobile == 2
    ) {
      return 2;
    } else if (
      this.userInfoDetails?.accountVerificationStatus?.email == 1 &&
      this.userInfoDetails?.accountVerificationStatus?.mobile == 1
    ) {
      return 1;
    } else {
      return 3;
    }
  }

  getCompanyName() {
    if (
      this.userInfoDetails?.organizations &&
      this.userInfoDetails?.organizations?.length > 0
    ) {
      let selectedCompany = this.userInfoDetails?.organizations.filter(
        (company) =>
          company.id == localStorage.getItem('selectedCompanyID') &&
          company.contactType !== 'Individual'
      );
      if (selectedCompany && selectedCompany?.length > 0) {
        return selectedCompany[0].tradeName[this.selectedLanguage];
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  ngAfterViewInit() {
    if (!this.envservice.isHideMobileVerification) {
      this.openVerifyMobileAccontSlider(
        this.userInfoDetails?.accountVerificationStatus?.mobile
      );
    }
  }

  validateFileSize(file, maxSize) {
    const size = file?.size;
    if (size / 1024 / 1024 >= maxSize) {
      return true;
    } else {
      return null;
    }
  }

  public get AccountVerificationStatus(): typeof AccountVerificationStatus {
    return AccountVerificationStatus;
  }

  openVerifyAccontSlider(accountVerificationStatus: number) {
    if (accountVerificationStatus == AccountVerificationStatus.NotVerified) {
      this.toggleSidebarOpen(this.Sidebar.verifyUser);
    }
  }

  openVerifyMobileAccontSlider(accountVerificationStatus: number) {
    if (accountVerificationStatus == AccountVerificationStatus.NotVerified) {
      this.toggleSidebarOpen(this.Sidebar.verifyUserMobile);
    }
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  changePicture(evt) {
    var allowedTypes = ['image/jpg', 'image/png', 'image/jpeg'];
    if (evt.target.files && evt.target.files.length) {
      const file = evt.target.files[0];

      if (allowedTypes.indexOf(file?.type) == -1) {
        evt.target.value = null;
        this.defaultSnakBar.error(this.translate.instant('FileTypeError'));
        return;
      }
      if (this.validateFileSize(file, 5)) {
        evt.target.value = null;
        this.defaultSnakBar.error(this.translate.instant('FileSizeError'));
        return;
      }

      this.logoFile = file?.name;
      //converting the file to base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.form.get('logo').setErrors(null);
      reader.onload = () => {
        this.form.patchValue({
          logo: reader.result,
          size: file.size,
        });
        this.form.get('logo').markAsDirty();
        this.changeDetector.detectChanges();
        if (!this.form?.errors?.FileSizeError) {
          const imgModel = new FileModel();
          imgModel.fileName = this.logoFile;
          imgModel.metaData = this.form.get('logo').value;
          imgModel.mimeType = file.type;
          imgModel.documentType = this.documentType;
          if (this.deleteLink || this.filePath !== this.filePathDefault) {
            this.ngxService.start();
            this.deleteAndUploadFile(imgModel).subscribe(
              (res) => {
                this.ngxService.stop();
              },
              (error) => {
                const errorMsg =
                  error?.error?.errorlst && error?.error?.errorlst.length
                    ? processErrors(error?.error?.errorlst)
                    : error?.error?.msg;
                this.defaultSnakBar.error(errorMsg);
                this.ngxService.stop();
              }
            );
          } else {
            this.uploadFile(imgModel);
          }
        }
      };
    }
  }

  getImageByContact() {
    const profilePicData: IProfilePicData =
      this.userInfoService.getUserProfilePicData();
    this.referenceID = profilePicData?.referenceID;
    this.deleteLink = profilePicData?.deleteLink;
    this.imgUrl = profilePicData?.downloadLink;
    this.filePath = profilePicData?.imageURL ? profilePicData?.imageURL : '';
  }

  deleteAndUploadFile(model): Observable<any> {
    return this.fileUploadservice.deleteDocument(this.deleteLink).pipe(
      map((res: any) => {
        return res;
      }),
      switchMap((response: any) => {
        if (response && response.success) {
          return this.fileUploadservice
            .post(model, this.getPostQueryString())
            .pipe(
              map((res) => {
                if (res && res.success) {
                  this.deleteLink = res?.data?.links.delete;
                  this.imgUrl = res?.data?.links?.download;
                  this.referenceID = res.data?.referenceId;
                  this.filePath = this.form.get('logo').value;
                  this.updateUserInfoProfilePicData();
                  this.form.reset();
                  this.changeDetector.detectChanges();
                }
              }),
              catchError(async (error) => {
                const errorMsg =
                  error?.error?.errorlst && error?.error?.errorlst.length
                    ? processErrors(error?.error?.errorlst)
                    : error?.error?.msg;
                this.filePath = '';
                this.imgUrl = '';
                this.referenceID = '';
                this.deleteLink = '';
                this.updateUserInfoProfilePicData();
                this.defaultSnakBar.error(errorMsg);
              })
            );
        } else {
          return null;
        }
      }),
      catchError((e) => {
        return of({});
      })
    );
  }

  uploadFile(model: any) {
    this.ngxService.start();
    this.fileUploadservice.post(model, this.getPostQueryString()).subscribe(
      (res) => {
        if (res && res.success) {
          this.deleteLink = res?.data?.links.delete;
          this.imgUrl = res?.data?.links?.download;
          this.referenceID = res.data?.referenceId;
          this.filePath = this.form.get('logo').value;
          this.form.reset();
          this.updateUserInfoProfilePicData();
          this.changeDetector.detectChanges();
          this.onUploadImageEvent.emit(true);
          this.ngxService.stop();
        }
      },
      (error: any) => {
        this.ngxService.stop();
        const errorMsg =
          error?.error?.errorlst && error?.error?.errorlst.length
            ? processErrors(error?.error?.errorlst)
            : error?.error?.msg;
        this.defaultSnakBar.error(errorMsg);
      }
    );
  }
  DeletePicture() {
    this.logoFile = '';
    this.form.get('logo').reset();
    this.form.get('logo').markAsDirty();
    if (this.deleteLink) {
      this.fileUploadservice.deleteDocument(this.deleteLink).subscribe(
        (res: any) => {
          if (res && res.success) {
            this.filePath = this.filePathDefault;
            this.referenceID = '';
            this.deleteLink = '';
            this.changeDetector.detectChanges();
            this.imgUrl = '';
            this.updateUserInfoProfilePicData();
            this.onUploadImageEvent.emit(false);
          }
        },
        (error: any) => {
          const errorMsg =
            error?.error?.errorlst && error?.error?.errorlst.length
              ? processErrors(error?.error?.errorlst)
              : error?.error?.msg;
          this.defaultSnakBar.error(errorMsg);
        }
      );
    }
  }

  getisMobileverification() {
    return this.envservice.isHideMobileVerification;
  }

  getPostQueryString() {
    let queryString = '';
    queryString = `?contactid=${this.ContactID}`;
    return queryString;
  }

  updateUserDetails(e) {
    this.userInfoService.getUserInfo().subscribe((res) => {
      if (res) {
        this.userInfoService.userInfoResponse = res;
        this.userInfoDetails = res?.data;
        this.currentVerificationStatus =
          AccountVerificationStatus[
            this.userInfoDetails?.accountVerificationStatus?.email
          ];
        this.changeDetector.detectChanges();
      }
    });
  }

  updateUserInfoProfilePicData() {
    this.userInfoService.profilePicData.referenceID = this.referenceID;
    this.userInfoService.profilePicData.deleteLink = this.deleteLink;
    this.userInfoService.profilePicData.downloadLink = this.imgUrl;
    this.userInfoService.profilePicData.imageURL = this.filePath;
  }

  private get icons(): Array<string> {
    return [
      'logout',
      'profile-svg',
      'switch-user',
      'delete-grey',
      'png-icon',
      'email-icon-dark',
      'tel-icon',
      'phone-fill',
      'envelop',
      'Email-Verified',
      'Email-NotVerified',
      'Email-VerificationInProgress',
      'icon-company-new',
    ];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

class FileModel {
  fileName: string;
  metaData: string;
  mimeType: string;
  documentType: string;
}
