import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';

import { Subject } from 'rxjs';
import { AtlpMenuService } from '../../services/atlp-menu.service';
import { INavigationSidebarData } from '../../models/INavigationSidebarData';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { ITokenParseModel } from 'projects/@atlp/auth/interfaces/ITokenParseModel';
import { atlpMenuLocaleEn as navigationEnglish } from '../../i18n/en';
import { atlpMenuLocaleAr as navigationArabic } from '../../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { DOCUMENT } from '@angular/common';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';
import { AirMenuService, AirUser } from '../../services/air-menu.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';

@Component({
  selector: 'atlp-navigation-sidebar-menu',
  templateUrl: './navigation-sidebar-menu.component.html',
  styleUrls: ['./navigation-sidebar-menu.component.scss'],
})
export class AtlpNavigationSidebarMenuComponent implements OnInit, OnDestroy {
  @Output() data = new EventEmitter();
  SidebarName = SidebarName;
  dataField: INavigationSidebarData[] = [];
  templateListContent: [];
  templateListSwitch: boolean;
  activeContentSecondField: boolean;
  currentContent: any;
  nameCheckedTItle: string;
  userInfo: any;
  dashboardStatus: boolean;
  show: number;
  lang: string;
  airUser: AirUser;
  private _destroyAll$ = new Subject();

