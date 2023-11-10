import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { SnakBarService } from '../snak-bars/service/snak-bar-default.component';
import { ValidatorService } from 'projects/@atlp/services/validator.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'themePreference',
  templateUrl: './theme-preference.component.html',
  styleUrls: ['./theme-preference.component.scss'],
})
export class ThemePreferenceComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  selectedLanguage: string = 'en';
  themeList: any = [
    {
      name: 'Light',
      imgurl: 'assets/images/light-theme-bg.png',
      active: false,
      icon: 'icon-light-mode',
      label: 'Light_Mode',
      id: 'light',
    },
    {
      name: 'Dark',
      imgurl: 'assets/images/dark-theme-bg.png',
      active: true,
      icon: 'icon-dark-mode',
      label: 'Dark_Mode',
      id: 'dark',
    },
  ];

  userInfo = null;
  userPreference = null;
  contactId = null;
  langMap = 'en-US';
  previousUrl = null;
  constructor(
    private _iconsService: IconsService,
    private userInfoService: UserInfoService,
    private atlpTranslationService: AtlpTranslationService,
    public translate: TranslateService,
    private contactService: ContactsService,
    private cdr: ChangeDetectorRef,
    private defaultSnakBar: SnakBarService,
    private validatorService: ValidatorService,
    private ngxService: NgxUiLoaderService
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      if (lang == 'en') {
        this.langMap = 'en-US';
      } else {
        this.langMap = 'ar-AE';
      }
    });
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.userInfo = this.userInfoService.getUserInfoDetails();
    this.contactId = this.userInfo?.data?.id;
  }

  initTheme() {
    if (!this.userPreference) {
      this.themeList[1].active = true;
    } else {
      this.themeList.map((x) => {
        if (x.id == this.userPreference?.selectedTheme) {
          x.active = true;
        } else {
          x.active = false;
        }
      });
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  setTheme(theme): any {
    this.themeList.forEach((item) => {
      item.active = false;
    });
    theme.active = true;
    this.atlpTranslationService.handleTheamChange(theme.id);
    if (this.userInfo) {
      this.setPreference('theme');
    }
  }

  setPreference(_type: any): void {
    this.ngxService.start();
    let theme = _.filter(this.themeList, { active: true })[0].id;
    if (_type == 'theme') {
      this.contactService.updateUserTheme(this.contactId, theme).subscribe({
        next: (result) => {
          this.userPreference = result.data;
          this.contactService.selectedTheme = this.userPreference.selectedTheme;
          let uploadSuccess = this.translate.instant(
            'Theme_Updated_Successfully'
          );
          this.ngxService.stop();
          this.defaultSnakBar.success(uploadSuccess);
        },
        error: (err) => {
          this.ngxService.stop();
          this.themeList.forEach((item) => {
            item.active =
              item.id == this.userPreference?.selectedTheme ? true : false;
          });
          this.cdr.detectChanges();
          this.defaultSnakBar.error(err);
        },
      });
    }
  }

  ngOnDestroy(): void {}

  private get icons(): Array<string> {
    return [
      'plus-dark',
      'dark-mode',
      'icon-close-dark',
      'pay-check',
      'envelop',
      'phone-fill',
      'icon-light-mode',
      'icon-dark-mode',
    ];
  }
}
