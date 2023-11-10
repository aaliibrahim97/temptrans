import { Component } from '@angular/core';

import { AtlpTranslationLoaderService } from 'projects/@atlp/services/translation-loader.service';
import { AtlpAnimations } from 'projects/@atlp/animations';
import { locale as english } from './i18n/en';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
@Component({
  selector: 'ui-kit',
  templateUrl: './ui-kit.component.html',
  styleUrls: ['./ui-kit.component.scss'],
  animations: AtlpAnimations,
})
export class UiKitComponent {
  // sidebar
  SidebarName = SidebarName;

  public typeFiles = ['pdf', 'jpg', 'jpeg', 'png', 'mp4', 'css'];
  /**
   * Constructor
   * @param {IconsService} _iconsService
   * @param {AtlpTranslationLoaderService} _atlpTranslationLoaderService
   * @param {AtlpSidebarService} _atplSidebarService
   */
  constructor(
    private _iconsService: IconsService,
    private _atlpTranslationLoaderService: AtlpTranslationLoaderService,
    private _atplSidebarService: AtlpSidebarService
  ) {
    this._iconsService.registerIcons(this.icons);
    this._atlpTranslationLoaderService.loadTranslations(english);
  }

  public loadedFiles(files): void {
    //console.log('loadedFiles', files);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    //console.log(value);
  }

  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return [
      'close-white-icon',
      'filter-icon',
      'plus-white',
      'soc-icon',
      'plus-white',
      'open-table-icon',
      'soc-icon',
      'download-icon',
      'folder',
    ];
  }
}
