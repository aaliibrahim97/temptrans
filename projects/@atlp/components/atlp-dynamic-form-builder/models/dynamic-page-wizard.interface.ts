import { TemplateRef } from '@angular/core';
import { WidgetChooserConfig } from './dynamic-layout.models';
import { DynamicFormFieldBindingEvents } from '../dynamic-core/dynamic-form-field-element-action-core';
import _ from 'lodash';

export interface IDynamicFieldActions {
  [accordionName: string]: {
    [fieldName: string]: DynamicFormFieldBindingEvents;
  };
}

export interface IDynamicExpansionSliderConfig {
  expansionPanelName: string;
  pageConfig: IDynamicPageWizard[];
  actionTemplateRef?: TemplateRef<any>;
  validationMessages?: {};
  dynamicFieldActions?: IDynamicFieldActions;
}

export interface IDynamicPageWizard {
  pageName: string;
  pageConfig: WidgetChooserConfig;
}
