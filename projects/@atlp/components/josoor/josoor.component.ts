import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { JosoorService } from 'projects/@atlp/services/josoor.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { IFileUploadConfigData } from '../file-upload/file-upload.model';
import { AtlpSidebarService } from '../sidebar/sidebar.service';
import { SnakBarService } from '../snak-bars/service/snak-bar-default.component';
import { JosoorModel } from './josoor.model';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'app-josoor',
  templateUrl: './josoor.component.html',
  styleUrls: ['./josoor.component.scss'],
})
export class JosoorComponent implements OnInit {
  model: JosoorModel.IJosoorSaveViewModel = <JosoorModel.IJosoorSaveViewModel>{
    companyInformationDTO: {
      logo: {},
      brochures: {},
      productImages: {},
    },
  };
  form: FormGroup;
  SidebarName = SidebarName;
  businessTypes: any = [];
  sectors: any = [];
  selectedLanguage: string = 'en';
  ucid: string;
  id: string;
  fileConfigData = {
    actions: true,
    fileType: ['jpg', 'jpeg', 'png', 'pdf'],
    maxFileSize: 15,
    showDownloadAll: true,
    uploadUrl: `${this.envService.companyInfoBaseUrl}/CompanyInformation/document/upload`,
    deleteUrl: `${this.envService.companyInfoBaseUrl}/CompanyInformation/document`,
    downloadUrl: `${this.envService.companyInfoBaseUrl}/CompanyInformation/download`,
    viewUrl: `${this.envService.companyInfoBaseUrl}/CompanyInformation/document/base64`,
  };

  singleConfigData: IFileUploadConfigData = {
    uploadType: 'single',
    maxFileCount: 1,
    isAPISetup: true,
    isBatchIdSetup: true,
    ...this.fileConfigData,
  };

  multiConfigData: IFileUploadConfigData = {
    uploadType: 'multi',
    maxFileCount: 50,
    isAPISetup: true,
    isBatchIdSetup: true,
    ...this.fileConfigData,
  };

