import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';

import { QuickPanelComponent } from 'projects/@atlp/lib/atlp-layout/components/quick-panel/quick-panel.component';

@NgModule({
  declarations: [QuickPanelComponent],
  imports: [
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,

    AtlpSharedModule,
  ],
  exports: [QuickPanelComponent],
})
export class QuickPanelModule {}
