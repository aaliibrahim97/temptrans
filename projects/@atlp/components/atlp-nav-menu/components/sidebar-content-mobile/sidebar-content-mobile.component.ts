import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { INavigationListData } from '../../models/INavigationListData';
import { AtlpMenuService } from '../../services/atlp-menu.service';

@Component({
  selector: 'atlp-sidebar-content-mobile',
  templateUrl: './sidebar-content-mobile.component.html',
  styleUrls: ['./sidebar-content-mobile.component.scss'],
})
export class AtlpSidebarContentMobileComponent implements OnInit {
  @Input() data: INavigationListData[];
  SidebarName = SidebarName;
  lang: string = 'en';
  constructor(
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private router: Router,
    private envService: AtlpEnvService,
    private atlpTranslationService: AtlpTranslationService,
    private atlpMenuService: AtlpMenuService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.lang = lang;
    });
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  navigateTo(item: any) {
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

  private get icons(): Array<string> {
    return ['close-white-icon', 'back-arrow-left'];
  }
}

export function constructURLBasedOnLang(lang: string, url: string) {
  return lang == 'en'
    ? url
    : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
}