  companyLogo: any = [];
  digitalBrochure: any = [];
  productImages: any = [];
  companyLogoBatchId: string;
  digitalBrochureBatchId: string;
  productImagesBatchId: string;
  companyDetails: any;
  userInfoDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private josoorService: JosoorService,
    private userInfoService: UserInfoService,
    private portalBridgeService: AtlpPortalBridgeService,
    private envService: AtlpEnvService,
    private defaultSnakBar: SnakBarService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private _atplSidebarV2Service: AtlpSidebarV2Service
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllLookups();
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.getCompanyDetails();
        this.ucid = this.userInfoService.getuserUCID();
        this.companyInformation.get('ucid').patchValue(this.ucid);
        this.form.updateValueAndValidity();
      }
    });
    this.portalBridgeService.selectedCompanyChanged.subscribe((res) => {
      if (res == 'changed') {
        this.getCompanyDetails();
      }
    });
    this.portalBridgeService.openJosoor.subscribe((res) => {
      if (res == 'opened') {
        this.ucid = this.userInfoService.getuserUCID();
        this.companyInformation.get('ucid').patchValue(this.ucid);
        this.form.updateValueAndValidity();
        if (!this._atplSidebarService.getSidebar(SidebarName.josoor)?.opened) {
          this.getJosoorDetails();
        }
      }
    });
    this.companyInformation
      .get('typeOfBusiness')
      .valueChanges.subscribe((value) => {
        if (value) {
          if (!value.includes('Other')) {
            this.companyInformation.get('typeOfBusinessOther').patchValue('');
            this.companyInformation
              .get('typeOfBusinessOther')
              .removeValidators(Validators.required);
          } else {
            this.companyInformation
              .get('typeOfBusinessOther')
              .addValidators(Validators.required);
          }
        }
      });
    this.companyInformation.get('sectors').valueChanges.subscribe((value) => {
      if (value) {
        if (!value.includes('Other')) {
          this.companyInformation.get('sectorOther').patchValue('');
          this.companyInformation
            .get('sectorOther')
            .removeValidators(Validators.required);
        } else {
          this.companyInformation
            .get('sectorOther')
            .addValidators(Validators.required);
        }
      }
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      isDraft: new FormControl(false),
      companyInformationDTO: new FormGroup({
        ucid: new FormControl(''),
        companyDetails: new FormGroup({
          businessName: new FormControl(''),
          telephone: new FormControl(''),
          website: new FormControl(''),
          licenceNumber: new FormControl(''),
        }),
        typeOfBusiness: new FormControl([], [Validators.required]),
        sectors: new FormControl([], [Validators.required]),
        typeOfBusinessOther: new FormControl(''),
        sectorOther: new FormControl(''),
        companyOverview: new FormControl(''),
        companyProducts: new FormControl(''),
        pointOfContactForSales: new FormGroup({
          fullName: new FormControl(''),
          jobTitle: new FormControl(''),
          email: new FormControl(''),
          mobileNumber: new FormControl(''),
        }),
        pointOfContactForGeneric: new FormGroup({
          fullName: new FormControl('', [
            Validators.maxLength(25),
            Validators.pattern('^[^<>\'"/;`%@#$!(&*0123456789)?_-]*$'),
          ]),
          jobTitle: new FormControl('', Validators.maxLength(25)),
          email: new FormControl('', [Validators.email]),
          mobileNumber: new FormControl(''),
        }),
        linkedIn: new FormControl(''),
        twitter: new FormControl(''),
        instagram: new FormControl(''),
        facebook: new FormControl(''),
        youtube: new FormControl(''),
        logo: new FormGroup({}),
        brochures: new FormGroup({}),
        productImages: new FormGroup({}),
        termsAndConditions: new FormControl(false, [Validators.required]),
      }),
    });
  }

  getJosoorDetails() {
    this.digitalBrochure = [];
    this.productImages = [];
    this.companyLogo = [];
    this.digitalBrochureBatchId = '';
    this.productImagesBatchId = '';
    this.companyLogoBatchId = '';
    this.id = '';
    this.josoorService.getJosoorDetails(this.ucid).subscribe((res) => {
      if (res && res?.companyInformationDTO && res.companyInformationDTO?.id) {
        this.id = res.companyInformationDTO?.id;
        this.form.disable();
        this.singleConfigData.isEditMode = true;
        this.multiConfigData.isEditMode = true;
        this.digitalBrochureBatchId = res?.companyInformationDTO?.logo
          ? res?.companyInformationDTO?.brochures?.batchId
          : '';
        this.digitalBrochure = res?.companyInformationDTO?.brochures
          ? res?.companyInformationDTO?.brochures?.documentDetails
          : [];
        this.productImagesBatchId = res?.companyInformationDTO?.logo
          ? res?.companyInformationDTO?.productImages?.batchId
          : '';
        this.productImages = res?.companyInformationDTO?.productImages
          ? res?.companyInformationDTO?.productImages?.documentDetails
          : [];
        this.companyLogoBatchId = res?.companyInformationDTO?.logo
          ? res?.companyInformationDTO?.logo?.batchId
          : '';
        this.companyLogo = res?.companyInformationDTO?.logo
          ? res?.companyInformationDTO?.logo?.documentDetails
          : [];
        this.form.patchValue(res);
        this.companyInformation
          .get('termsAndConditions')
          .patchValue(res.companyInformationDTO?.id ? true : false);
        this.form.updateValueAndValidity();
      } else {
        this.form.enable();
        this.singleConfigData.isEditMode = false;
        this.multiConfigData.isEditMode = false;
        this.form.reset();
        this.companyInformation.controls['companyDetails']?.patchValue({
          businessName: this.companyDetails?.tradeName['en-US'],
          telephone: this.companyDetails?.phoneNo,
          website: this.companyDetails?.website,
          licenceNumber: this.companyDetails?.licenseNo,
        });
        this.companyInformation.controls['pointOfContactForSales']?.patchValue({
          fullName:
            this.selectedLanguage == 'en'
              ? `${this.userInfoDetails?.firstName['en-US']} ${this.userInfoDetails?.lastName['en-US']}`
              : `${this.userInfoDetails?.firstName['ar-AE']} ${this.userInfoDetails?.lastName['ar-AE']}`,
          jobTitle: '',
          email: this.userInfoDetails?.emailAddress
            ? this.userInfoDetails?.emailAddress
            : '',
          mobileNumber: this.userInfoDetails?.mobileNumber
            ? this.userInfoDetails?.mobileNumber
            : ';',
        });
        this.companyInformation.get('ucid').patchValue(this.ucid);
        this.companyInformation.get('termsAndConditions').patchValue(false);
        this.form.updateValueAndValidity();
      }
    });
  }

  getCompanyDetails() {
    const userInfo = this.userInfoService.getUserInfoDetails();
    this.userInfoDetails = userInfo?.data;
    const selectedOrgId = localStorage.getItem('selectedCompanyID');
    if (selectedOrgId && this.userInfoDetails?.id) {
      this.josoorService
        .getCompanyDetails(selectedOrgId, this.userInfoDetails?.id)
        .subscribe((res) => {
          if (res && res.data) {
            this.companyDetails = res.data;
            this.companyInformation.controls['companyDetails']?.patchValue({
              businessName: this.companyDetails?.tradeName['en-US'],
              telephone: this.companyDetails?.phoneNo,
              website: this.companyDetails?.website,
              licenceNumber: this.companyDetails?.licenseNo,
            });
            this.form.updateValueAndValidity();
          }
        });
    }
  }

  getAllLookups() {
    this.josoorService.getAllBusinessType().subscribe((res) => {
      if (res) {
        this.businessTypes = this.processLookUpData(res);
      }
    });
    this.josoorService.getAllSector().subscribe((res) => {
      if (res) {
        this.sectors = this.processLookUpData(res);
      }
    });
  }

  processLookUpData(response) {
    var datalist: JosoorModel.FilterModel[] = [];
    response.items.forEach((rec) => {
      let f = new JosoorModel.FilterModel();
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
    return datalist;
  }

  onEdit() {
    this.singleConfigData.isEditMode = false;
    this.multiConfigData.isEditMode = false;
    this.form.enable();
    this.companyInformation.get('termsAndConditions').patchValue(false);
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.companyLogo && this.companyLogo.length != 0) {
        this.model = this.form.getRawValue();
        this.model.isDraft = false;
        this.model.companyInformationDTO.id = this.id ? this.id : '';
        this.model.companyInformationDTO.logo.batchId = this.companyLogoBatchId;
        this.model.companyInformationDTO.logo.documentDetails =
          this.companyLogo && this.companyLogo?.length > 0
            ? this.companyLogo.map((x) => {
                let data = {
                  fileName: x.name,
                  mimeType: x.mimeType,
                  referenceId: x.referenceId,
                };
                return data;
              })
            : [];
        this.model.companyInformationDTO.brochures.batchId =
          this.digitalBrochureBatchId;
        this.model.companyInformationDTO.brochures.documentDetails =
          this.digitalBrochure && this.digitalBrochure?.length > 0
            ? this.digitalBrochure.map((x) => {
                let data = {
                  fileName: x.name,
                  mimeType: x.mimeType,
                  referenceId: x.referenceId,
                };
                return data;
              })
            : [];
        this.model.companyInformationDTO.productImages.batchId =
          this.productImagesBatchId;
        this.model.companyInformationDTO.productImages.documentDetails =
          this.productImages && this.productImages?.length > 0
            ? this.productImages.map((x) => {
                let data = {
                  fileName: x.name,
                  mimeType: x.mimeType,
                  referenceId: x.referenceId,
                };
                return data;
              })
            : [];
        if (this.id) {
          this.josoorService
            .updateJosoorDetails(this.model)
            .subscribe((res) => {
              if (res) {
                this.defaultSnakBar.success('JOSOOR.Updated_Successfully');
                this.toggleV2SidebarOpen(SidebarName.josoor);
              }
            });
        } else {
          this.josoorService.saveJosoorDetails(this.model).subscribe(
            (res) => {
              if (res) {
                this.defaultSnakBar.success('JOSOOR.Saved_Successfully');
                this.toggleV2SidebarOpen(SidebarName.josoor);
              }
            },
            (err) => {
              let errorMessage = '';
              if (err.error.errorlst.length > 0) {
                err.error.errorlst.forEach((element) => {
                  errorMessage = errorMessage + element.error;
                });
                this.defaultSnakBar.error(errorMessage);
              }
            }
          );
        }
      } else {
        this.defaultSnakBar.error(
          this.translate.instant('JOSOOR.Upload_Company_Logo')
        );
      }
    } else {
      this.defaultSnakBar.error(
        this.translate.instant('JOSOOR.Fill_All_Mandatory_Fields')
      );
    }
  }

  updateBatchId(data: string, section: string) {
    switch (section) {
      case 'company-logo':
        this.companyLogoBatchId = data;
        break;
      case 'digital-brochure':
        this.digitalBrochureBatchId = data;
        break;
      case 'product-images':
        this.productImagesBatchId = data;
        break;
      default:
        break;
    }
  }

  onFileUpdated(data: any, section: string) {
    switch (section) {
      case 'company-logo':
        this.companyLogo = data;
        break;
      case 'digital-brochure':
        this.digitalBrochure = data;
        break;
      case 'product-images':
        this.productImages = data;
        break;
      default:
        break;
    }
  }

  adjustMatSelectOverlay(element): void {
    element?.overlayDir?._overlayRef?.addPanelClass('custom-overlay');
  }

  private get icons(): Array<string> {
    return [
      'plus-dark',
      'soc-icon',
      'rejected-icon',
      'plus-white',
      'edit',
      'icon-close-black',
    ];
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  get companyInformation() {
    return this.form.controls['companyInformationDTO'] as FormGroup;
  }

  get pointOfContactSales() {
    return this.companyInformation.controls[
      'pointOfContactForSales'
    ] as FormGroup;
  }
}
