import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpDirectivesModule } from 'projects/@atlp/directives/directives';
import { UserAnnouncementModule } from '../user-announcement/user-announcement.module';
import { FileUploadComponent } from './file-upload.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    AtlpDirectivesModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    UserAnnouncementModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  exports: [FileUploadComponent],
})
export class FileUploadModule {
  /**
   *
   */
  constructor() {}
}
