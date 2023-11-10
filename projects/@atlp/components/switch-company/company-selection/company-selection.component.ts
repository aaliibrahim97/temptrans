import { Component, OnInit } from '@angular/core';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'sc-company-selection',
  templateUrl: './company-selection.component.html',
  styleUrls: ['./company-selection.component.scss'],
})
export class CompanySelectionComponent implements OnInit {
  selectedLanguage: string = 'en';
  companyDetails: any;
  companyarray: any;
  Sidebar = SidebarName;
  selectedCompany: any;
  userPreferredCompany: any;
  individualOrganizationId: any;
  selectedCustomerType: string;
  companyPreferencedetails: any;
  constructor(
    private _iconsService: IconsService,
    public atlpTranslationService: AtlpTranslationService,
    public atlpSidebarService: AtlpSidebarV2Service,
    private userInfoService: UserInfoService,
    private atlpPortalBridge: AtlpPortalBridgeService,
    private envService: AtlpEnvService,
    public contactsService: ContactsService,
    private defaultSnakBar: SnakBarService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        const currentCompanyID = localStorage.getItem('selectedCompanyID');
        let userInfo = this.userInfoService.getUserInfoDetails();
        let userInfoDetails = userInfo?.data;
        this.contactsService
          .getSaveduserPreference(userInfoDetails?.id)
          .subscribe((res) => {
            if (res && res.success && res?.data) {
              this.companyPreferencedetails = res?.data;
              this.userPreferredCompany =
                this.companyPreferencedetails?.PrefferedCompanyOrganizationId;
            }
          });
        this.individualOrganizationId = userInfo?.data?.organizations.filter(
          (x) => x.profiles.find((y) => y.code.toUpperCase() == 'INDIVIDUAL')
        )[0]?.id;
        this.companyDetails = userInfo?.data?.organizations?.filter(
          (x) => x?.contactType?.toUpperCase() !== 'INDIVIDUAL'
        );
        if (
          this.individualOrganizationId &&
          currentCompanyID &&
          this.individualOrganizationId == currentCompanyID
        ) {
          this.selectedCustomerType = 'Individual';
        } else {
          this.selectedCustomerType = 'Company';
        }
        this.companySelection();
      }
    });
  }

  companySelection() {
    this.companyarray = this?.companyDetails?.filter(
      (x) => x.status.toUpperCase() === 'APPROVED'
    );
    if (this.companyarray?.length > 0) {
      this.selectedCompany = localStorage.getItem('selectedCompanyID');
    }
  }

  closeCompanySelection() {
    this.atlpSidebarService.getSidebar(this.Sidebar.switchCompany).toggleOpen();
  }

  setSelectedCompany() {
    let model = new UserPreferenceModel();
    model.CurrentCompanyOrganizationId = this.selectedCompany;
    model.CurrentCompanyUcid = this.companyarray.filter(
      (i) => i.id == this.selectedCompany
    )[0]?.ucid;
    model.PrefferedCompanyOrganizationId = this.userPreferredCompany;
    model.PrefferedCompanyUcid = this.companyarray.filter(
      (i) => i.id == this.userPreferredCompany
    )[0]?.ucid;
    if (this.selectedCompany) {
      localStorage.setItem('selectedCompanyID', this.selectedCompany);
    }
    this.setPreferredCompany(model);
  }

  reloadBasedOnCustomerType() {
    localStorage.removeItem('SelectedCompanyDetails');
    this.atlpPortalBridge.selectedCompanyChanged.next('changed');
    if (this.selectedCustomerType == 'Company') {
      window.location.reload();
    } else {
      this.navigateToLanding();
    }
  }

  navigateToLanding() {
    if (this.selectedLanguage == 'en') {
      document.location.href =
        this.envService.landingBaseUrl +
        (document.location.href.toLowerCase().includes('/profile')
          ? 'dashboard'
          : 'dashboard/profile');
    } else {
      document.location.href =
        this.envService.landingBaseUrl.replace('/EN/', `/AR/`) +
        (document.location.href.toLowerCase().includes('/profile')
          ? 'dashboard'
          : 'dashboard/profile');
    }
    this.closeCompanySelection();
  }

  setPreferredCompany(model: any) {
    const userInfo = this.userInfoService.getUserInfoDetails();
    let userInfoDetails = userInfo?.data;
    model.contactId = userInfoDetails?.id;
    this.contactsService.postCompanyPreference(model).subscribe(
      (data: any) => {
        this.reloadBasedOnCustomerType();
      },
      (error: any) => {
        this.reloadBasedOnCustomerType();
        const errorMsg =
          error?.error?.errorlst && error?.error?.errorlst.length
            ? this.processErrors(error?.error?.errorlst)
            : error?.error?.msg;
        this.defaultSnakBar.error(errorMsg);
      }
    );
  }

  onCompanyChange(event) {
    this.selectedCompany = event;
  }

  preferredCompanyChange(event) {
    if (event?.checked) {
      this.userPreferredCompany = this.selectedCompany;
    } else {
      this.userPreferredCompany = '';
    }
  }

  processErrors(errorList) {
    let concatenatedErrorMessage = '';
    errorList?.forEach((val) => {
      if (val.value != null && val.value != '') {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error + '(' + val.value + ')') +
          ' ,';
      } else {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error) + ' ,';
      }
    });
    return concatenatedErrorMessage?.substring(
      0,
      concatenatedErrorMessage.length - 1
    );
  }

  onSelectCustomerType(event) {
    this.selectedCustomerType = event?.value;
    if (event?.value == 'Individual') {
      this.selectedCompany = this.individualOrganizationId;
    } else if (event?.value == 'Company') {
      this.selectedCompany = this.userPreferredCompany
        ? this.userPreferredCompany
        : this.companyarray[0]?.id;
    }
  }

  private get icons(): Array<string> {
    return ['switch-user', 'check-square-offset-fill', 'warning-circle-fill'];
  }
}

export class UserPreferenceModel {
  CurrentCompanyUcid: string;
  CurrentCompanyOrganizationId: string;
  PrefferedCompanyUcid: string;
  PrefferedCompanyOrganizationId: string;
}
