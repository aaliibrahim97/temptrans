import { ComponentPortal } from '@angular/cdk/portal';
import { AtlpGenericTableInlineFilter } from '../shared/inline-filter/atlp-generic-table-inline-filter.component';

export interface IAtlpInlineFiltersPortalInstance {
  filterName: string;
  filterInstance: ComponentPortal<AtlpGenericTableInlineFilter>;
}
