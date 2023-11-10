import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentOutletInjectorModule } from '../component-injector';
import { AtlpDynamicAttributesDirective } from './dynamic-attributes.directive';

@NgModule({
  imports: [CommonModule],
  exports: [AtlpDynamicAttributesDirective, ComponentOutletInjectorModule],
  declarations: [AtlpDynamicAttributesDirective],
})
export class AtlpDynamicAttributesModule {}
