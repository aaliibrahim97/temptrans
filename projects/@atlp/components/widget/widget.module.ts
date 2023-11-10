import { NgModule } from '@angular/core';

import { AtlpWidgetComponent } from './widget.component';
import { AtlpWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
  declarations: [AtlpWidgetComponent, AtlpWidgetToggleDirective],
  exports: [AtlpWidgetComponent, AtlpWidgetToggleDirective],
})
export class AtlpWidgetModule {}
