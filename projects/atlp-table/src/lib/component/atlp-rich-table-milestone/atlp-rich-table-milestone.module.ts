import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { AtlpGraphSelectionModule } from 'projects/@atlp/components/atlp-graph-selection/atlp-graph-selection.module';
import { AtlpRichTableMileStoneComponent } from './components/atlp-rich-table-milestone.component';
import { AtlpProgressBarModule } from 'projects/@atlp/components';

@NgModule({
  declarations: [AtlpRichTableMileStoneComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule.forChild(),
    AtlpSharedModule,
    PortalModule,
    AtlpGraphSelectionModule,
    AtlpProgressBarModule
  ],
  exports: [AtlpRichTableMileStoneComponent],
})
export class AtlpRichTableMileStoneModule {}
