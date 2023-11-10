import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAnnouncementComponent } from 'projects/@atlp/components/user-announcement/user-announcement.component';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAnnouncementModel } from '../components/user-announcement/user-announcement';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  onActionTriggered = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private atlpEnvService: AtlpEnvService,
    public dialog: MatDialog
  ) {}

  getUserAnnouncements(): Observable<any> {
    let descriptors = {
      key: 'x-descriptor',
      value: {
        pagination: { pageSize: 10, PageIndex: 1 },
        filter: [
          {
            filterBy: 'Module',
            filterType: 'equal',
            value: 'ATLP_UserManagement',
          },
          {
            filterBy: 'MessageDisplayType',
            filterType: 'equal',
            value: 'pop-up',
          },
        ],
        order: { orderBy: 'Priority', orderType: 'asc' },
      },
    };
    return this.http.get(
      `${this.atlpEnvService.notificationBaseUrl}notification/api/applicationmessage`,
      {
        headers: createDescriptorHeader(descriptors),
      }
    );
  }

  userAnnouncement() {
    this.getUserAnnouncements().subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        res.data.forEach((x) => {
          if (x?.message) {
            let announcementData: IAnnouncementModel = {
              title: 'Announcement',
              message: x?.message,
              showConfirmButton: true,
              confirmButtonText: 'Ok',
              icon: 'announcement',
            };
            this.openAnnouncemnet(announcementData);
          }
        });
      }
    });
  }

  openAnnouncemnet(announcementData: any, width?: string) {
    const dialogRef = this.dialog.open(UserAnnouncementComponent, {
      disableClose: true,
      data: announcementData,
      width: width ? width : '50vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onActionTriggered.next(result);
      } else {
        this.onActionTriggered.next('reject');
      }
    });
  }
}

export const createDescriptorHeader: (descriptors: any) => HttpHeaders = (
  descriptor
) => {
  let headers = new HttpHeaders();
  headers = headers.set(descriptor.key, JSON.stringify(descriptor.value));
  return headers;
};
