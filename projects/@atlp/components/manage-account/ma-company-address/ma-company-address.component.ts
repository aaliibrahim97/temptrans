import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { MainLookUpService } from 'projects/@atlp/services/mainlookup.service';
import {
  FilterModel,
  ManageAccountService,
} from 'projects/@atlp/services/manage-account.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { ValidatorService } from 'projects/@atlp/services/validator.service';
import { forkJoin } from 'rxjs';
import { AtlpSidebarService } from '../../sidebar/sidebar.service';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { ManageAccountEnum } from '../manage-account.enum';
import { ManageAccountModel } from '../manage-account.model';
import { DOCUMENT } from '@angular/common';
import { AtlpSidebarV2Service } from '../../@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'app-ma-company-address',
  templateUrl: './ma-company-address.component.html',
  styleUrls: ['./ma-company-address.component.scss'],
})
export class MACompanyAddressComponent implements OnInit {
  @ViewChild('phoneNo') phoneInput: NgxMatIntlTelInputComponent;
  model: ManageAccountModel.IRegistrationViewModel = <
    ManageAccountModel.IRegistrationViewModel
  >{};
  phoneNoCode: any;
  preferredCountry: any[] = ['ae'];
  onlyCountry: any = [];
  emiratesList: any = [];
  form: FormGroup;
  SidebarName = SidebarName;
  selectedLanguage: string = 'en';
  ucid: string;
  id: string;
  countiresList: any = [];
  filteredCountries: any = [];
  areaList: any = [];
  sectorList: any = [];
  isForeignCompany: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private userInfoService: UserInfoService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private manageAccountService: ManageAccountService,
    private mainlookupservice: MainLookUpService,
    private validatorService: ValidatorService,
    private ngxService: NgxUiLoaderService,
    private defaultSnakBar: SnakBarService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,

