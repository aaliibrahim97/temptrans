import { Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import {
  AtlpPortalBridgeService,
  IHeaderDetails,
} from 'projects/@atlp/services/atlp-portal-bridge.service';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { ManageAccountService } from 'projects/@atlp/services/manage-account.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { filter } from 'rxjs/operators';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';
import { SnakBarService } from '../snak-bars/service/snak-bar-default.component';
import { ThemePreferenceComponent } from '../theme-preference/theme-preference.component';

@Component({
  selector: 'user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.scss'],
})
export class UserPreferenceComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(ThemePreferenceComponent) themePage: ThemePreferenceComponent;
  @ViewChild('profilePage') profilePage: TemplateRef<any>;
  selectedLanguage: string = 'en';
  id: string;
  langList: any = [
    { name: 'English', active: true, icon: 'En', id: 'en' },
    { name: 'Arabic', active: false, icon: 'Ar', id: 'ar' },
  ];
  userInfo = null;
  userPreference = null;
  contactId = null;
  orgId = null;
  contactDetails = null;
  langMap = 'en-US';
  previousUrl = null;
  imgUrl = null;
  contactImgUrl: null;
  tradeName: string = '';
  isIndividual: boolean = false;
  constructor(
    private _iconsService: IconsService,
    private userInfoService: UserInfoService,
    private defaultSnakBar: SnakBarService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private manageAccountService: ManageAccountService,
    private ngxService: NgxUiLoaderService,
    public _atplSidebarV2Service: AtlpSidebarV2Service,
    private contactService: ContactsService,
    private router: Router,
    private _loc: Location,
    private cdr: ChangeDetectorRef,
    private _atlpPortalBridgeService: AtlpPortalBridgeService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });

    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      if (lang == 'en') {
        this.langMap = 'en-US';
      } else {
        this.langMap = 'ar-AE';
      }
      this.langList.forEach((item) => {
        item.active = item.id == this.selectedLanguage ? true : false;
      });
    });
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.userInfo = this.userInfoService.getUserInfoDetails();
    this.isIndividual =
      this.userInfo?.data?.selectedCompany?.contactType == 'Individual'
        ? true
        : false;
    this.tradeName =
      this.selectedLanguage == 'en'
        ? this.userInfo?.data?.selectedCompany?.tradeName['en-US']
        : this.userInfo?.data?.selectedCompany?.tradeName['ar-AE'];
    this.contactId = this.userInfo?.data?.id;
    this.orgId = localStorage.getItem('selectedCompanyID') || null;
    this.contactService.getSaveduserPreference(this.userInfo.data.id).subscribe(
      (res) => {
        if (res) {
          this.userPreference = res?.data;
          this.themePage.userPreference = res?.data;
          this.themePage.initTheme();
          this.langList.forEach((item) => {
            item.active =
              item.id == this.userPreference?.selectedLanguage ? true : false;
          });
        }
        this.ngxService.stop();
      },
      (error) => {
        this.ngxService.stop();
      }
    );
    this.ngxService.start();
    this.manageAccountService
      .getSubmission(this.contactId, localStorage.getItem('selectedCompanyID'))
      .subscribe(
        (submission: any) => {
          if (submission) {
            this.contactDetails = submission?.data?.data?.contact?.filter(
              (c) => c.id == this.contactId
            )[0];
          }
          this.imgUrl = submission?.data?.data?.documentList
            ?.filter((m) => m.documentType == 'IOPROFILE')[0]
            ?.links?.download?.replace(' ', '')
            .trim();
          this.contactImgUrl = submission?.data?.data?.documentList
            ?.filter((m) => m.documentType == 'PROFILE')[0]
            ?.links?.download?.replace(' ', '')
            .trim();
          this.cdr.detectChanges();
          this.ngxService.stop();
        },
        (err) => {
          this.ngxService.stop();
        }
      );
  }

  ngAfterViewInit(): void {
    this.setHeaderDetails('Settings');
    this.cdr.detectChanges();
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

  onSwitchLang(lang): void {
    this.langList.forEach((item) => {
      item.active = false;
    });
    lang.active = true;
    if (this.userInfo) {
      this.setPreference();
    }
  }

  setPreference(): void {
    this.ngxService.start();
    let lang = _.filter(this.langList, { active: true })[0].id;
    this.contactService
      .updateUserLanguage(this.userInfo.data.id, lang)
      .subscribe({
        next: (result) => {
          this.userPreference = result.data;
          let uploadSuccess = this.translate.instant(
            'Language_Updated_Successfully'
          );
          this.ngxService.stop();
          this.defaultSnakBar.success(uploadSuccess);
        },
        error: (err) => {
          this.ngxService.stop();
          this.langList.forEach((item) => {
            item.active =
              item.id == this.userPreference?.selectedLanguage ? true : false;
          });
          this.cdr.detectChanges();
          this.defaultSnakBar.error(err);
        },
      });
  }

  goBack(): void {
    this._loc.back();
  }

  private get icons(): Array<string> {
    return [
      'plus-dark',
      'soc-icon',
      'rejected-icon',
      'plus-white',
      'edit',
      'dark-mode',
      'User-management',
      'icon-close-dark',
      'pay-check',
      'envelop',
      'phone-fill',
      'icon-light-mode',
      'icon-dark-mode',
      'icon-company-new',
    ];
  }

  getName() {
    if (this.contactDetails) {
      return (
        this.contactDetails.firstName[this.langMap] +
        ' ' +
        this.contactDetails.lastName[this.langMap]
      );
    } else {
      return '';
    }
  }

  ngOnDestroy(): void {}
}
