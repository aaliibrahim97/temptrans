import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { HappinessIndexService } from 'projects/@atlp/services/happiness-index.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AtlpEnvService } from '../../environments/env.service';
//test
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  ratingNotificationCount = 0;
  SidebarName = SidebarName;
  isBlink: boolean = false;
  userInfo: any;
  isAdminUser: boolean = false;
  subscription: Subscription;
  isSideBarOpen: boolean;
  userinfoservicedetails: any;

  constructor(
    private _iconsService: IconsService,
    public atplSidebarService: AtlpSidebarV2Service,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    public envService: AtlpEnvService,
    public happinessindexservice: HappinessIndexService,
    private userservice: UserInfoService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.userInfo = this.authService.userDataFromToken();
    this.userservice.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.userinfoservicedetails =
          this.userservice.getUserInfoDetails()?.data;
        if (this.userinfoservicedetails?.isInternal) {
          this.isAdminUser = true;
        } else {
          this.isAdminUser = false;
        }
      }
    });
    this.subscription = this.atplSidebarService.isSideBarOpen$.subscribe(
      (isOpen) => (this.isSideBarOpen = isOpen)
    );
  }

  ngOnChanges() {}

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  onRatingCountChange(ratingCount: number) {
    this.ratingNotificationCount = ratingCount;
    this.happinessindexservice.happinessIndexCount.next(ratingCount);
    if (this.ratingNotificationCount) {
      this.isBlink = true;
      setTimeout(() => {
        this.isBlink = false;
      }, 10000);
    } else {
      this.isBlink = false;
    }
  }

  private get icons(): Array<string> {
    return ['rating'];
  }
}
