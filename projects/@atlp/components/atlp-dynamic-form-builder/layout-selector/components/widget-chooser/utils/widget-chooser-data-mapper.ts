import {
  DynamicAccordionConfig,
  IExpansionWidgetConfig,
} from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-layout.models';
import { IDynamicPageWizard } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-page-wizard.interface';

export class WidgetChooserDataMapper {
  static mapExpansionPanel(pages: IDynamicPageWizard[]): any {
    return null;
  }

  static mapExpansionPanelAccordionConfig(
    pages: IDynamicPageWizard[]
  ): DynamicAccordionConfig[] {
    let accordionConfigCollection: DynamicAccordionConfig[] = [];
    pages.forEach((item) => {
      let pageConfig: IExpansionWidgetConfig =
        item.pageConfig as IExpansionWidgetConfig;
      accordionConfigCollection.push(pageConfig.accordion);
    });
    return accordionConfigCollection;
  }
}
