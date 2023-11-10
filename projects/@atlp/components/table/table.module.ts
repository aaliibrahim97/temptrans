import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpTableModeComponent } from './component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VoyageModule } from '../voyage/voyage.module';
import { MatIconModule } from '@angular/material/icon';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { AtlpPipesModule } from 'projects/@atlp/pipes/pipes.module';

@NgModule({
  declarations: [AtlpTableModeComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatCheckboxModule,
    VoyageModule,
    MatIconModule,
    DragDropModule,
    A11yModule,
    CdkTableModule,
    ScrollingModule,
    AtlpPipesModule,
  ],
  exports: [AtlpTableModeComponent],
})
export class AtlpTableModule {}
