import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { ITokenParseModel } from 'projects/@atlp/auth/interfaces/ITokenParseModel';
import { AtlpFaqService } from 'projects/@atlp/components/atlp-faq/services/atlp-faq.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserManualService } from 'projects/@atlp/services/user-manual.service';
import { ISettingsAvatar, IUserData } from '../avatars/interfaces';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  userData: IUserData = {
    firstName: '',
    lastName: '',
    imgUrl: '',
    CompanyName: '',
  };
  userDataFromToken: any;
  settingsAvatar: ISettingsAvatar = {
    round: false,
    size: 'medium',
  };
  currentLightMode: boolean;
  SidebarName = SidebarName;
  hasUserManual: boolean = false;
  showFAQ: boolean = false;
  constructor(
    private _iconsService: IconsService,
    private envservice: AtlpEnvService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private atlpTranslationService: AtlpTranslationService,
    private _atlpSidebarService: AtlpSidebarService,
    private _atlpSidebarV2Service: AtlpSidebarV2Service,
    private _userManualService: UserManualService,
    private router: Router,
    private atlpFaqService: AtlpFaqService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpFaqService.showFAQ.subscribe((res) => {
      if (res == 'show') {
        this.showFAQ = true;
      }
    });

    this.currentLightMode = this.setInitialMode();
    const selectedMode = this.currentLightMode ? 'Light' : 'Dark';
    this.setUserDetails();
    this._userManualService.userManual$.subscribe(
      (res: any) => {
        if (res) {
          this.hasUserManual = res.length > 0 ? true : false;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  setInitialMode = () => {
    if (localStorage.getItem('atlp-prefs-mode')) {
      return JSON.parse(localStorage.getItem('atlp-prefs-mode'));
    }
    return false;
  };

  private setUserDetails() {
    setTimeout(() => {
      const userData: ITokenParseModel = this.authService.userDataFromToken();
      this.userDataFromToken = userData;
      if (userData && userData.UserName) {
        this.userData = {
          firstName: userData.UserName,
          lastName: userData.UserName,
          imgUrl: '',
          CompanyName: userData.CompanyName,
        };
      }
    }, 300);
  }

  isHelp() {
    return this.envservice.isShowHelp;
  }

  isSetting() {
    return this.envservice.isShowSetting;
  }

  toggleSidebarOpen(key): void {
    this._atlpSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atlpSidebarV2Service.getSidebar(key).toggleOpen();
  }

  navigateTo(path: string) {
    this.router.navigateByUrl('/faq');
  }

  private get icons(): Array<string> {
    return [
      '3',
      'notification',
      'question',
      'dark-mode',
      'cog-wheel-silhouette',
      'icon-user-manual',
      'question',
    ];
  }
}
