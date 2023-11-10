import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitySidebarComponent } from './activity-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [ActivitySidebarComponent],
  imports: [CommonModule, FlexLayoutModule, TranslateModule],
  exports: [ActivitySidebarComponent],
})
export class ActivitySidebarModule {}
