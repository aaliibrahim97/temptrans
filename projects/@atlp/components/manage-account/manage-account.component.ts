import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { ISettingsAvatar } from 'projects/@atlp/lib/atlp-layout/components/header/avatars/interfaces';
import { EmiratesPipe } from 'projects/@atlp/pipes/emirates-pipe';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import {
  AtlpPortalBridgeService,
  IHeaderDetails,
} from 'projects/@atlp/services/atlp-portal-bridge.service';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { MainLookUpService } from 'projects/@atlp/services/mainlookup.service';
import { ManageAccountService } from 'projects/@atlp/services/manage-account.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { forkJoin } from 'rxjs';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent implements OnInit, OnDestroy {
  selectedLanguage: string = 'en';
  OtherLanguage: string = 'en';
  userInfo: any;
  imgUrl: any;
  contactDetails: any;
  submission: any;
  licenseType: any;
  CountryName: any;
  licenseTypes: any[];
  countiresList: any[];
  Sidebar = SidebarName;
  selectedCompany: any;
  companyDetails: any;
  vatDetails: any;
  Profiles: any;
  vatCategories: any = [];
  contactImgUrl: any = '';
  documentType: any = '';
  ContactID: any;
  SidebarName = SidebarName;
  settingsAvatar: ISettingsAvatar = {
    round: true,
    size: 'x-large',
  };
  contactType: any;
  constructor(
    private _iconsService: IconsService,
    public atlpTranslationService: AtlpTranslationService,
    public atlpSidebarService: AtlpSidebarService,
    private ngxService: NgxUiLoaderService,
    private manageAccountService: ManageAccountService,
    private mainLookUpService: MainLookUpService,
    private userInfoService: UserInfoService,
    private changeDetectRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private fileUploadservice: FileUploadService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    public contactsService: ContactsService,
    public _atlpPortalBridgeService: AtlpPortalBridgeService,
    private translate: TranslateService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      if (lang == 'en') {
        this.selectedLanguage = 'en-US';
        this.OtherLanguage = 'ar-AE';
      } else {
        this.selectedLanguage = 'ar-AE';
        this.OtherLanguage = 'en-US';
      }
    });
    this.manageAccountService.onAccountDetailsUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.populateManageCompanyData();
      }
    });
    this.populateManageCompanyData();
  }

  setHeaderDetails(label) {
    const fileName = label != '' ? this.translate.instant(label) : '';
    let headerObj: IHeaderDetails = {
      logo: {
        svgIcon: '',
        customClass: '',
      },
      title: fileName,
    };
    this._atlpPortalBridgeService.setHeaderDetails(headerObj);
  }

  ngAfterViewInit() {
    this.setHeaderDetails('ManageAccount');
  }

  getAllLookups() {
    this.ngxService.start();
    forkJoin([
      this.manageAccountService.mapMainLookUpResponse(
        this.mainLookUpService.getVATCategories()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainLookUpService.getCountries()
      ),
      this.manageAccountService.mapMainLookUpResponse(
        this.mainLookUpService.getLicenseTypes()
      ),
    ]).subscribe((res) => {
      this.ngxService.start();
      this.vatCategories = res[0];
      this.countiresList = res[1];
      this.licenseTypes = res[2];
      this.CountryName = this.countiresList?.filter(
        (country) => country.name == this.companyDetails?.country
      )[0]?.description;
      this.changeDetectRef.detectChanges();
      this.licenseType = this.licenseTypes?.filter(
        (type) => type.name == this.companyDetails?.licenseType
      )[0]?.description;
      this.changeDetectRef.detectChanges();
      this.vatDetails = this.vatCategories?.filter(
        (type) => type.name == this.companyDetails?.vatCategory
      )[0];
      this.changeDetectRef.detectChanges();
      this.ngxService.stop();
    });
  }
  getConcatctDetails() {
    this.ContactID = this.userInfoService.getUserInfoDetails()?.data?.id;
    this.manageAccountService
      .getProfile(this.ContactID, localStorage.getItem('selectedCompanyID'))
      .subscribe((profile: any) => {
        if (profile) {
          this.contactType = profile?.data?.contactType;
        }
      });
    this.manageAccountService
      .getSubmission(this.ContactID, localStorage.getItem('selectedCompanyID'))
      .subscribe((submission: any) => {
        if (submission) {
          this.contactDetails = submission?.data?.data?.contact?.filter(
            (c) => c.id == this.ContactID
          )[0];
          var eidpipe = new EmiratesPipe();
          if (this.contactDetails.idType == 'EID')
            this.contactDetails.personalIdNo = eidpipe.transform(
              this.contactDetails.personalIdNo
            );

          this.contactDetails.mobileNumber =
            this.contactDetails.mobileNumber.split(
              this.contactDetails.mobileNumberCode
            )[1];

          this.imgUrl = submission?.data?.data?.documentList
            ?.filter((m) => m.documentType == 'IOPROFILE')[0]
            ?.links?.download?.replace(' ', '')
            .trim();
          this.contactImgUrl = submission?.data?.data?.documentList
            ?.filter((m) => m.documentType == 'PROFILE')[0]
            ?.links?.download?.replace(' ', '')
            .trim();
          console.log(submission);
        }
      });
  }
  populateManageCompanyData() {
    this.ngxService.start();
    this.getConcatctDetails();
    let selectedOrgId = localStorage.getItem('selectedCompanyID');
    if (selectedOrgId) {
      this.manageAccountService
        .getOrganizationDetails(selectedOrgId)
        .subscribe((res: any) => {
          if (res) {
            this.ngxService.start();
            this.companyDetails = res.data;
            console.log(this.companyDetails);
            this.Profiles = this.companyDetails.profiles
              .slice(0, 5)
              .map((m) => ' ' + m.name[this.selectedLanguage] + ' ');
            this.getAllLookups();
          }
        });
    }
  }
  getlogo(url) {
    if (url) {
      this.fileUploadservice.downloadFile(url).subscribe((res) => {
        this.fileUploadservice.toBase64(res).subscribe((blob) => {
          //this.contactImgUrl = blob;
        });
      });
    }
  }
  ngOnDestroy(): void {
    // this.setHeaderDetails('');
  }

  openSideBar(key: string) {
    switch (key) {
      case SidebarName.mcCompanyAddress:
        this.manageAccountService.openMCCompanyAddress.next('opened');
        break;
      case SidebarName.mcVatInfo:
        this.manageAccountService.openMCVatInfo.next('opened');
        break;
      case SidebarName.mcTradeLicenseInfo:
        this.manageAccountService.openMCTradeLicenseInfo.next('opened');
        break;
    }
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
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
      'icon-close-black',
      'icon-search',
    ];
  }
}
