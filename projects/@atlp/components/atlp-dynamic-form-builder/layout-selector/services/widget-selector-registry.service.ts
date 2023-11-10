import { DynamicContainerTypes } from '../../models/dynamic-container-types';

export class WidgetSelectorRegistry {
  private widgets: { [type: string]: any } = {};

  private defaultWidget: any;

  constructor() {}

  setDefaultWidget(widget: any) {
    this.defaultWidget = widget;
  }

  getDefaultWidget() {
    return this.defaultWidget;
  }

  hasWidget(type: DynamicContainerTypes) {
    return this.widgets.hasOwnProperty(type);
  }

  register(type: DynamicContainerTypes, widget: any) {
    this.widgets[type] = widget;
  }

  getWidgetType(type: DynamicContainerTypes): any {
    if (this.hasWidget(type)) {
      return this.widgets[type];
    }
    return this.defaultWidget;
  }
}
