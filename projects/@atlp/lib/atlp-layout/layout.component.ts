import { DomPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { AutoLoginGuard } from 'projects/@atlp/auth/guard/auto-login.guard';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { PcsSecurityService } from 'projects/@atlp/auth/pcs-auth/services/pcs-security.service';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { INavigationSidebarData } from 'projects/@atlp/components/atlp-nav-menu/models/INavigationSidebarData';
import { AtlpMenuService } from 'projects/@atlp/components/atlp-nav-menu/services/atlp-menu.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpPerfectScrollbarDirective } from 'projects/@atlp/directives/atlp-perfect-scrollbar/atlp-perfect-scrollbar.directive';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import {
  AtlpScriptLoaderService,
  AtlpScriptsModel,
} from 'projects/@atlp/services/atlp-load-dynamic-script.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { HappinessIndexService } from 'projects/@atlp/services/happiness-index.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { SessionTimeoutService } from 'projects/@atlp/services/session-timeout.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicRoutes } from './dynamic.routes';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';
import { DashboardService } from 'projects/@atlp/services/dashboard.service';
import { IAnnouncementModel } from 'projects/@atlp/components/user-announcement/user-announcement';
import { AnnouncementService } from 'projects/@atlp/services/announcement.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';
import { ThemePreferenceComponent } from 'projects/@atlp/components/theme-preference/theme-preference.component';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  themePageComp = ThemePreferenceComponent;
  @ViewChild(AtlpPerfectScrollbarDirective)
  directiveRef?: AtlpPerfectScrollbarDirective;
  preferenceData: any;
  userInfo: any;
  openFoloatingActions = false;
  atlpConfig: any;
  navigation: INavigationSidebarData[] = [];
  SidebarName = SidebarName;
  selectedLanguage = 'en';
  dataContentMobile: any = [];
  private _unsubscribeAll: Subject<any>;
  isViewLoaded: boolean = false;
  isHappinessIndex: boolean;
  happinessIndexCount: number = 0;
  isOptionshover: boolean = false;
  stopPulse: boolean = false;
  isAdminUser: boolean = false;
  @ViewChild('domPortalContent') domPortalContent: ElementRef<HTMLElement>;
  isSideBarOpen = false;
  constructor(
    private atlpPortalBridge: AtlpPortalBridgeService,
    private _atlpConfigService: AtlpConfigService,
    private atlpMenuService: AtlpMenuService,
    public atlpEnvService: AtlpEnvService,
    private userInfoService: UserInfoService,
    private sessionTimeoutService: SessionTimeoutService,
    public happinessindexservice: HappinessIndexService,
    private PcsSecurityService: PcsSecurityService,
    private atplSidebarService: AtlpSidebarService,
    private atlpSidebarV2Service: AtlpSidebarV2Service,
    private router: Router,
    private renderer: Renderer2,
    private _iconsService: IconsService,
    private contactService: ContactsService,
    private atlpTranslationService: AtlpTranslationService,
    private changeDetectorRef: ChangeDetectorRef,
    private atlpScriptLoaderService: AtlpScriptLoaderService,
    private fileUploadSerice: FileUploadService,
    private dashboardService: DashboardService,
    private announcementService: AnnouncementService,
    private defaultSnakBar: SnakBarService,
    public translateService: TranslateService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    this.router.events.subscribe((val) => {
      this.atlpPortalBridge.setHeaderDetails({});
    });
    this._iconsService.registerIcons(this.icons);
    this.atlpMenuService.navigationFieldMenuOnChange$.subscribe((menu) => {
      this.navigation = menu;
    });
    this._unsubscribeAll = new Subject();
    this.renderer.listen('window', 'click', (e: Event) => {
      const elementToCheck: HTMLElement = e.target as HTMLElement;
      if (
        !document
          .getElementById('atlp-navigation-sidebar-menu')
          ?.contains(elementToCheck) &&
        !document
          .getElementById('atlp-sidebar-content-mobile')
          ?.contains(elementToCheck) &&
        !document
          .getElementById('hamburger-menu-container')
          ?.contains(elementToCheck)
      ) {
        this.clickedOutside();
      }
    });
  }

  getElementById(id: string): any {
    return window.document.getElementById(id);
  }

  ngOnInit(): void {
    this.announcementService.onActionTriggered.subscribe((res: any) => {
      if (res && res?.pageName == 'theme-preference' && res.data == 'accept') {
        if (!res?.selectedTheme) {
          const userInfoDetails =
            this.userInfoService.getUserInfoDetails()?.data;
          this.contactService
            .updateUserTheme(userInfoDetails?.id, 'Dark')
            .subscribe({
              next: (result) => {
                this.defaultSnakBar.success(
                  this.translateService.instant(
                    'Dark_Theme_Preference_Saved_Successfully'
                  )
                );
                this.checkForDashboardRedirection();
              },
              error: (err) => {
                console.log('Theme Changes =>', err);
                this.checkForDashboardRedirection();
              },
            });
        } else {
          this.checkForDashboardRedirection();
        }
      }
    });
    this.userInfo = this.authService.userDataFromToken();
    this.atlpSidebarV2Service.isSideBarOpen$.subscribe(
      (isOpen) => (this.isSideBarOpen = isOpen)
    );

    this.happinessindexservice.happinessIndexCount.subscribe((val) => {
      this.happinessIndexCount = val;
      setTimeout(() => {
        this.stopPulse = true;
        this.changeDetectorRef.detectChanges();
      }, 15000);
    });

    if (this.atlpEnvService.enableSessionTimeout) {
      let token = this.PcsSecurityService?.getToken();
      if (token) {
        this.sessionTimeoutService.sessionTimeout();
      }
    }

    let dynamicRoutes = new DynamicRoutes(this.router);
    dynamicRoutes.processDynamicRoutes();

    // Subscribe to config changes
    this.atlpPortalBridge.switchCompany(null);
    this._atlpConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this.atlpConfig = config;
      });
    //this block is written to make the userinfo call at the earliest before loading any other module

    this.userInfoService.get().subscribe(
      (resp) => {
        this.userInfoService.userInfoResponse = resp;
        this.userInfoService.userInfo = resp;

        this.userInfoService.processUserInfoResponse(resp);
        if (this.atlpEnvService.isShowChat) {
          let USER_DETAILS = resp;
          sessionStorage.setItem('USER_DETAILS', JSON.stringify(USER_DETAILS));
          new Promise<void>((resolve, reject) => {
            console.info('Atlp live chat script loaded successfully...!');
            this.loadLiveChatScript(resolve);
          });
        }

        if (resp?.data?.isInternal) {
          this.isAdminUser = true;
        } else {
          this.isAdminUser = false;
        }
        this.userInfoService.dataUpdated.next('updated');
        this.checkThemePreference();
        this.userInfoService.getImageByContact().subscribe((e) => e);
        if (resp && resp?.data) {
          let userInfo = resp;
          if (userInfo && userInfo?.data && userInfo?.data?.id) {
            this.contactService
              .getSaveduserPreference(userInfo.data.id)
              .subscribe(
                (res) => {
                  let userPreference = res?.data;
                  if (
                    userPreference?.selectedTheme &&
                    userPreference?.selectedTheme != ''
                  ) {
                    this.atlpTranslationService.handleTheamChange(
                      userPreference?.selectedTheme
                    );
                  }
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        }
      },
      (error) => {
        if (this.atlpEnvService.isShowChat) {
          new Promise<void>((resolve, reject) => {
            console.info('Atlp live chat script loaded successfully...!');
            this.loadLiveChatScript(resolve);
          });
        }
        return of({});
      }
    );

    window.addEventListener('scroll', this.scrollEvent, true);
  }

  checkThemePreference() {
    const userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
    this.contactService.getSaveduserPreference(userInfoDetails?.id).subscribe(
      (res) => {
        if (res) {
          this.preferenceData = res?.data;
          if (res && res?.data && !res.data?.selectedTheme) {
            this.openThemePreference();
          } else {
            this.checkForDashboardRedirection();
          }
        } else {
          this.openThemePreference();
        }
      },
      (err) => {}
    );
  }

  openThemePreference() {
    let announcementData: IAnnouncementModel = {
      title: this.translateService.instant('Theme_Preference'),
      message: '',
      template: this.themePageComp,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      pageName: 'theme-preference',
      hideShowIcon: true,
    };
    this.announcementService.openAnnouncemnet(announcementData, '80vw');
  }

  checkForDashboardRedirection() {
    let dashboardUser = localStorage.getItem('isDashboardUser');
    if (dashboardUser != 'Yes') {
      if (localStorage.getItem('show-announcement')) {
        localStorage.removeItem('show-announcement');
      }
      localStorage.setItem('isDashboardUser', 'Yes');
      this.redirectToDashboard();
    }
  }

  redirectToDashboard() {
    if (this.userInfoService.getUserInfoDetails()?.data) {
      const userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
      localStorage.setItem(
        'selectedCompanyID',
        this.preferenceData?.currentCompanyOrganizationId
      );
      if (localStorage.getItem('selectedCompanyID')) {
        let selectedOrgDetails = userInfoDetails?.organizations.filter(
          (x) => x.id == localStorage.getItem('selectedCompanyID')
        );
        if (selectedOrgDetails && selectedOrgDetails?.length > 0) {
          let roles: any = selectedOrgDetails[0].contactRoles.filter(
            (role: any) =>
              role?.code?.toUpperCase() == 'ABIA' ||
              role?.code?.toUpperCase() == 'ABIAAIR' ||
              role?.code?.toUpperCase() == 'ABIASEA' ||
              role?.code?.toUpperCase() == 'ABIALAND'
          );
          if (roles && roles.length > 0) {
            let url = '';
            roles.forEach((role) => {
              switch (role?.code) {
                case 'ABIA':
                  url = constructURLBasedOnLang(
                    this.selectedLanguage,
                    this.atlpEnvService.AtlpAirDashboard
                  );
                  break;
                case 'ABIAAIR':
                  url = constructURLBasedOnLang(
                    this.selectedLanguage,
                    this.atlpEnvService.AtlpAirDashboard
                  );
                  break;
                case 'ABIASEA':
                  url = constructURLBasedOnLang(
                    this.selectedLanguage,
                    this.atlpEnvService.AtlpSeaDashboard
                  );
                  break;
                case 'ABIALAND':
                  url = constructURLBasedOnLang(
                    this.selectedLanguage,
                    this.atlpEnvService.AtlpLandDashboard
                  );
                  break;
              }
            });
            window.location.href = url;
          } else {
            if (localStorage.getItem('selectedCompanyID')) {
              this.dashboardService
                .getDashboardAccess('All')
                .subscribe((res) => {
                  if (res && res?.data && res?.data?.length > 0) {
                    window.location.href = constructURLBasedOnLang(
                      this.selectedLanguage,
                      this.atlpEnvService.DashboardViewerURL
                    );
                  }
                });
            }
          }
        }
      }
    }
  }

  loadLiveChatScript(resolve) {
    let atlpScriptsModel: AtlpScriptsModel[] = [
      {
        name: 'atlp-live-chat',
        type: 'js',
        src: this.userInfo?.pcsTkn
          ? `./assets/js/shared/live-chat.js`
          : `./assets/js/shared/no-auth-live-chat.js`,
        loaded: false,
      },
    ];
    try {
      this.atlpScriptLoaderService
        .load(atlpScriptsModel)
        .then((scriptLoaded) => {
          atlpScriptsModel.forEach((scriptObj) => {
            scriptObj.loaded = true;
          });
          resolve();
        });
    } catch (ex) {
      console.info('Atlp live chat script loading failed...!');
      resolve();
    }
  }

  ngAfterViewInit(): void {
    this.atlpPortalBridge.setPageLoaderPortal(
      new DomPortal(this.domPortalContent)
    );
  }

  clickedOutside() {
    this.atplSidebarService
      .getSidebar(SidebarName.navigationSidebarMenu)
      .close();
    this.atplSidebarService
      .getSidebar(SidebarName.navigationSidebarContent)
      .close();
  }

  overWriteData(data: any): void {
    this.dataContentMobile = data;
    // console.log(data);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    let header = document.getElementById('cutomStickyNavbar');
    let sticky = event?.srcElement?.scrollTop;

    if (!header) {
      return;
    }

    if (sticky > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  openAndCloseChat() {
    document.getElementById('oc-lcw-chat-button')?.click();
  }

  openSurvey(): void {
    //this.happinessIndexCount = 0;
    document.getElementById('ratingBtnId').click();
  }

  onMouseUpOptions() {
    this.isOptionshover = true;
    this.changeDetectorRef.detectChanges();
  }

  onMouseLeaveOptions() {
    this.isOptionshover = false;
    this.changeDetectorRef.detectChanges();
  }

  private get icons(): Array<string> {
    return ['plus-white', 'chat-fill', 'icon-close-black', 'feedback-icon'];
  }

  goToUrl(type: any): void {
    var url = this.atlpEnvService.feedbackUrl;
    if (url) {
      if (this.selectedLanguage.toLowerCase() === 'ae') {
        url = url.replace('/en/', '/ar/').replace('/EN/', '/AR/');
      }

      if (type == 'trackRequest' || type == 'newRequest') {
        window.open(url, '_self');
      } else {
        document.location.href = url;
      }
    }
  }
}

export function constructURLBasedOnLang(lang: string, url: string) {
  return lang == 'en'
    ? url
    : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
}
