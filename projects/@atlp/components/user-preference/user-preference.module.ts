import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';
import { UserPreferenceComponent } from './user-preference.component';
import { UserDetailsModule } from '../user-details/user-details.module';
import { ThemePreferenceModule } from '../theme-preference/theme-preference.module';
import { UserPreferenceRoutingModule } from './user-preference.routing';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';

@NgModule({
  declarations: [UserPreferenceComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    TranslateModule,
    UserPreferenceRoutingModule,
    AtlpSidebarV2Module,
    ThemePreferenceModule,
    UserDetailsModule,
  ],
  providers: [FileUploadService],
  exports: [UserPreferenceComponent],
})
export class UserPreferenceModule {}
