import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManualComponent } from './user-manual.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [UserManualComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    TranslateModule,
    AtlpSidebarV2Module,
    MatMenuModule,
  ],
  exports: [UserManualComponent],
})
export class UserManualModule {}
