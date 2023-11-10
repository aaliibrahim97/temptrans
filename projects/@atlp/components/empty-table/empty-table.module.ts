import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyTableComponent } from './empty-table.component';

@NgModule({
  declarations: [
    EmptyTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmptyTableComponent
  ]
})

export class EmptyTableModule { }
