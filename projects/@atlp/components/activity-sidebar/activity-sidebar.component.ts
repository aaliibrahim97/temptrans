import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { EnumNotificationStatus } from './enums/NotificationEnums';
import { IActivity } from './interfaces/IActivity';
import { TranslateService } from '@ngx-translate/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
@Component({
  selector: 'activity-sidebar',
  templateUrl: './activity-sidebar.component.html',
  styleUrls: ['./activity-sidebar.component.scss'],
})
//th ctv
export class ActivitySidebarComponent implements OnInit, OnChanges {
  @Input() events: IActivity[];
  @Input() isColumnLayout: Boolean;
  @Input() title: string = 'Activity';
  @Input() pageType: string;
  eventsImportant: IActivity[];
  eventsYesterday: IActivity[];
  eventsToday: IActivity[];
  eventsWeek: IActivity[];
  eventsPreviousWeek: IActivity[];
  noNewMsg: string;
  @Output() onviewallEvent = new EventEmitter<any>();
  @Output() onReadNotification = new EventEmitter<any>();
  selectedLanguage = 'en';
  constructor(
    public translate: TranslateService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngOnInit(): void {
    if (this.pageType == undefined) {
      this.noNewMsg = this.translate.instant('No_New_Notifications');
    } else {
      this.noNewMsg = `No_New_${this.pageType}`;
    }
    this.getEventsByStatus();
  }

  ngOnChanges() {
    this.getEventsByStatus();
  }

  getEventsByStatus() {
    this.eventsImportant = this.events.filter(
      (x) => x.urgent === EnumNotificationStatus.Important
    );
    this.eventsWeek = this.events.filter(
      (x) => x.urgent === EnumNotificationStatus.Week
    );
    this.eventsToday = this.events.filter(
      (x) => x.urgent === EnumNotificationStatus.Today
    );
    this.eventsYesterday = this.events.filter(
      (x) => x.urgent === EnumNotificationStatus.Yesterday
    );
    this.eventsPreviousWeek = this.events.filter(
      (x) => x.urgent === EnumNotificationStatus.PreviousWeeks
    );
  }

  onClickViewAll(event) {
    this.onviewallEvent.emit();
  }

  readNotification(id) {
    this.onReadNotification.emit(id);
  }
}