    @Inject(DOCUMENT) private document: Document
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllLookups();
    this.manageAccountService.openMCCompanyAddress.subscribe(
      (res) => {
        if (res == 'opened') {
          this.ucid = this.userInfoService.getuserUCID();
          this.form.get('ucid').patchValue(this.ucid);
          let selectedOrgId = localStorage.getItem('selectedCompanyID');
          if (selectedOrgId) {
            this.ngxService.start();
            this.manageAccountService
              .getOrganizationDetails(selectedOrgId)
              .subscribe((res: any) => {
                if (res) {
                  let companyDetails = res?.data;
                  this.form.patchValue(companyDetails);
                  this.form
                    .get('phoneNo')
                    .patchValue(
                      this.validatorService.processPhoneNumber(
                        companyDetails.phoneNo
                      )
                    );
                  this.ngxService.stop();
                  this.form.updateValueAndValidity();
                  this.isForeignCompany =
                    companyDetails.licenseIssuingCountry?.toLowerCase() != 'ae';
                  if (!this.isForeignCompany) {
                    this.disableCountrySelector();
                  }
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

  initForm() {
    this.form = this.formBuilder.group({
      ucid: new FormControl(''),
      licenseIssuingEmirates: new FormControl(''),
      establishmentAddress: new FormControl('', [Validators.maxLength(200)]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^<>\'"/;`%@#$!(&*0123456789)?_-]*$'),
        Validators.maxLength(70),
      ]),
      buildingNumber: new FormControl('', [Validators.maxLength(100)]),
      poBox: new FormControl('', [Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl('', [
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),
      streetAddress: new FormControl('', [Validators.required]),
      tawtheeqMetaData: new FormGroup({
        area: new FormControl(''),
        sector: new FormControl(''),
      }),
      phoneNo: new FormControl('', [Validators.required]),
    });
  }

  getAllLookups() {
    this.ngxService.start();
    this.getAreas();
    forkJoin([
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getLicenseIssuingEmirates()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainlookupservice.getCountries()
      ),
    ]).subscribe(
      (res) => {
        if (res) {
          this.emiratesList = res[0];
          this.countiresList = res[1];
          this.ngxService.stop();
        }
      },
      (err) => {
        this.ngxService.stop();
      }
    );
  }

  filterLookup(value, type) {
    if (value) {
      this.filteredCountries = this.countiresList.filter((i) =>
        i.description.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredCountries = this.countiresList;
    }
  }

  onCountryChange(event) {
    this.validatorService.addOrRemoveValidators(this.form, 'reset', ['city']);
    this.updateCityNameValidations(event?.option?.value);
  }

  updateCityNameValidations(country) {
    if (country?.toLowerCase() == 'ae') {
      this.validatorService.addOrRemoveValidators(
        this.form,
        'set',
        ['city'],
        [Validators.required]
      );
    } else {
      this.validatorService.addOrRemoveValidators(
        this.form,
        'set',
        ['city'],
        [
          Validators.pattern('^[^<>\'"/;`%@#$!(&*0123456789)?_-]*$'),
          Validators.maxLength(70),
        ]
      );
    }
  }

  displayFunction(value): void {
    if (this.filteredCountries?.length) {
      let item = _.filter(this.filteredCountries, { name: value });
      if (item && item.length > 0) {
        return item[0].description;
      }
    } else {
      let item = _.filter(this.countiresList, { name: value });
      if (item && item.length > 0) {
        this.filteredCountries = this.countiresList;
        return item[0].description;
      }
    }
  }

  InputControl(event) {
    setTimeout(() => {
      let isValid = this.countiresList.filter(
        (m) =>
          m.description?.replace(/\s/g, '')?.toLowerCase() ===
          event.target.value?.replace(/\s/g, '')?.toLowerCase()
      );
      if (isValid.length === 0) {
        this.form.get('country')?.setValue(null);
        this.filteredCountries = this.countiresList;
      } else if (isValid.length === 1) {
        this.form.get('country').setValue(isValid[0]?.name);
      }
      this.form.get('city')?.setValue(null);
    }, 300);
  }

  getAreas() {
    var datalist: FilterModel[] = [];
    this.ngxService.start();
    this.mainlookupservice.getAreas().subscribe(
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
        this.areaList = datalist;
        this.ngxService.stop();
      },
      (err) => {
        this.ngxService.stop();
        this.areaList = [];
      }
    );
  }

  onAreaChange(event) {
    var datalist: FilterModel[] = [];
    this.ngxService.start();
    this.mainlookupservice.getSectors(event).subscribe(
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
        this.sectorList = datalist;
        this.ngxService.stop();
      },
      (err) => {
        this.ngxService.stop();
        this.areaList = [];
      }
    );
  }

  onSubmit() {
    let orgDetails: ManageAccountModel.ICompanyAddressViewModel =
      this.form.getRawValue();
    orgDetails.phoneNo = this.validatorService.checkNumberOnSubmit(
      this.form.get('phoneNo').value,
      this.isForeignCompany
    );
    orgDetails.phoneNoCode = this.phoneNoCode;
    let payload: ManageAccountModel.IRegistrationViewModel = {
      updateType: ManageAccountEnum.CompanyAddress,
      organization: orgDetails,
    };
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.ngxService.start();
      this.manageAccountService.updateAccountDetails(payload).subscribe(
        (res) => {
          if (res) {
            this.defaultSnakBar.success('Manage_Company.Updated_Successfully');
            this.form.reset();
            this.manageAccountService.onAccountDetailsUpdated.next('updated');
            this.toggleV2SidebarOpen(this.SidebarName.mcCompanyAddress);
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

  mobileNocountryChange(event, element) {
    this.phoneNoCode = event?.dialCode;
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

  disableCountrySelector() {
    var telInputmobileNumber = this.document.querySelector(
      '.tel-input-uae .country-selector'
    );
    telInputmobileNumber.setAttribute('disabled', 'true');
  }

  removeAutocompleteFocus() {
    let element = this.document.querySelector('.mat-autocomplete-panel');
    if (element) {
      element.parentNode.removeChild(element);
    }
  }
}
