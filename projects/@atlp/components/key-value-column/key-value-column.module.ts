import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueColumnComponent } from './key-value-column.component';

@NgModule({
  declarations: [KeyValueColumnComponent],
  imports: [CommonModule],
  exports: [KeyValueColumnComponent],
})
export class KeyValueColumnModule {}
