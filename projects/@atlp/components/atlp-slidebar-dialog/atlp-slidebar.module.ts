import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpSlideBarDialogComponent } from './components/atlp-slidebar-dialog/atlp-slidebar-dialog.component';
import { AtlpDialogInsertionDirective } from './directives/atlp-insertion.directive';
import { AtlpSlideBarCommonMessagesComponent } from './components/atlp-slidebar-messages/atlp-slidebar-common-message/atlp-slidebar-common-message.component';
import { AtlpSlideBarConfirmationComponent } from './components/atlp-slidebar-messages/atlp-slidebar-confirmation-message/atlp-slidebar-confirmation-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatIconSelectorPipe } from './pipes/atlp-mat-icon-selector.pipe';
import { AtlpSlideBarRejectWithReasonComponent } from './components/atlp-slidebar-messages/atlp-slidebar-reject-with-reason/atlp-slidebar-reject-with-reason.component';
import { FormsModule } from '@angular/forms';
import { AtlpConfirmableDecoratorService } from './decorator/atlp-confirmable';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpPipesModule } from 'projects/@atlp/pipes/pipes.module';
import { AtlpSidebarV2Module } from '../@v2/atlp-sidebar/atlp-sidebar.module';

const ATLP_SLIDEBAR_DIALOG_COMPONETNTS = [
  AtlpSlideBarDialogComponent,
  AtlpDialogInsertionDirective,
  AtlpSlideBarCommonMessagesComponent,
  AtlpSlideBarConfirmationComponent,
  AtlpSlideBarRejectWithReasonComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AtlpSidebarV2Module,
    MatIconModule,
    FormsModule,
    TranslateModule,
    AtlpPipesModule,
  ],
  declarations: [...ATLP_SLIDEBAR_DIALOG_COMPONETNTS, MatIconSelectorPipe],
  exports: [
    ...ATLP_SLIDEBAR_DIALOG_COMPONETNTS,
    AtlpSidebarV2Module,
    MatIconSelectorPipe,
  ],
  entryComponents: [AtlpSlideBarDialogComponent],
  providers: [AtlpConfirmableDecoratorService],
})
export class AtlpslidebarDialogModule {
  public constructor(
    atlpConfirmableDecoratorService: AtlpConfirmableDecoratorService
  ) {
    // ^^^ forces an instance to be created, don't remove
  }
}
