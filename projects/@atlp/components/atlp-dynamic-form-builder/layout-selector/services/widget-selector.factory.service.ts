import { ViewContainerRef, ComponentRef, Injectable } from '@angular/core';
import { DynamicContainerTypes } from '../../models/dynamic-container-types';
import { WidgetSelectorRegistry } from './widget-selector-registry.service';

@Injectable()
export class WidgetSelectorFactory {
  private registry: WidgetSelectorRegistry;

  constructor(registry: WidgetSelectorRegistry) {
    this.registry = registry;
  }

  createWidget(
    container: ViewContainerRef,
    type: DynamicContainerTypes
  ): ComponentRef<any> {
    const componentClass = this.registry.getWidgetType(type);
    return container.createComponent(componentClass);
  }
}
