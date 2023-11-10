import { Injectable } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { DynamicExpansionPanelComponent } from '../components/expansion-panel-widget/components/expansion-panel.component';
import { DynamicFieldsetWidgetComponent } from '../components/fieldset-widget/components/fieldset-widget.component';
import { DynamicStepperWidgetComponent } from '../components/stepper-widget/components/stepper-widget.component';
import { DynamicTabWidgetComponent } from '../components/tab-widget/components/tab-widget.component';
import { WidgetSelectorRegistry } from './widget-selector-registry.service';

@Injectable()
export class DefaultWidgetSelectorRegistry extends WidgetSelectorRegistry {
  constructor() {
    super();

    this.register('expansion-panel', DynamicExpansionPanelComponent);
    this.register('tab', DynamicTabWidgetComponent);
    this.register('fieldset', DynamicFieldsetWidgetComponent);
    this.register('stepper', DynamicStepperWidgetComponent);

    this.setDefaultWidget(DynamicFormComponent);
  }
}
