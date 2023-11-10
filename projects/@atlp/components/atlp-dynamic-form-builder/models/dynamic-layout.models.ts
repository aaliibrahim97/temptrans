import { TemplateRef } from '@angular/core';
import { dynamicLayout } from './dynamic-layout.interface';
import { DynamicFormFieldBindingEvents } from '../dynamic-core/dynamic-form-field-element-action-core';
export interface IFieldSetWidgetConfig {
  htmlClass?: string[];
  expandable?: boolean;
  expanded?: boolean;
  readonly?: boolean;
  legend?: {
    sectionTitle?: string;
    labelHtmlClass: string[];
  };
}

export interface DynamicAccordionConfig {
  panelTitle: string;
  panelInfo: string;
  expanded: boolean;
  uniqueAccordionName: string;
  dynamicLayout: dynamicLayout;
  progressPercentage: number;
  dynamicFieldActions: {
    [fieldName: string]: DynamicFormFieldBindingEvents;
  };
  validationMessages: object;
}

export interface IExpansionWidgetConfig {
  isDisabled: boolean;
  buttonTemplates: TemplateRef<any>;
  accordion: DynamicAccordionConfig;
}

export interface ITabWidgetConfig {}

export interface IStepperWidgetConfig {}

export type WidgetChooserConfig =
  | IExpansionWidgetConfig
  | ITabWidgetConfig
  | IStepperWidgetConfig;
