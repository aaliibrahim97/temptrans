import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { PortalModule } from '@angular/cdk/portal';
import { AtlpRichClassicTableComponent } from './component';
import { AtlpRichClassicTablePipesModule } from './pipes/pipes.module';
import { AtlpPaginationModule } from 'projects/@atlp/components/atlp-pagination/atlp-pagination.module';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpRichTableMileStoneModule } from './component/atlp-rich-table-milestone/atlp-rich-table-milestone.module';
import { AtlpRichClassicControlButtonDialogModule } from './component/atlp-rich-classic-table-control-button-dialog/atlp-rich-classic-table-control-button-dialog.module';
import { MatButtonModule } from '@angular/material/button';
import { AtlpRichTableMileStoneComponent } from './component/atlp-rich-table-milestone/components/atlp-rich-table-milestone.component';
import { AtlpRichClassicTableClickStopPropagation } from './directives/click-stop-propagation.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AtlpRichClassicTableComponent,
    AtlpRichClassicTableClickStopPropagation,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    A11yModule,
    CdkTableModule,
    ScrollingModule,
    PortalModule,
    AtlpRichClassicTablePipesModule,
    AtlpPaginationModule,
    TranslateModule.forChild(),
    AtlpRichTableMileStoneModule,
    AtlpRichClassicControlButtonDialogModule,
    MatTooltipModule,
  ],
  exports: [AtlpRichClassicTableComponent, AtlpRichTableMileStoneModule],
  entryComponents: [AtlpRichTableMileStoneComponent],
})
export class AtlpRichClassicTableModule {}
