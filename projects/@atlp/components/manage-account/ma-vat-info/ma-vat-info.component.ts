import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { MainLookUpService } from 'projects/@atlp/services/mainlookup.service';
import { ManageAccountService } from 'projects/@atlp/services/manage-account.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { ValidatorService } from 'projects/@atlp/services/validator.service';
import { IFileUploadConfigData } from '../../file-upload/file-upload.model';
import { AtlpSidebarService } from '../../sidebar/sidebar.service';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { ManageAccountEnum } from '../manage-account.enum';
import { ManageAccountModel } from '../manage-account.model';
import { AtlpSidebarV2Service } from '../../@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'app-ma-vat-info',
  templateUrl: './ma-vat-info.component.html',
  styleUrls: ['./ma-vat-info.component.scss'],
})
export class MAVatInfoComponent implements OnInit {
  vatCategories: any = [];
  model: ManageAccountModel.IRegistrationViewModel = <
    ManageAccountModel.IRegistrationViewModel
  >{};
  form: FormGroup;
  SidebarName = SidebarName;
  selectedLanguage: string = 'en';
  ucid: string;
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
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private userInfoService: UserInfoService,
    private defaultSnakBar: SnakBarService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private manageAccountService: ManageAccountService,
    private mainlookupservice: MainLookUpService,
    private validatorService: ValidatorService,
    private ngxService: NgxUiLoaderService,
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
    this.manageAccountService.openMCVatInfo.subscribe(
      (res) => {
        if (res == 'opened') {
          this.ucid = this.userInfoService.getuserUCID();
          this.form.get('ucid').patchValue(this.ucid);
          let userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
          let selectedOrgId = localStorage.getItem('selectedCompanyID');
          if (selectedOrgId) {
            this.ngxService.start();
            this.manageAccountService
              .getOrganizationDetails(selectedOrgId)
              .subscribe((res: any) => {
                if (res) {
                  this.enableForm();
                  let companyDetails = res?.data;
                  if (
                    companyDetails?.documentList &&
                    companyDetails?.documentList?.length > 0
                  ) {
                    companyDetails?.documentList.forEach((x: any) => {
                      x.name = x.fileName;
                      if (x.documentType == 'VAT') {
                        this.documentData = [x];
                      }
                    });
                  }
                  this.form.patchValue({
                    vatCategory: companyDetails?.vatCategory,
                    vatNumber: companyDetails?.vatNumber,
                    isVATAccepted: companyDetails?.isVATAccepted,
                  });
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
                  if (companyDetails && companyDetails.vatCategory == '1') {
                    this.disableForm();
                  }
                  this.ngxService.stop();
                  this.form.updateValueAndValidity();
                }
              });
          }
        }
      },
      (err) => {
        this.ngxService.stop();
      }
    );
  }

  enableForm() {
    this.singleConfigData.isEditMode = false;
    this.form.enable();
  }

  disableForm() {
    this.singleConfigData.isEditMode = true;
    this.form.disable();
  }

  initForm() {
    this.form = this.formBuilder.group({
      ucid: new FormControl(''),
      vatCategory: new FormControl(''),
      vatNumber: new FormControl(''),
      isVATAccepted: new FormControl(''),
    });
  }

  getAllLookups() {
    this.ngxService.start();
    this.manageAccountService
      .mapMainLookUpResponse(this.mainlookupservice.getVATCategories())
      .subscribe(
        (res) => {
          // console.log('Vat Categories', res);
          this.vatCategories = res;
          this.ngxService.stop();
        },
        (err) => {
          this.ngxService.stop();
        }
      );
  }

  onVATCategoryChange(event) {
    this.documentData = [];
    this.validatorService.addOrRemoveValidators(this.form, 'reset', [
      'vatNumber',
    ]);
    if (event == '1') {
      this.validatorService.addOrRemoveValidators(
        this.form,
        'set',
        ['vatNumber'],
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(15),
          Validators.maxLength(15),
        ]
      );
    } else {
      this.validatorService.addOrRemoveValidators(
        this.form,
        'set',
        ['vatNumber'],
        []
      );
    }
  }

  onSubmit() {
    if (this.form.get('vatCategory').value == '1') {
      if (this.documentData && this.documentData?.length > 0) {
        this.submitForm();
      } else {
        this.defaultSnakBar.error(
          'Manage_Company.Please_Upload_VAT_Certificate'
        );
      }
    } else {
      this.submitForm();
    }
  }

  submitForm() {
    const orgDetails: ManageAccountModel.IVatInfoViewModel =
      this.form.getRawValue();
    const docData: ManageAccountModel.IDocumentListViewModel = {
      links: {},
      fileName:
        this.documentData &&
        this.documentData?.length > 0 &&
        this.documentData[0]?.name,
      mimeType:
        this.documentData &&
        this.documentData?.length > 0 &&
        this.documentData[0]?.mimeType,
      metaData:
        this.documentData &&
        this.documentData?.length > 0 &&
        this.documentData[0]?.metaData,
      documentNumber: this.form.get('vatNumber')?.value,
      documentSection: 'Organization',
      documentType: 'VAT',
      issueDate: '',
      expiryDate: '',
      contactType: 3,
    };

    let payload: ManageAccountModel.IRegistrationViewModel = {
      updateType: ManageAccountEnum.VatInfo,
      organization: orgDetails,
    };

    if (this.form.get('vatCategory').value == '1') {
      payload.documentList = [docData];
    }
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.ngxService.start();
      this.manageAccountService.updateAccountDetails(payload).subscribe(
        (res) => {
          if (res) {
            this.defaultSnakBar.success('Manage_Company.Updated_Successfully');
            this.manageAccountService.onAccountDetailsUpdated.next('updated');
            this.toggleV2SidebarOpen(this.SidebarName.mcVatInfo);
            this.form.reset();
            this.ngxService.stop();
          }
        },
        (err) => {
          this.ngxService.stop();
          this.validatorService.processAPIError(err);
        }
      );
    } else {
      this.defaultSnakBar.error('Manage_Company.Fill_All_Mandatory_Fields');
    }
  }

  onFileUpdated(data: any, section: string) {
    this.documentData = data;
  }

  adjustMatSelectOverlay(element): void {
    element?.overlayDir?._overlayRef?.addPanelClass('custom-overlay');
  }

  private get icons(): Array<string> {
    return ['plus-dark', 'soc-icon', 'rejected-icon', 'plus-white', 'edit'];
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }
}
