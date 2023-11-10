import { TemplatePortal, DomPortal, ComponentPortal } from "@angular/cdk/portal";

export type AtlpRichClassicTransTablePortalTemplateType =
  | TemplatePortal
  | ComponentPortal<any>
  | DomPortal;
