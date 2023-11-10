import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicIoModule } from './dynamic-io';
import { AtlpDynamicFieldInstanceCreator } from './dynamic.component';

@NgModule({
  imports: [CommonModule, DynamicIoModule],
  exports: [AtlpDynamicFieldInstanceCreator, DynamicIoModule],
  declarations: [AtlpDynamicFieldInstanceCreator],
})
export class DynamicComponentInstanceBuilderModule {}
