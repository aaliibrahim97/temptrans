import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAnnouncementComponent } from './user-announcement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserAnnouncementComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [
    UserAnnouncementComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class UserAnnouncementModule {}
