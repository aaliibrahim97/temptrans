import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AtlpEmptyTableModule } from '../atlp-empty-table/atlp-empty-table.module';
import { AtlpMatPaginationModule } from '../atlp-pagination-components/atlp-mat-pagination/atlp-mat-pagination.module';
import { AtlpInputViewTableComponent } from './components/atlp-input-view-table/atlp-input-view-table.component';
import { AtlpViewTableComponent } from './components/atlp-view-table/atlp-view-table.component';

@NgModule({
  declarations: [AtlpViewTableComponent, AtlpInputViewTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule,
    AtlpEmptyTableModule,
    MatButtonModule,
    AtlpMatPaginationModule,
  ],
  exports: [AtlpViewTableComponent, AtlpInputViewTableComponent],
})
export class AtlpMatTableCommonModule {}
