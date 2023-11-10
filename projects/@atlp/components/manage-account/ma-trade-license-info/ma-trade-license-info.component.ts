import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { LookupService } from 'projects/@atlp/services/lookup.service';
import { MainLookUpService } from 'projects/@atlp/services/mainlookup.service';
import {
  FilterModel,
  ManageAccountService,
} from 'projects/@atlp/services/manage-account.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { ValidatorService } from 'projects/@atlp/services/validator.service';
import { DateLessThanOrEqualsValidator } from 'projects/@atlp/validators/DateValidator';
import { DateGreaterThanOrEqualsValidator } from 'projects/@atlp/validators/FutureDateValidator';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFileUploadConfigData } from '../../file-upload/file-upload.model';
import { AtlpSidebarService } from '../../sidebar/sidebar.service';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { ManageAccountEnum } from '../manage-account.enum';
import { ManageAccountModel } from '../manage-account.model';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'app-ma-trade-license-info',
  templateUrl: './ma-trade-license-info.component.html',
  styleUrls: ['./ma-trade-license-info.component.scss'],
})
export class MATradeLicenseComponent implements OnInit {
  model: ManageAccountModel.IRegistrationViewModel = <
    ManageAccountModel.IRegistrationViewModel
  >{};
  countiresList: any = [];
  licenseIssuingEmiratesList: any = [];
  licenseIssuingAuthorityList: any = [];
  licenseTypeList: any = [];
  establishmentTypeList: any = [];
  licenseStageList: any = [];
  activityList: any = [];
  selectedActivities = [];
  activityPagination = {
    hasNextPage: true,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: false,
    itemEnd: 0,
    itemStart: 1,
    pageCount: 0,
    pageIndex: 1,
    pageNumber: 0,
    pageSize: 40,
    totalItemCount: 0,
  };
  form: FormGroup;
  SidebarName = SidebarName;
  selectedLanguage: string = 'en';
  ucid: string;
  isRetrievedFormDED: boolean = false;
  id: string;
  singleConfigData: IFileUploadConfigData = {
    uploadType: 'single',
    maxFileCount: 1,
    isAPISetup: false,
    actions: true,
    fileType: ['jpg', 'jpeg', 'png', 'pdf'],
    maxFileSize: 3,
  };
  documentData: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private _atplSidebarService: AtlpSidebarService,
    private userInfoService: UserInfoService,
    private defaultSnakBar: SnakBarService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private manageAccountService: ManageAccountService,
    private mainlookupservice: MainLookUpService,
    private lookupService: LookupService,
    private ngxService: NgxUiLoaderService,
    private validatorService: ValidatorService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    private _iconsService: IconsService
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllLookups();
    this.manageAccountService.openMCTradeLicenseInfo.subscribe((res) => {
      if (res == 'opened') {
        this.ucid = this.userInfoService.getuserUCID();
        this.form.get('ucid').patchValue(this.ucid);
        let userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
        let selectedOrgId = localStorage.getItem('selectedCompanyID');
        if (selectedOrgId) {
          this.ngxService.start();
          this.manageAccountService
            .getOrganizationDetails(selectedOrgId)
            .subscribe(
              (res: any) => {
                if (res) {
                  let companyDetails = res?.data;
                  if (
                    companyDetails?.documentList &&
                    companyDetails?.documentList?.length > 0
                  ) {
                    companyDetails?.documentList.forEach((x: any) => {
                      x.name = x.fileName;
                      if (x.documentType == 'TradeLicense') {
                        this.documentData = [x];
                      }
                    });
                  }
                  this.form.patchValue(companyDetails);
                  if (
                    this.form?.get('activities').value &&
                    this.form?.get('activities').value.length
                  ) {
                    const activityIds = this.form?.get('activities').value;
                    this.initActivities('', activityIds);
                  }
                  let adminRoles = [];
                  adminRoles =
                    userInfoDetails?.selectedCompany?.contactRoles.filter(
                      (x) =>
                        x.code == 'AUTHCON' ||
                        x.code == 'FP' ||
                        x.code == 'PRCON'
                    );
                  if (adminRoles && adminRoles.length === 0) {
                    this.disableForm();
                  }
                  this.form.updateValueAndValidity();
                  this.ngxService.stop();
                }
              },
              (err) => {
                this.ngxService.stop();
              }
            );
        }
      }
    });
    this.form.get('licenseIssuingEmirates').valueChanges.subscribe((value) => {
      if (value) {
        this.onLicenseIssuingEmirateChange(value);
      }
    });
  }

  enableForm() {
    this.singleConfigData.isEditMode = false;
    this.form.enable();
  }

  disableForm() {
    this.singleConfigData.isEditMode = true;
    this.form.disable();
  }

  onLicenseIssuingEmirateChange(event) {
    var datalist: FilterModel[] = [];
    this.ngxService.start();
    this.mainlookupservice.getLicenseIssuingAuthority(event).subscribe(
      (response) => {
        response.items.forEach((rec) => {
          let f = new FilterModel();
          f.name = rec.name;
          let arabicDesc = rec?.metadata?.find(
            (meta) => meta?.metadata_Type === 'Language'
          )?.data
            ? JSON.parse(
                rec?.metadata?.find((meta) => meta.metadata_Type === 'Language')
                  .data
              ).AR
            : rec.description;
          f.description =
            this.selectedLanguage == 'en'
              ? rec.description
              : arabicDesc
              ? arabicDesc
              : rec.description;
          datalist.push(f);
        });
        this.licenseIssuingAuthorityList = datalist;
        this.ngxService.stop();
      },
      (err) => {
        this.licenseIssuingAuthorityList = [];
        this.ngxService.stop();
      }
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      ucid: new FormControl(''),
      licenseIssuingCountry: new FormControl(''),
      licenseIssuingEmirates: new FormControl(''),
      licenseIssuingAuthority: new FormControl(''),
      licenseNo: new FormControl(''),
      licenseIssuingDate: new FormControl('', [
        Validators.required,
        DateLessThanOrEqualsValidator(
          'licenseIssuingDate',
          'licenseExpiryDate'
        ),
        DateLessThanOrEqualsValidator('licenseIssuingDate', 'todaydate'),
      ]),
      licenseExpiryDate: new FormControl('', [
        Validators.required,
        DateGreaterThanOrEqualsValidator('licenseExpiryDate', 'todaydate'),
      ]),
      tradeName: new FormGroup({
        'ar-AE': new FormControl(''),
        'en-US': new FormControl(''),
      }),
      licenseType: new FormControl(''),
      establishmentType: new FormControl(''),
      activities: new FormControl([]),
      licenseStage: new FormControl(''),
      todaydate: new FormControl(
        this.processDate(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
      ),
    });
    const disableControls = [
      'licenseIssuingCountry',
      'licenseIssuingEmirates',
      'licenseIssuingAuthority',
      'licenseNo',
      'licenseType',
      'establishmentType',
      'licenseStage',
    ];

    const disableChildControls = ['en-US', 'ar-AE'];
    this.disbaleFields(this.form, disableControls);
    this.disbaleFields(this.tradeName, disableChildControls);
  }

  disbaleFields(form: FormGroup, controls: string[]) {
    if (controls && controls?.length > 0) {
      controls.forEach((control) => {
        form.get(control).disable();
      });
    }
  }

  getAllLookups() {
    this.initActivities();
    this.ngxService.start();
    forkJoin([
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getCountries()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getLicenseIssuingEmirates()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getLicenseTypes()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getEstablishmentTypes()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getLicenseStages()
      ),
    ]).subscribe(
      (res) => {
        this.countiresList = res[0];
        this.licenseIssuingEmiratesList = res[1];
        this.licenseTypeList = res[2];
        this.establishmentTypeList = res[3];
        this.licenseStageList = res[4];
        this.ngxService.stop();
      },
      (err) => {
        this.ngxService.stop();
      }
    );
  }

  initActivities(search?, activityIds?) {
    this.ngxService.start();
    let recordsToLoad = 15;
    if (activityIds && Array.isArray(activityIds) && activityIds.length > 0) {
      recordsToLoad = activityIds.length;
    }
    this.lookupService
      .getActivitiesLookup(
        recordsToLoad,
        this.activityPagination.pageIndex,
        search,
        activityIds
      )
      .pipe(
        map((res: any) => {
          this.ngxService.start();
          this.activityPagination = {
            hasNextPage: res.data.hasNextPage,
            hasPreviousPage: res.data.hasPreviousPage,
            isFirstPage: res.data.isFirstPage,
            isLastPage: res.data.isLastPage,
            itemEnd: res.data.itemEnd,
            itemStart: res.data.itemStart,
            pageCount: res.data.pageCount,
            pageIndex: res.data.pageIndex,
            pageNumber: res.data.pageNumber,
            pageSize: res.data.pageSize,
            totalItemCount: res.data.totalItemCount,
          };
          const data = res.data.data.map((r) => {
            const item: any = {
              label:
                this.selectedLanguage == 'en'
                  ? r.activityName?.['en-US']
                  : r.activityName?.['ar-AE'],
              value: r,
            };
            return item;
          });

          const dataWithoutDuplicates = data.filter(
            (r) =>
              !this.activityList.find(
                (activity) => r.value.activityId === activity.value.activityId
              )
          );

          this.activityList = [...this.activityList, ...dataWithoutDuplicates];
          return this.activityList;
        })
      )
      .subscribe((r) => {
        this.patchSelectedActivities(r, activityIds);
        this.ngxService.stop();
      });
  }

  loadMoreActvities(withSearch) {
    if (
      this.activityPagination.pageIndex++ >=
      this.activityPagination.totalItemCount
    )
      return;
    this.initActivities(withSearch);
  }

  patchSelectedActivities(activityList, activityIds) {
    this.ngxService.start();
    if (activityIds && Array.isArray(activityIds) && activityIds.length > 0) {
      this.activityPagination = {
        hasNextPage: true,
        hasPreviousPage: false,
        isFirstPage: true,
        isLastPage: false,
        itemEnd: 0,
        itemStart: 1,
        pageCount: 0,
        pageIndex: 0,
        pageNumber: 0,
        pageSize: 40,
        totalItemCount: 100,
      };
      const selectedActivities = activityList
        .filter((r) => activityIds.includes(r.value.activityId))
        .map((r) => r.value);
      this.form.patchValue({
        activities: selectedActivities,
      });
      this.selectedActivities = selectedActivities;
      this.form.updateValueAndValidity();
      this.ngxService.stop();
    }
    this.ngxService.stop();
  }

  searchActivities(search) {
    this.activityPagination.pageIndex = 1;
    const selectedActivities = this.form.get('activities').value;
    if (
      selectedActivities &&
      Array.isArray(selectedActivities) &&
      selectedActivities.length > 0
    ) {
      const activities = selectedActivities.map((r) => r.activityId);
      this.activityList = this.activityList.filter((r) =>
        activities.includes(r.value.activityId)
      );
    } else {
      this.activityList = [];
    }
    this.initActivities(search);
  }

  onSubmit() {
    if (this.documentData && this.documentData.length > 0) {
      let orgDetails: ManageAccountModel.ITradeLicenseInfoViewModel =
        this.form.getRawValue();
      orgDetails.activities = orgDetails.activities
        ? orgDetails.activities.map((r) => r.activityId)
        : [];
      let docData: ManageAccountModel.IDocumentListViewModel = <
        ManageAccountModel.IDocumentListViewModel
      >{};
      docData = {
        links:
          this.documentData && this.documentData.length > 0
            ? this.documentData[0].links
            : {},
        fileName:
          this.documentData && this.documentData.length > 0
            ? this.documentData[0].name
            : '',
        mimeType:
          this.documentData && this.documentData.length > 0
            ? this.documentData[0].mimeType
            : '',
        metaData:
          this.documentData && this.documentData.length > 0
            ? this.documentData[0].metaData
            : '',
        documentNumber: this.form.get('vatNumber')?.value,
        documentSection: 'Organization',
        documentType: 'TradeLicense',
        issueDate: this.form.get('licenseIssuingDate').value,
        expiryDate: this.form.get('licenseExpiryDate').value,
        contactType: 3,
      };

      let payload: ManageAccountModel.IRegistrationViewModel = {
        updateType: ManageAccountEnum.TradeLicenseInfo,
        organization: orgDetails,
        documentList: [docData],
      };
      this.form.markAllAsTouched();
      if (this.form.valid) {
        this.ngxService.start();
        this.manageAccountService.updateAccountDetails(payload).subscribe(
          (res) => {
            if (res) {
              this.defaultSnakBar.success(
                'Manage_Company.Updated_Successfully'
              );
              this.form.reset();
              this.documentData = [];
              this.manageAccountService.onAccountDetailsUpdated.next('updated');
              this.toggleV2SidebarOpen(this.SidebarName.mcTradeLicenseInfo);
              this.ngxService.stop();
            }
          },
          (err) => {
            this.validatorService.processAPIError(err);
            this.ngxService.stop();
          }
        );
      } else {
        this.defaultSnakBar.error('Manage_Company.Fill_All_Mandatory_Fields');
      }
    } else {
      this.defaultSnakBar.error('Manage_Company.Please_Upload_Trade_License');
    }
  }

  clearDate(event, datefield) {
    event.stopPropagation();
    this.form.get(datefield).reset();
  }

  onFileUpdated(data: any) {
    this.documentData = data;
  }

  showDEDRetrievalBtn(): Boolean {
    if (
      this.form.get('licenseIssuingCountry').value == 'AE' &&
      this.form.get('licenseIssuingEmirates').value == 'AEAUH' &&
      this.form.get('licenseIssuingAuthority').value ==
        'Department of Planning & Economy, Abu Dhabi' &&
      this.form.get('licenseType').value == 'CL'
    ) {
      return true;
    } else {
      return false;
    }
  }

  retrieveTradeLicense() {
    if (this.form.get('licenseNo').value) {
      this.ngxService.start();
      this.manageAccountService
        .retrieveFromDED(this.form.get('licenseNo').value)
        .subscribe(
          (res: any) => {
            if (res && res.data) {
              const { basicInfo } = res.data;
              this.form.controls['tradeName']
                .get('ar-AE')
                .patchValue(basicInfo.nameArb);
              this.form.controls['tradeName']
                .get('en-US')
                .patchValue(basicInfo.nameEng);
              this.form
                .get('licenseIssuingDate')
                .patchValue(
                  this.processDate(basicInfo?.issueDate, 'DD/MM/YYYY')
                );
              this.form
                .get('licenseExpiryDate')
                .patchValue(
                  this.processDate(basicInfo?.expiryDate, 'DD/MM/YYYY')
                );
              if (
                basicInfo.legalForm?.english &&
                this.establishmentTypeList?.find(
                  (val) =>
                    val?.name?.toLowerCase() ===
                    basicInfo.legalForm?.english?.toLowerCase()
                )
              ) {
                const dedEstablishmentType = this.establishmentTypeList?.filter(
                  (val) =>
                    val?.name?.toLowerCase() ===
                    basicInfo.legalForm?.english?.toLowerCase()
                )[0];
                this.form
                  .get('establishmentType')
                  .patchValue(dedEstablishmentType?.name);
              }
              if (res.data?.activities && res.data?.activities?.length) {
                const activityIds = res.data?.activities?.reduce(
                  (a, o) => (a.push(o.code), a),
                  []
                );
                this.initActivities('', activityIds);
              }
              this.isRetrievedFormDED = true;
              this.form.updateValueAndValidity();
              let disableControls = [
                'licenseIssuingDate',
                'licenseExpiryDate',
                'activities',
              ];
              this.disbaleFields(this.form, disableControls);
              this.ngxService.stop();
            }
          },
          (err) => {
            this.isRetrievedFormDED = false;
            this.ngxService.stop();
            this.validatorService.processAPIError(err);
          }
        );
    }
  }

  adjustMatSelectOverlay(element): void {
    element?.overlayDir?._overlayRef?.addPanelClass('custom-overlay');
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  processDate(dateinput: any, frmt: any) {
    return moment(dateinput, frmt);
  }

  get tradeName() {
    return this.form.controls['tradeName'] as FormGroup;
  }

  private get icons(): Array<string> {
    return [
      'check-square-offset-fill',
      'warning-circle-fill',
      'edit',
      'icon-edit',
      'data-icon',
      'close-white-icon',
      'wrc-edit-icon-blue',
      'search-icon',
      'icon-close-black',
    ];
  }
}
