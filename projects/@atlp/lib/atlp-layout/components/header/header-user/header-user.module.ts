import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderUserComponent } from './header-user.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AvatarsModule } from '../avatars/avatars.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActivitySidebarModule } from 'projects/@atlp/components/activity-sidebar/activity-sidebar.module';
import { ViewAllNotificationsComponent } from './view-all-notifications/view-all-notifications.component';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSidebarModule } from 'projects/@atlp/components';
import { UserManualModule } from 'projects/@atlp/components/user-manual/user-manual.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NotificationsComponent,
    HeaderUserComponent,
    ViewAllNotificationsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    AvatarsModule,
    MatMenuModule,
    ActivitySidebarModule,
    MatBadgeModule,
    TranslateModule.forChild(),
    AtlpSidebarModule,
    UserManualModule,
    MatTabsModule,
    AtlpSidebarV2Module,
    MatButtonModule,
  ],
  exports: [
    HeaderUserComponent,
    MatIconModule,
    FlexLayoutModule,
    MatTabsModule,
    ViewAllNotificationsComponent,
  ],
})
export class HeaderUserModule {}
