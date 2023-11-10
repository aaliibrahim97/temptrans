import { AtlpNavigationService } from 'projects/@atlp/components/atlp-nav-menu/services/navigation.service';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AtlpAnimations } from 'projects/@atlp/animations';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { atlpCommonTranslationEn as navigationEnglish } from '../../../i18n/en';
import { atlpCommonTranslationAr as navigationArabic } from '../../../i18n/ae';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import {
  AtlpPortalBridgeService,
  IHeaderDetails,
} from 'projects/@atlp/services/atlp-portal-bridge.service';

@Component({
  selector: 'toolbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: AtlpAnimations,
  providers: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  SidebarName = SidebarName;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  selectedLanguage: string;
  sideBarShow: boolean;
  currentNavigation: any;
  headerTitle: string;
  headerLogo: any;
  headerLogoCustomClass: string;
  private _unsubscribeAll: Subject<any>;
  private _dirChangeSubscription = Subscription.EMPTY;
  private dirCloned: any;
  @Input() showMenu: boolean = true;
  isMobile = window.innerWidth < 992;
  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  constructor(
    private _atlpConfigService: AtlpConfigService,
    private _atlpNavigationService: AtlpNavigationService,
    public _atlpSidebarService: AtlpSidebarService,
    private _iconsService: IconsService,
    private _translateService: TranslateService,
    private readonly router: Router,
    private atlpTranslationService: AtlpTranslationService,
    private atlpEnvService: AtlpEnvService,
    private dir: Directionality,
    private _atlpPortalBridgeService: AtlpPortalBridgeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.sideBarShow = true;
    this._iconsService.registerIcons(this.icons);
    this._translateService.addLangs(['en', 'ae']);
    // Get current navigation
    const navigationList = this._atlpNavigationService.getCurrentNavigation();
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        let url;
        event.urlAfterRedirects
          ? (url = event.urlAfterRedirects)
          : (url = event.url);
        const filterUrl = url && url?.includes('?') ? url?.split('?')[0] : url;
        this.currentNavigation = this._atlpNavigationService.getNavigationItem(
          filterUrl,
          navigationList
        );
      });

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.dirCloned = this.dir;

    // this._dirChangeSubscription =this.dir.change.subscribe((data: Direction) => {
    //   let dir = this.dir.value;
    //  alert('Html dir ==> ');
    //   console.log(dir);
    // });
  }

  ngOnInit(): void {
    this.setLanguage();
    // Set the defaults
    this.loadDefaultLanguage();

    this._atlpPortalBridgeService.headerDetailsChanged.subscribe(
      (res: IHeaderDetails) => {
        if (res) {
          this.headerLogo = res.logo?.svgIcon ? res.logo?.svgIcon : '';
          this.headerTitle = res.title ? res.title : '';
          this.headerLogoCustomClass = res.logo?.customClass
            ? res.logo?.customClass
            : 'width: 200px;height: 200px;';
        }
      }
    );

    this._atlpConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // Set the selected language from default languages
    this._translateService.currentLang =
      this._translateService.currentLang === 'null'
        ? null
        : this._translateService.currentLang;
  }

  goToUrl(type: any): void {
    let url = this.getURL(type);
    if (!url) return;

    if (['ae', 'ar'].includes(this.selectedLanguage.toLowerCase())) {
      url = url.replace('/en/', '/ar/').replace('/EN/', '/AR/');
    }

    if (['trackRequest', 'newRequest'].includes(type)) {
      window.open(url, '_self');
    } else {
      this.document.location.href = url;
    }
  }

  setRegisteredUserStatus() {
    this._atlpConfigService.changeMessage('true');
  }

  getURL(type: string) {
    switch (type) {
      case 'newRequest':
        return this.atlpEnvService.feedbackUrl;
      case 'trackRequest':
        return this.atlpEnvService.trackingUrl;
      default:
        return '';
    }
  }

  onSwitchLang(lang): void {
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLang', lang);
    if (window.location.href.toLowerCase().includes('/ar/')) {
      let newUrl = window.location.href
        .replace('/ar/', `/en/`)
        .replace('/AR/', `/EN/`);
      window.location.href = newUrl;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (window.location.href.toLowerCase().includes('/en/')) {
      let newUrl = window.location.href
        .replace('/en/', `/ar/`)
        .replace('/EN/', `/AR/`);
      window.location.href = newUrl;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  toggleSidebarOpen(key): void {
    this._atlpSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang?: any): void {
    this.selectedLanguage =
      this.atlpTranslationService.readLangFromUrl() ||
      localStorage.getItem('selectedLang') ||
      'en';
    const documentDirection =
      this.selectedLanguage.toLowerCase() === 'en' ? 'ltr' : 'rtl';
    this.dirCloned.value = documentDirection;
    // Use the selected language for translations
    this._translateService.use(this.selectedLanguage);
  }

  loadDefaultLanguage() {
    this.selectedLanguage =
      this.selectedLanguage.toLowerCase() === 'ar' ? 'ae' : 'en';
    this.atlpTranslationService.setCurrentLanguage(this.selectedLanguage);
    this.atlpTranslationService.handleRtlCHange(this.selectedLanguage);

    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });
  }

  private get icons(): Array<string> {
    return [
      'arrow-open',
      'open-table-icon',
      'filter-icon',
      'arrow-close',
      'plus-white',
      'question',
      'notification',
      'burger-menu',
      'light-mode',
      'dark-mode',
      'feedback-support-icon',
    ];
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._dirChangeSubscription.unsubscribe();
  }
}
