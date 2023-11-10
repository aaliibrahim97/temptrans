import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { IActivity } from 'projects/@atlp/components/activity-sidebar/interfaces/IActivity';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { NotificationReadService } from '../services/notification-read.service';
import { getNotificationsData } from '../services/notification.helper';
import { NotificationService } from '../services/notification.service';
import {
  EnumAppNotificationCount,
  EnumAppNotificationType,
} from './enums/AppName';
import * as signalR from '@microsoft/signalr';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  events: IActivity[];
  // @Input() userData: IUserData;
  @Input() isSetting: boolean;
  activitiesInput$ = new Subject<string>();
  activitySearchTerm = '';
  activities$: Observable<any>;
  activitiesLoading = false;
  isNotificationAvailable = false;
  unreadNotificationCount: number = 0;
  lang: any = '';
  private notificationCountsubscription: Subscription;
  private unreadNotificationsubscription: Subscription;
  notificationsData: Array<IActivity>;
  userInfo;
  signalRURL;
  private _hubConnection;

  constructor(
    private _iconsService: IconsService,
    private notificationService: NotificationService,
    private notificationReadService: NotificationReadService,
    private router: Router,
    private envservice: AtlpEnvService,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private atlptranslationService: AtlpTranslationService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private defaultSnakBar: SnakBarService,
    private toastr: ToastrService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.notificationCountsubscription = this.notificationService
      .getUpdatedNotificationCount()
      .subscribe((resp) => {
        this.unreadNotificationCount = resp.count;
        this.changeDetector.detectChanges();
      });
    this.unreadNotificationsubscription = this.notificationService
      .getUpdatedUnreadNotifications()
      .subscribe((resp) => {
        this.notificationsData = getNotificationsData(
          resp.notifications,
          this.lang
        ).slice(0, 10);
        this.changeDetector.detectChanges();
      });
  }

  ngOnInit(): void {
    this.atlptranslationService.getCurrentLanguage().subscribe((lang) => {
      this.lang = lang;
    });

    this.getNotificationCount();
    this.getUnreadNotifications();
    this.userInfo = this.authService.userDataFromToken();
    this.signalRURL =
      this.envservice.signalRBaseUrl + '?userName=' + this.userInfo?.Email;
    this.createConnection();
  }

  getNotificationCount() {
    this.notificationService.get('count/1').subscribe((resp) => {
      if (resp && resp[EnumAppNotificationCount.UserManagement]) {
        this.unreadNotificationCount =
          resp[EnumAppNotificationCount.UserManagement].unRead;
        this.changeDetector.detectChanges();
      }
    });
  }

  getUnreadNotifications() {
    this.notificationService
      .getNotificationByType(EnumAppNotificationType.InAppNotification)
      .subscribe((resp) => {
        this.notificationsData = getNotificationsData(resp, this.lang).slice(
          0,
          10
        );
        if (this.notificationsData) {
          this.isNotificationAvailable = true;
        }
      });
  }

  onViewAllClick() {
    this.router.navigate(['/manage-account/view-all-notifications']);
    // if (this.lang == 'en') {
    //   this.document.location.href =
    //     this.envservice.landingBaseUrl + 'view-all-notifications';
    // } else {
    //   this.document.location.href =
    //     this.envservice.landingBaseUrl.replace('/EN/', `/AR/`) +
    //     'view-all-notifications';
    // }
  }

  onReadNotification(id) {
    this.notificationReadService.put('', id).subscribe((res) => {
      if (res && res.success) this.getNotificationCount();
      this.getUnreadNotifications();
      this.notificationService.updateAllNotifications();
    });
  }

  createConnection() {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.signalRURL, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect()
      .build();
    this._hubConnection.serverTimeoutInMilliseconds = 10000000;
    this.startConnection();
    //this.registerOnServerEvents();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection
          .invoke('GetConnectionId')
          .then((connectionId) => {});
        this.registerOnServerEvents();
      })
      .catch((err) => {
        console.log(
          'Error while establishing Hub connection connection:' + err
        );
        setTimeout(() => {
          this._hubConnection.start();
        }, 10000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('NotifyClient', (notifyUpdatesDTO) => {
      if (notifyUpdatesDTO?.subject) {
        this.toastr.info(
          this.lang == 'en'
            ? JSON.parse(notifyUpdatesDTO?.message)['en-US']
            : JSON.parse(notifyUpdatesDTO?.message)['ar-AE'],
          this.lang == 'en'
            ? JSON.parse(notifyUpdatesDTO?.subject)['en-US']
            : JSON.parse(notifyUpdatesDTO?.subject)['ar-AE']
        );
        this.getNotificationCount();
        this.getUnreadNotifications();
      }
    });
  }

  private get icons(): Array<string> {
    return ['notification', 'question'];
  }

  ngOnDestroy() {
    this.notificationCountsubscription.unsubscribe();
    this.unreadNotificationsubscription.unsubscribe();
    this._hubConnection.stop();
  }
}
