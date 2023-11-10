import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IActivity } from 'projects/@atlp/components/activity-sidebar/interfaces/IActivity';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { Subscription, forkJoin } from 'rxjs';
import { NotificationReadService } from '../services/notification-read.service';
import { getNotificationsData } from '../services/notification.helper';
import { NotificationService } from '../services/notification.service';
import { EnumAppNotificationType } from '../notifications/enums/AppName';
import { ActivatedRoute } from '@angular/router';
import {
  AtlpPortalBridgeService,
  IHeaderDetails,
} from 'projects/@atlp/services/atlp-portal-bridge.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'view-all-notifications',
  templateUrl: './view-all-notifications.component.html',
  styleUrls: ['./view-all-notifications.component.scss'],
})
export class ViewAllNotificationsComponent implements OnInit {
  events: IActivity[];
  lang: any = '';
  pageIndex: number = 0;
  inAppnotificationsData: Array<IActivity> = [];
  allActivitiesData: Array<IActivity> = [];
  recentServicesData: Array<IActivity> = [];
  announcementData: Array<IActivity> = [];
  // @Input() userData: IUserData;
  private allNotificationsubscription: Subscription;
  constructor(
    private _iconsService: IconsService,
    private notificationService: NotificationService,
    private notificationReadService: NotificationReadService,
    private changeDetector: ChangeDetectorRef,
    private atlptranslationService: AtlpTranslationService,
    private route: ActivatedRoute,
    private atlpPortalBridgeService: AtlpPortalBridgeService,
    private translateService: TranslateService,
    private _loc: Location
  ) {
    this._iconsService.registerIcons(this.icons);
  }
  isNotificationAvailable = false;
  notificationsData: Array<IActivity> = [];
  ngOnInit(): void {
    let obj: IHeaderDetails = {
      title: this.translateService.instant('Notifications'),
    };
    this.atlpPortalBridgeService.setHeaderDetails(obj);
    this.route.queryParams.subscribe((params) => {
      if (params && params.pageType) {
        this.pageIndex =
          typeof params?.pageType == 'string'
            ? Number(params?.pageType)
            : params?.pageType;
      }
    });
    this.atlptranslationService.getCurrentLanguage().subscribe((lang) => {
      this.lang = lang;
    });
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.allNotificationsubscription = forkJoin([
      this.notificationService.getNotificationByType(
        EnumAppNotificationType.InAppNotification
      ),
      this.notificationService.getNotificationByType(
        EnumAppNotificationType.AllActivities
      ),
      this.notificationService.getNotificationByType(
        EnumAppNotificationType.RecentServices
      ),
      this.notificationService.getNotificationByType(
        EnumAppNotificationType.Announcements
      ),
    ]).subscribe((resp) => {
      this.inAppnotificationsData = getNotificationsData(resp[0], this.lang);
      this.allActivitiesData = getNotificationsData(resp[1], this.lang);
      this.recentServicesData = getNotificationsData(resp[2], this.lang);
      this.announcementData = getNotificationsData(resp[3], this.lang);
      if (this.notificationsData) {
        this.isNotificationAvailable = true;
      }
      this.changeDetector.detectChanges();
    });
  }

  onTabClick(data) {
    console.log(data);
  }

  onViewAllClick() {
    // this.router.navigate(['view-all-notifications']);
  }
  private get icons(): Array<string> {
    return ['notification', 'question'];
  }
  onReadNotification(id) {
    this.notificationReadService.put('', id).subscribe((res) => {
      if (res && res.success)
        this.notificationService.updateNotificationCount();
      this.notificationService.updateUnreadNotifications();
      this.getAllNotifications();
    });
  }

  goBack(): void {
    this._loc.back();
  }

  ngOnDestroy() {
    this.allNotificationsubscription.unsubscribe();
  }
}
