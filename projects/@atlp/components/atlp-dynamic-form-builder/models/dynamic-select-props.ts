import { TemplateRef } from '@angular/core';

export interface DynamicSelectProps {
  displayItemFn?: (item: any) => string;
  displayTemplate?: TemplateRef<any>;
  data?: any;
}
