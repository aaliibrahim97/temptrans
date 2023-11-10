import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { Observable, Subject } from 'rxjs';
import {
  EnumAppNotificationCount,
  EnumAppNotificationType,
} from '../notifications/enums/AppName';
import { ApiBaseService } from './api-base.service';
import { createDescriptorHeader } from './data.helper';
import { DashboardInstanceStoreService } from '@mg_core/atlp-dashboard-designer';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends ApiBaseService {
  private notificationCount = new Subject<any>();
  private notifications = new Subject<any>();
  private unreadNotifications = new Subject<any>();

  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private dashboardInstanceStoreService: DashboardInstanceStoreService
  ) {
    super(`atlp/notification/api/userMessage`, api, http, true);
  }

  getActivities(
    pageSize: number = 10,
    pageNumber: number = 1,
    search: string = '',
    viewall: boolean = false
  ) {
    return this.getByDescriptor('', search, pageSize, pageNumber, viewall);
  }

  updateNotificationCount() {
    this.get('count/1').subscribe((resp) => {
      if (resp && resp[EnumAppNotificationCount.UserManagement]) {
        this.notificationCount.next({
          count: resp[EnumAppNotificationCount.UserManagement].unRead,
        });
      }
    });
  }

  updateAllNotifications() {
    this.getNotificationByType(
      EnumAppNotificationType.InAppNotification
    ).subscribe((resp) => {
      this.notifications.next({ notifications: resp });
    });
  }

  updateUnreadNotifications() {
    this.getNotificationByType(
      EnumAppNotificationType.InAppNotification
    ).subscribe((resp) => {
      this.unreadNotifications.next({ notifications: resp });
    });
  }

  getUpdatedNotificationCount(): Observable<any> {
    return this.notificationCount.asObservable();
  }

  getUpdatedNotifications(): Observable<any> {
    return this.notifications.asObservable();
  }

  getUpdatedUnreadNotifications(): Observable<any> {
    return this.unreadNotifications.asObservable();
  }

  getNotificationByType(type: string): Observable<any> {
    let pageSize = 10;
    let PageIndex = 1;
    let viewAll = false;
    let payload: any = {
      pagination: { pageSize, PageIndex },
    };
    let viewUnreadNotificationFilter = [];
    if (!viewAll) {
      viewUnreadNotificationFilter = [
        // {
        //   filterBy: 'read',
        //   filterType: 'isfalse',
        //   value: true,
        // },
        {
          filterBy: 'type',
          filterType: 'equal',
          value: type,
        },
      ];
    }
    payload = {
      ...payload,
      filter: viewUnreadNotificationFilter,
      order: { orderBy: 'read', orderType: 'asc' },
    };
    return this.http.get(
      `${this.api.notificationBaseUrl}atlp/notification/api/userMessage`,
      {
        context: new HttpContext().set(
          this.dashboardInstanceStoreService.DASH_INTERCEPTER_HEADERS_INSTANCE,
          new Map<string, string>().set('x-descriptor', JSON.stringify(payload))
        ),
        headers: createDescriptorHeader(payload),
      }
    );
  }
}
