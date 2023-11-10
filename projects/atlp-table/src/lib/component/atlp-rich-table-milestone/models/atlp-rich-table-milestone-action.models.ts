import {
  TemplatePortal,
  DomPortal,
  ComponentPortal,
} from '@angular/cdk/portal';

export type AtlpRichTableMilestoneActionPortalTemplateType =
  | TemplatePortal
  | ComponentPortal<any>
  | DomPortal;