  constructor(
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private router: Router,
    private atlpMenuService: AtlpMenuService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private atlpTranslationService: AtlpTranslationService,
    @Inject(DOCUMENT) private document: Document,
    private atlpPortalBridgeService: AtlpPortalBridgeService,
    private envService: AtlpEnvService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    private airrMenuService: AirMenuService,
    private userInfoService: UserInfoService,
    private defaultSnakBar: SnakBarService,
    private translate: TranslateService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.nameCheckedTItle = 'Select Dashboard';
    this.dashboardStatus = false;
    this.show = 6;
    this.atlpMenuService.navigationFieldMenuOnChange$.subscribe((menu) => {
      const navMenus = this.createNavMenus(menu);
      this.dataField = navMenus;
    });
  }

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.atlpTranslationService.setDefaultLanguageSettings(
        localStorage.getItem('selectedLang') || 'en',
        navigationEnglish,
        navigationArabic
      );
      this.lang = lang;
    });
    this.activeDashboard(this.dataField);
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.airUser = this.airrMenuService.getAirUserType();
      }
    });
  }

  onMenuItemClick() {
    this.userInfo = this.authService.userDataFromToken();
    if (this.userInfo) {
      if (!this.userInfo.pcsTkn) {
        this.document.location.href = this.envService.loginUrl;
      }
    } else {
      this.document.location.href = this.envService.loginUrl;
    }
  }

  switchWorkingField(id: number, data): void {
    data.forEach((item) => {
      if (id === item.id) {
        if (item.active === true && data === this.dataField) {
          item.active = false;
          this.templateListSwitch = false;
          //this.unsetSubfield();
          this.dashboardStatus = false;
          this.activeDashboard(data);
        } else {
          item.active = true;
          this.templateListContent = item.list;
          this.nameCheckedTItle = item.workingName;
          this.dashboardStatus = true;
          if (data === this.dataField) {
            this.templateListSwitch = true;
          }
        }
        this.unsetActive(item);
      }
    });
  }

  /**
   * Activited current Field
   * @param id type number
   * @param data data Array
   */
  switchWorkingSubfield(id: number, data): void {
    data.forEach((item) => {
      if (id === item.id) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }

  activeDashboard(data): void {
    let countOpen = 0;
    data.forEach((item) => {
      if (item.active) {
        countOpen += 1;
      }
    });
    if (countOpen > 0) {
      this.dashboardStatus = true;
    }
  }

  unsetActive(data): void {
    data.list.forEach((item) => {
      item.active = false;
    });
  }

  lessShow(): void {
    this.show = 6;
  }

  openSideBar(key: string) {
    if (key == 'questionnaire') {
      this.atlpPortalBridgeService.openQuestionaire.next('opened');
    } else {
      if (key == 'josoor') {
        this.atlpPortalBridgeService.openJosoor.next('opened');
      }
      this.toggleV2SidebarOpen(key);
      this.toggleSidebarClose(SidebarName.navigationSidebarMenu);
    }
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleSidebarClose(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
    if (
      this._atplSidebarService.getSidebar(SidebarName.navigationSidebarContent)
        .opened
    ) {
      this._atplSidebarService
        .getSidebar(SidebarName.navigationSidebarContent)
        .toggleOpen();
    }
  }

  openSidebarWithData(key: string, data): void {
    if (!data) {
      return;
    }
    this.data.emit(data);
    if (
      !this._atplSidebarService.getSidebar(SidebarName.navigationSidebarContent)
        .opened
    ) {
      this.toggleSidebarOpen(key);
    }
  }

  navigateTo(item?: any) {
    if (
      this._atplSidebarService.getSidebar(SidebarName.navigationSidebarContent)
        .opened
    ) {
      this._atplSidebarService
        .getSidebar(SidebarName.navigationSidebarContent)
        .toggleOpen();
    }
    if (
      this._atplSidebarService.getSidebar(SidebarName.navigationSidebarMenu)
        .opened
    ) {
      this._atplSidebarService
        .getSidebar(SidebarName.navigationSidebarMenu)
        .toggleOpen();
    }
    if (!item?.isLink) {
      switch (item?.url) {
        case 'DashboardViewerURL': {
          window.location.href = constructURLBasedOnLang(
            this.lang,
            this.envService.DashboardViewerURL
          );
          break;
        }
        case 'AirFreightRegistrationUrl': {
          window.location.href = this.envService.AirFreightRegistrationUrl;
          break;
        }
        default: {
          window.location.href = item?.url;
          break;
        }
      }
    } else if (item?.isProfileInfoRequired) {
      this.atlpMenuService.onServiceClick(item);
    } else {
      window.location.href = item?.url;
    }
  }

  // Create Nav Menu for logged in user
  createNavMenus(menu) {
    const userData: ITokenParseModel = this.authService.userDataFromToken();

    return menu?.map((e) => {
      if (e?.id === 'AirNavSection') {
        return {
          ...e,
          list: this.getList(
            e.list,
            userData?.companyCode,
            userData?.IsPCSSuperUser
          ),
        };
      }

      return e;
    });
  }

  getList(list, companyCode, isPCSSuperUser) {
    //Keeping this commented code for reference of the company codes used earlier
    // if (
    //   companyCode === 'PCSEXP113' ||
    //   isPCSSuperUser === 'True' ||
    //   companyCode === 'REG05012'
    // )
    if (this.airUser == AirUser.SDUser) {
      return list.filter((e) => {
        return e.permission.length === 0 || e?.permission?.indexOf('PO') > -1;
      });
    } else if (this.airUser == AirUser.SPUser) {
      return list.filter((e) => {
        return e.permission.length === 0;
      });
    } else if (this.airUser == AirUser.POUser) {
      return list.filter((e) => {
        return e.permission.length > 0 && e?.permission?.indexOf('PO') > -1;
      });
    } else {
      if (this.airUser == AirUser.FFUser) {
        return list.filter((e) => {
          return e.permission.length > 0 && e?.permission?.indexOf('FF') > -1;
        });
      }
    }
  }

  private get icons(): Array<string> {
    return [
      'Informational-services-nav-icon',
      'wrc-nav-icon',
      'financial-services',
      'registration-licensing',
      'agency-protections',
      'storehouses',
      'warehouse-licensing',
      'flight-calendar-nav-icon',
      'imports-nav-icon',
      'exports-nav-icon',
      'shared-nav-icon',
      'economic-nav-icon',
      'inspection',
      'back-arrow',
      'sea-nav-icon',
      'default-icon-menu',
      'air-nav-icon',
      'land-nav-icon',
      'icon-nav-transit-booking',
      'customs-nav-icon',
      'regulatory-nav-icon',
      'economic-nav-icon',
      'shared-nav-icon',
      'railway-nav-icon',
      'customs-clearence',
      'navigation-dashboard',
      'navigation-dashboard-active',
      'close-white-icon',
      'map-icon',
      'user-fill',
      'nav-configuration-icon',
      'nav-rfs-management-icon',
      'nav-notifications-icon',
      'icon-bI-reports',
      'icon-nav-cargo-logistics',
      'icon-roro-appointment',
      'icon-nav-inspection',
      'icon-nav-manage-alert',
      'icon-nav-registration-request',
      'icon-nav-support-tool',
      'icon-nav-vessel-registration',
      'subscription',
      'nav-non-cargo-vehicle-entry-icon',
      'icon-nav-financial-services',
      'icon-nav-hse',
      'adeg-icon',
      'icon-nav-dls',
      'icon-employee-services',
      'icon-establishment-card',
      'icon-health-insurance',
      'icon-invoices',
      'icon-noc-service-requests',
      'icon-properties',
      'icon-receipts',
      'icon-wrc',
      'wrc-nav-icon',
      'icon-epass',
      'storehouses',
      'registration-licensing',
      'ship',
      'customs-clearence',
      'agency-protections',
      'info-icon',
      'invoice',
      'settings icon',
      'inspection',
      'gear-yellow',
      'info-icon',
      'truck',
      'calendar-date-svg',
      'icon-nav-information-service',
      'icon-nav-appointment',
      'icon-nav-mlms',
      'icon-nav-mpay',
      'icon-nav-truck-appointments',
      'icon-nav-establishment-card',
      'icon-business',
      'icon-nav-unified-registration',
      'icon-nav-josoor-logo',
      'icon-nav-i&c',
      'icon-track-&-trace',
      'Informational-services-nav-icon',
      'icon-nav-tenant-services',
      '',
    ];
  }

  ngOnDestroy(): void {
    this._destroyAll$.next();
    this._destroyAll$.complete();
  }
}

export function constructURLBasedOnLang(lang: string, url: string) {
  return lang == 'en'
    ? url
    : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
}
