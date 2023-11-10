import { DynamicContainerTypes } from './dynamic-container-types';
import { IDynamicExpansionSliderConfig } from './dynamic-page-wizard.interface';

export interface DynamicWidgetChooserConfig {
  widgetType: DynamicContainerTypes;
  expansionSliderConfig: IDynamicExpansionSliderConfig;
  stylesheets?: string[];
  inlineStyles?: string;
  scripts?: string[];
}
