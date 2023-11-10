import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AvatarsState } from './enums';
import { ISettingsAvatar, IUserData } from './interfaces';
import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import {
  AtlpPortalBridgeService,
  AtlpPortalTemplateType,
} from 'projects/@atlp/services/atlp-portal-bridge.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { RolesEnum } from 'projects/@atlp/core/enums/roles.enum';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'atlp-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
})
export class AvatarsComponent implements OnInit, AfterViewInit {
  Sidebar = SidebarName;
  lang: any = '';
  userData: IUserData = {
    firstName: '',
    lastName: '',
    imgUrl: '',
    CompanyName: '',
  };
  @Input()
  set setUserData(userData: IUserData) {
    this.userData = userData;
  }
  @Input() settingsAvatar: ISettingsAvatar;
  app: string;
  portal$: Observable<AtlpPortalTemplateType>;
  companySwitch$: Observable<AtlpPortalTemplateType>;
  companyInfo$: Observable<AtlpPortalTemplateType>;
  userInfoDetails: any;
  showSwitchCompany: boolean = true;
  isIndividual = false;

  constructor(
    public atplSidebarService: AtlpSidebarService,
    public atplSidebarv2Service: AtlpSidebarV2Service,
    private _atlpConfigService: AtlpConfigService,
    private router: Router,
    private atlptranslationService: AtlpTranslationService,
    private envservice: AtlpEnvService,
    private _iconsService: IconsService,
    private userInfoService: UserInfoService,
    @Inject(DOCUMENT) private document: Document,
    private changeDetectRef: ChangeDetectorRef,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    public portalBridge: AtlpPortalBridgeService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.app = _atlpConfigService._app;
  }

  ngOnInit(): void {
    this.atlptranslationService.getCurrentLanguage().subscribe((lang) => {
      this.lang = lang;
    });
    this.portal$ = this.portalBridge.atlpPortal$;
    this.companySwitch$ = this.portalBridge.companySwitch$;
    this.companyInfo$ = this.portalBridge.companyInfo$;
    this.companySwitch$.subscribe((res) => {
      if (res) {
        this.showSwitchCompany = false;
      } else {
        if (
          this.userInfoDetails &&
          this.userInfoDetails?.data?.organizations &&
          this.userInfoDetails?.data?.organizations?.length == 1
        ) {
          if (
            this.userInfoDetails?.data?.organizations[0]?.contactType ==
            'Individual'
          ) {
            this.showSwitchCompany = false;
          }
        } else {
          this.showSwitchCompany = true;
        }
      }
    });
    this.portalBridge.selectedCompanyChanged.subscribe((res) => {
      if (res == 'changed') {
        const selectedCompanyID = localStorage.getItem('selectedCompanyID');

        let indOrg = this.userInfoDetails?.data?.organizations.filter(
          (x) => x.id == selectedCompanyID && x.contactType == 'Individual'
        );

        if (indOrg.length > 0) {
          this.isIndividual = true;
        } else {
          this.isIndividual = false;
        }
      }
    });
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.userInfoDetails = this.userInfoService.getUserInfoDetails();
        const selectedCompanyID = localStorage.getItem('selectedCompanyID');

        let indOrg = this.userInfoDetails?.data?.organizations.filter(
          (x) => x.id == selectedCompanyID && x.contactType == 'Individual'
        );

        if (indOrg.length > 0) {
          this.isIndividual = true;
        } else {
          this.isIndividual = false;
        }
        if (
          this.userInfoDetails &&
          this.userInfoDetails?.data?.organizations &&
          this.userInfoDetails?.data?.organizations?.length == 1
        ) {
          if (
            this.userInfoDetails?.data?.organizations[0]?.contactType ==
            'Individual'
          ) {
            this.showSwitchCompany = false;
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // this.userInfoDetails = this.userInfoService.getUserInfoDetails();
  }

  get searchRequiredAvatar(): string {
    // checking for the existence of passed parameters
    if (
      !this._checkExistence(this.userData) &&
      !this._checkExistence(this.settingsAvatar)
    ) {
      return AvatarsState.DEFAULT;
    }

    // check for the presence of an image
    if (this._checkExistence(this.userData.imgUrl)) {
      return AvatarsState.PHOTO;
    }
    // check for availability firstName and lastName
    if (this._checkExistenceFirstLastName()) {
      return AvatarsState.INITIAL;
    }

    // default fallback
    return AvatarsState.DEFAULT;
  }

  logOut(): void {
    // localStorage.clear();
    this.authService.logout();
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  get initial(): string {
    if (!this._checkExistenceFirstLastName()) {
      return 'AA';
    }
    return this.userData.firstName[0] + this.userData.lastName[0];
  }

  private _checkExistence(value): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  openIndDashboard() {
    if (this.lang == 'en') {
      this.document.location.href =
        this.envservice.landingBaseUrl +
        (this.document.location.href.toLowerCase().includes('/profile')
          ? 'dashboard'
          : 'dashboard/profile');
    } else {
      this.document.location.href =
        this.envservice.landingBaseUrl.replace('/EN/', `/AR/`) +
        (this.document.location.href.toLowerCase().includes('/profile')
          ? 'dashboard'
          : 'dashboard/profile');
    }
    // this.router.navigate(['dashboard', 'Individual']);
  }

  private _checkExistenceFirstLastName(): boolean {
    return (
      this._checkExistence(this.userData.firstName) &&
      this._checkExistence(this.userData.lastName)
    );
  }

  private get icons(): Array<string> {
    return [
      'logout',
      'profile-svg',
      'switch-user',
      'ed test',
      'profile-view',
      'User-management',
      'Settings icon',
    ];
  }

  showManageAccount() {
    return this.envservice.enableManageCompany;
  }

  showUM(): boolean {
    if (this.envservice.isShowUserManagement) {
      let internalRoles = [];
      const selectedCompanyID = localStorage.getItem('selectedCompanyID');
      let selectedOrg = this.userInfoDetails?.data?.organizations?.filter(
        (company: any) => company?.id == selectedCompanyID
      );
      if (selectedOrg && selectedOrg?.length > 0) {
        selectedOrg.forEach((x) => {
          internalRoles = x.contactRoles.filter(
            (role) =>
              role.code == RolesEnum.L2Admin || role.code == RolesEnum.AASA
          );
        });
        if (internalRoles && internalRoles.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return false;
  }

  goToUrl(): void {
    let url = this.envservice.userManagementURL;
    if (!url) return;

    if (['ae', 'ar'].includes(this.lang.toLowerCase())) {
      url = url.replace('/en/', '/ar/').replace('/EN/', '/AR/');
    }

    window.open(url, '_self');
  }

  swicthCompany() {
    this.atplSidebarv2Service
      .getSidebar(this.Sidebar.switchCompany)
      .toggleOpen();
  }

  manageAccount(url) {
    this.router.navigateByUrl(url);
  }
}
