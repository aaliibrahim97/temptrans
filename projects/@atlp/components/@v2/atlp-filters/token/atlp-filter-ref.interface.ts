import { FormGroup } from "@angular/forms";

export interface AtlpFilterRef {
  getFilterDataFn();
  onResetFilter();
  onSearch();
  onSelectFilter(item: any);
  getFormGroup: () => FormGroup;
  getDisplayValue?: (item: any, itemWithDetails?: any) => any;
  formatApiResponseFn?: (response: any) => any;
}
