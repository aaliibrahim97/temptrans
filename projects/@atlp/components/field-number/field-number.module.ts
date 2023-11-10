import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldNumberComponent } from './field-number.component';

@NgModule({
  declarations: [FieldNumberComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FieldNumberComponent
  ]
})
export class FieldNumberModule { }
