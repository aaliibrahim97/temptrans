import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { MenuData } from '../menu-data-provider/menu-nav-list';
import {
  INavigationListData,
  MenuContentList,
} from '../models/INavigationListData';
import { INavigationSidebarData } from '../models/INavigationSidebarData';
import { INavigationSidebarList } from '../models/INavigationSidebarList';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { PCSSubModuleMenuService } from 'projects/@atlp/services/pcs-submodule-menu.service';
import { DashboardService } from 'projects/@atlp/services/dashboard.service';
import { AnnouncementService } from 'projects/@atlp/services/announcement.service';
import { MainLookUpService } from 'projects/@atlp/services/mainlookup.service';
import { map } from 'rxjs/operators';
import { IndividualMenuData } from '../menu-data-provider/individual-menu-nav-list';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';
export type atlpNavigationTypes =
  | INavigationSidebarList
  | INavigationListData
  | INavigationSidebarData
  | MenuContentList;

export type atlpNavigationListTypes =
  | INavigationSidebarList[]
  | INavigationListData[]
  | INavigationListData[]
  | MenuContentList[];

export enum atlpMenuLevels {
  mainContent,
  list,
  content,
  menuContentList,
}

@Injectable({
  providedIn: 'root',
})
export class AtlpMenuService {
  lang: any;
  navigation_field_data_menu: INavigationSidebarData[] = [];
  navigationFieldMenuOnChange$ = new BehaviorSubject<INavigationSidebarData[]>(
    []
  );
  menuTranslations: any;
  isFZTruckAppointment: boolean = false;

  constructor(
    private envService: AtlpEnvService,
    private atlptranslationService: AtlpTranslationService,
    private userInfoService: UserInfoService,
    private pcssubModuleMenuService: PCSSubModuleMenuService,
    private dashboardService: DashboardService,
    private announcementService: AnnouncementService,
    private mainlookupservice: MainLookUpService,
    private defaultSnakBar: SnakBarService,
    private translate: TranslateService
  ) {
    this.atlptranslationService.getCurrentLanguage().subscribe((lang) => {
      this.lang = lang;
    });
    this.processCompleteMenu();
  }

