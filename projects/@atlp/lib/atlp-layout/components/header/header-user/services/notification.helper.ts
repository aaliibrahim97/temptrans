import * as moment from 'moment';
import { EnumNotificationStatus } from 'projects/@atlp/components/activity-sidebar/enums/NotificationEnums';
import { IActivity } from 'projects/@atlp/components/activity-sidebar/interfaces/IActivity';
import { EnumAppName } from '../notifications/enums/AppName';

export function getNotificationsData(resp: any, lang: any = 'en'): IActivity[] {
  const notificationsData: Array<IActivity> = [];
  if (
    resp[EnumAppName.UserManagement] &&
    resp[EnumAppName.UserManagement]?.data &&
    resp[EnumAppName.UserManagement]?.data.length
  ) {
    resp[EnumAppName.UserManagement]?.data.forEach((e) => {
      const notification = {} as IActivity;
      const subject = JSON.parse(e.subject);
      const msg = JSON.parse(e.message);
      // notification.name = e.username;
      notification.title =
        lang === 'ar' || lang === 'ae' ? subject['ar-AE'] : subject['en-US'];
      notification.status = e.read
        ? 'success'
        : e.priority == 1
        ? 'notice'
        : 'default';
      notification.url =
        lang === 'ar' || lang === 'ae'
          ? e?.link?.replace('/EN/', '/AR/')
          : e?.link;
      notification.data = e.createdDate;
      notification.message =
        lang === 'ar' || lang === 'ae' ? msg['ar-AE'] : msg['en-US'];
      notification.urgent = getNotificationUrgentStatus(
        e.createdDate,
        e.priority
      );
      notification.id = e.id;
      // notification.important = e.priority == 1 ? true : false ;
      notificationsData.push(notification);
    });
  }
  return notificationsData;
}

export function getNotificationUrgentStatus(
  createdDate,
  priority
): EnumNotificationStatus {
  const REFERENCE = moment(); // fixed just for testing, use moment();
  const TODAY = REFERENCE.clone().startOf('day');
  const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
  const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

  const momentDate = moment(createdDate);
  if (priority === 1) {
    return EnumNotificationStatus.Important;
  } else if (momentDate.isSame(TODAY, 'd')) {
    return EnumNotificationStatus.Today;
  } else if (momentDate.isSame(YESTERDAY, 'd')) {
    return EnumNotificationStatus.Yesterday;
  } else if (momentDate.isAfter(A_WEEK_OLD)) {
    return EnumNotificationStatus.Week;
  } else if (!momentDate.isAfter(A_WEEK_OLD)) {
    return EnumNotificationStatus.PreviousWeeks;
  } else {
    return null;
  }
}
