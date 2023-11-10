import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { ITokenParseModel } from 'projects/@atlp/auth/interfaces/ITokenParseModel';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  SidebarName = SidebarName;
  @Input() showMenu: boolean = true; // to hide or show menu
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AtlpSidebarService} _atlpSidebarService
   * @param {IconsService} _iconsService
   */
  constructor(
    private _atlpSidebarService: AtlpSidebarService,
    private _atlpConfigService: AtlpConfigService,
    public atlpEnvService: AtlpEnvService,
    private _iconsService: IconsService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    // Set the defaults
    this._iconsService.registerIcons(this.icons);
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  userData: ITokenParseModel;
  ngOnInit(): void {
    this.userData = this.authService.userDataFromToken();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
    this._atlpSidebarService.getSidebar(key).toggleOpen();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return ['burger-menu'];
  }
}
