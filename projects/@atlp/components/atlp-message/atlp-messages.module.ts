import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpCommonMessagesComponent } from './components/messages/atlp-messages.component';
import { MatIconModule } from '@angular/material/icon';
import { AtlpCommonDialogComponent } from './components/common-dialog/atlp-common-dialog.component';
import { AtlpCommonDialogService } from './services/common-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AtlpCommonMessagesComponent, AtlpCommonDialogComponent],
  imports: [CommonModule, MatIconModule, TranslateModule, FormsModule],
  exports: [AtlpCommonMessagesComponent, AtlpCommonDialogComponent],
  providers: [AtlpCommonDialogService],
})
export class AtlpMessagesModule {}
