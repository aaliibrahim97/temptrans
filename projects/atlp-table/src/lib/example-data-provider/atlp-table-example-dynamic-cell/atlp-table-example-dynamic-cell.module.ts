import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpDynamicExampleTableCellComponent } from './components/atlp-table-example-dynamic-cell-status-cell.component';

@NgModule({
  declarations: [AtlpDynamicExampleTableCellComponent],
  imports: [CommonModule, MatIconModule, HttpClientModule, TranslateModule],
  exports: [AtlpDynamicExampleTableCellComponent],
  entryComponents: [AtlpDynamicExampleTableCellComponent],
  providers: [],
})
export class AtlpDynamicExampleTableCellModule {}