  processCompleteMenu() {
    this.pcssubModuleMenuService.enableTruckAppointmentMenu.subscribe((res) => {
      if (res == 'yes') {
        this.isFZTruckAppointment = true;
        this.fzTruckAppointmentMenu();
      }
    });
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        let selectedCompanyID = localStorage.getItem('selectedCompanyID');
        let organizations = this.userInfoService.getAllOrganizations();
        if (organizations && organizations?.length > 0) {
          if (
            organizations.filter(
              (org) =>
                org?.id == selectedCompanyID && org.contactType == 'Individual'
            )?.length > 0
          ) {
            this.hideAtlpLandingMenuForSignedupUser();
          } else {
            this.navigation_field_data_menu = MenuData(
              this.lang,
              this.envService
            );
            if (this.lang == 'ae') {
              this.navigation_field_data_menu.forEach((item, index) => {
                if (item.id == 'ADPHSE') {
                  this.navigation_field_data_menu.splice(index, 1);
                  return;
                }
              });
            }
            this.processForABIARole();
            this.fzTruckAppointmentMenu();
            this.processPCSMenu();
            if (this.envService.enableJosoor) {
              this.processJosoorMenu();
            } else {
              this.navigation_field_data_menu.forEach((x, index) => {
                if (x.id == 'Josoor') {
                  this.navigation_field_data_menu.splice(index, 1);
                }
              });
              this.navigationFieldMenuOnChange$.next(
                this.navigation_field_data_menu
              );
            }
            const announcementStatus =
              localStorage.getItem('show-announcement');
            if (announcementStatus != 'show') {
              localStorage.setItem('show-announcement', 'show');
              this.announcementService.userAnnouncement();
            }
            this.processDashboardMenu();
          }
        }
      }
    });
  }

  processPCSMenu() {
    let PCSMenu = this.pcssubModuleMenuService.GetPCSFinalJSON();
    this.navigation_field_data_menu.unshift(PCSMenu);

    this.navigationFieldMenuOnChange$.next(this.navigation_field_data_menu);
  }

  processDashboardMenu() {
    if (localStorage.getItem('selectedCompanyID')) {
      this.dashboardService.getDashboardAccess('All').subscribe((res) => {
        if (res && res?.data && res?.data?.length > 0) {
          let currentMenuData = this.getCurrentMenuData();
          const menuExist = currentMenuData.filter(
            (menu) => menu.id == 'Dashboard'
          );
          if (menuExist && menuExist.length == 0) {
            let menuData = {
              id: 'Dashboard',
              iconName: 'navigation-dashboard',
              workingName: 'DASHBOARD',
              active: false,
              translate: 'MENU_DASHBOARD',
              isLink: true,
              url: this.constructURLBasedOnLang(
                this.lang,
                this.envService.DashboardViewerURL
              ),
            };
            this.navigation_field_data_menu.unshift(menuData);
            this.navigationFieldMenuOnChange$.next(
              this.navigation_field_data_menu
            );
          }
        }
      });
    }
  }

  processJosoorMenu() {
    let userInfo = this.userInfoService.getuserOrganization();
    let kezadBU =
      userInfo &&
      userInfo?.businessUnits?.filter(
        (bu: any) => bu?.code == 'BU-122-6015' || bu?.code == 'BU-122-6014'
      );
    let kezadRoles =
      userInfo &&
      userInfo?.contactRoles?.filter(
        (role: any) => role?.code == 'AUTHCON' || role?.code == 'FP'
      );

    if (kezadBU?.length == 0) {
      this.navigation_field_data_menu.forEach((x, index) => {
        if (x.id == 'Josoor') {
          this.navigation_field_data_menu.splice(index, 1);
        }
      });
      this.navigationFieldMenuOnChange$.next(this.navigation_field_data_menu);
    }
  }

  getCurrentMenuData(): INavigationSidebarData[] {
    return [...this.navigation_field_data_menu];
  }

  overrideAtlpMenu(menuConfig: INavigationSidebarData[]) {
    this.navigation_field_data_menu = [...menuConfig];
    this.navigationFieldMenuOnChange$.next([...menuConfig]);
  }

  updateAtlpMenuById(
    mainMenuId: string,
    menuObjToReplace: atlpNavigationTypes,
    levelToReplace: atlpMenuLevels,
    listId?: string,
    contentId?: string,
    menuContentListId?: string
  ): void {
    let new_navigation_field_data_menu: INavigationSidebarData[] = [
      ...this.navigation_field_data_menu,
    ];
    let mainMenuIndex = new_navigation_field_data_menu.findIndex((item) => {
      return item.id.toLocaleLowerCase() == mainMenuId.toLocaleLowerCase();
    });

    switch (levelToReplace) {
      case atlpMenuLevels.mainContent: {
        new_navigation_field_data_menu[mainMenuIndex] =
          menuObjToReplace as INavigationSidebarData;
        break;
      }
      case atlpMenuLevels.list: {
        let childMenuListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list,
          listId
        );
        new_navigation_field_data_menu[mainMenuIndex].list[childMenuListIndex] =
          menuObjToReplace as INavigationSidebarList;
        break;
      }
      case atlpMenuLevels.content: {
        let childMenuListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list,
          listId
        );
        let childMenuContentIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list[childMenuListIndex]
            .content,
          contentId
        );
        new_navigation_field_data_menu[mainMenuIndex].list[
          childMenuListIndex
        ].content[childMenuContentIndex] =
          menuObjToReplace as INavigationListData;
        break;
      }
      case atlpMenuLevels.menuContentList:
        let childMenuListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list,
          listId
        );
        let childMenuContentIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list[childMenuListIndex]
            .content,
          contentId
        );
        let childMenuContentListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list[childMenuListIndex]
            .content[childMenuContentIndex].menuContentList,
          menuContentListId
        );
        new_navigation_field_data_menu[mainMenuIndex].list[
          childMenuListIndex
        ].content[childMenuContentIndex].menuContentList[
          childMenuContentListIndex
        ] = menuObjToReplace as MenuContentList;
        break;
      default:
        break;
    }
    this.navigation_field_data_menu = [...new_navigation_field_data_menu];
    this.navigationFieldMenuOnChange$.next([...new_navigation_field_data_menu]);
  }

  updateAtlpMenuByList(
    mainMenuId: string,
    menuListToReplace: atlpNavigationListTypes,
    levelToReplace: atlpMenuLevels,
    listId?: string,
    contentId?: string
  ): void {
    let new_navigation_field_data_menu: INavigationSidebarData[] = [
      ...this.navigation_field_data_menu,
    ];
    let mainMenuIndex = new_navigation_field_data_menu.findIndex((item) => {
      return item.id.toLocaleLowerCase() == mainMenuId.toLocaleLowerCase();
    });

    switch (levelToReplace) {
      case atlpMenuLevels.list: {
        new_navigation_field_data_menu[mainMenuIndex].list =
          menuListToReplace as INavigationSidebarList[];
        break;
      }
      case atlpMenuLevels.content: {
        let childMenuListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list,
          listId
        );
        new_navigation_field_data_menu[mainMenuIndex].list[
          childMenuListIndex
        ].content = menuListToReplace as INavigationListData[];
        break;
      }
      case atlpMenuLevels.menuContentList:
        let childMenuListIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list,
          listId
        );
        let childMenuContentIndex = this.getChilMenuIndex(
          new_navigation_field_data_menu[mainMenuIndex].list[childMenuListIndex]
            .content,
          contentId
        );

        new_navigation_field_data_menu[mainMenuIndex].list[
          childMenuListIndex
        ].content[childMenuContentIndex].menuContentList =
          menuListToReplace as MenuContentList[];
        break;
      default:
        break;
    }
    this.navigation_field_data_menu = [...new_navigation_field_data_menu];
    this.navigationFieldMenuOnChange$.next([...new_navigation_field_data_menu]);
  }

  private getChilMenuIndex(list: any[], menuId: string) {
    return list.findIndex((item) => {
      return item.id.toLocaleLowerCase() == menuId.toLocaleLowerCase();
    });
  }

  fzTruckAppointmentMenu() {
    let userInfo = this.userInfoService.getuserOrganization();
    let trcProfile =
      userInfo &&
      userInfo?.profiles?.filter((profile) => profile?.code == 'TRC');
    if (!this.isFZTruckAppointment && trcProfile?.length == 0) {
      this.navigation_field_data_menu.forEach((x, index) => {
        if (x.id == 'economiczoneFZTruckAppoint') {
          this.navigation_field_data_menu.splice(index, 1);
        }
      });
      this.navigationFieldMenuOnChange$.next(this.navigation_field_data_menu);
    }
  }

  processForABIARole() {
    let userInfo = this.userInfoService.getuserOrganization();
    if (userInfo) {
      let roles: any = userInfo.contactRoles.filter(
        (role) =>
          role?.code?.toUpperCase() == 'ABIA' ||
          role?.code?.toUpperCase() == 'ABIAAIR' ||
          role?.code?.toUpperCase() == 'ABIASEA' ||
          role?.code?.toUpperCase() == 'ABIALAND'
      );
      if (roles && roles.length > 0) {
        const menuExist = this.navigation_field_data_menu.filter(
          (menu) => menu?.id == 'ATLP_Dashboard'
        );
        if (menuExist && menuExist.length == 0) {
          let pbimenu = [];
          let distinctpbimenu = [];

          let airMenu = {
            id: 'atlp-air-dashboard',
            iconName: 'air-nav-icon',
            translate: 'ATLP_AIR_Dashboard',
            workingName: 'AIR Dashborad',
            active: false,
            url: '',
            redirectUrl: '',
            redirectUrlSamePage: this.constructURLBasedOnLang(
              this.lang,
              this.envService.AtlpAirDashboard
            ),
          };
          let seaMenu = {
            id: 'atlp-sea-dashboard',
            iconName: 'sea-nav-icon',
            workingName: 'SEA Dashborad',
            translate: 'ATLP_SEA_Dashboard',
            active: false,
            url: '',
            redirectUrl: '',
            redirectUrlSamePage: this.constructURLBasedOnLang(
              this.lang,
              this.envService.AtlpSeaDashboard
            ),
          };
          let landMenu = {
            id: 'atlp-land-dashboard',
            iconName: 'land-nav-icon',
            workingName: 'LAND Dashborad',
            translate: 'ATLP_LAND_Dashboard',
            active: false,
            url: '',
            redirectUrl: '',
            redirectUrlSamePage: this.constructURLBasedOnLang(
              this.lang,
              this.envService.AtlpLandDashboard
            ),
          };
          roles.forEach((role) => {
            switch (role?.code) {
              case 'ABIA':
                pbimenu.push(airMenu);
                pbimenu.push(seaMenu);
                pbimenu.push(landMenu);
                break;
              case 'ABIAAIR':
                pbimenu.push(airMenu);
                break;
              case 'ABIASEA':
                pbimenu.push(seaMenu);
                break;
              case 'ABIALAND':
                pbimenu.push(landMenu);
                break;
            }
          });
          distinctpbimenu = [...new Set(pbimenu)];
          this.navigation_field_data_menu.push({
            id: 'ATLP_Dashboard',
            iconName: 'navigation-dashboard',
            workingName: ' Dashboard',
            active: true,
            translate: 'ATLP_Dashboard',
            list: distinctpbimenu,
          });
          this.overrideAtlpMenu(this.navigation_field_data_menu);
        }
      }
    }
  }

  hideAtlpLandingMenuForSignedupUser(): any {
    let individualQuickLinks = [];
    individualQuickLinks = IndividualMenuData(this.lang, this.envService);
    this.overrideAtlpMenu(individualQuickLinks);
    this.processDashboardMenu();
  }

  onServiceClick(item) {
    this.userInfoService.get().subscribe((res) => {
      if (res && res.data) {
        if (item && item?.isProfileInfoRequired) {
          if (res?.data?.userProfileStatus == 'SUBMITTED')
            window.open(item?.url, '_self');
          else
            this.defaultSnakBar.warning(
              this.translate.instant('Please_Complete_Your_Profile')
            );
        } else {
          window.open(item?.url, '_self');
        }
      }
    });
  }

  processQuickLinksresponse(response): FilterModel[] {
    let quicklinks = response.items.map((rec) => {
      let f = new FilterModel();
      f.name =
        this.lang == 'ar' || this.lang == 'ae'
          ? JSON.parse(
              rec?.metadata?.find((meta) => meta?.metadata_Type === 'Language')
                ?.data
            )?.AR
          : rec?.name;
      f.description = rec?.description;
      f.order = JSON.parse(
        rec?.metadata?.find((meta) => meta?.metadata_Type === 'Other_Info')
          ?.data
      )?.Order;
      f.iconName = JSON.parse(
        rec?.metadata?.find((meta) => meta?.metadata_Type === 'Other_Info')
          ?.data
      )?.IconName;
      f.isProfileInfoRequired = JSON.parse(
        rec?.metadata?.find((meta) => meta?.metadata_Type === 'Other_Info')
          ?.data
      )?.isProfileInfoRequired
        ? JSON.parse(
            rec?.metadata?.find((meta) => meta?.metadata_Type === 'Other_Info')
              ?.data
          )?.isProfileInfoRequired
        : 0;
      f.url =
        this.lang == 'en'
          ? JSON.parse(
              rec.metadata.find((meta) => meta?.metadata_Type === 'Other_Info')
                .data
            )?.URLEN
          : JSON.parse(
              rec.metadata.find((meta) => meta?.metadata_Type === 'Other_Info')
                .data
            )?.URLAR;
      return f;
    });
    return quicklinks?.sort((a, b) => (a?.order < b?.order ? -1 : 1));
  }

  constructURLBasedOnLang(lang: string, url: string) {
    return lang == 'en'
      ? url
      : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
  }
}

class FilterModel {
  name: string;
  description: string;
  url: string;
  icon: string;
  order: number;
  iconName: string;
  isProfileInfoRequired?: number;
}
