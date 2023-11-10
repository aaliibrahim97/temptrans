import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpLookupId, AtlpLookUpMethods } from './atlp-lookup-enum.model';

export interface AtlpLookupServicePayload {
  skip?: string;
  take?: string;
  searchString?: string;
  lookupType?: string;
  lookupName?: string;
}

export interface AtlpLookupDynamicFieldsProperty {
  isDynamicFields: boolean;
  keyField: string;
  fieldsToDispalyInUI: string[];
  fieldsToExcludeInPopUp: string[];
}

export interface IAtlpLookupConstant {
  fullApiUrl?: any;
  skip_auth?: boolean;
  lookupId: AtlpLookupId | string;
  sliderId: SidebarName | string;
  lookupTitle: string;
  isServerSidePaginationEnabled?: boolean;
  itemsPerPage: number;
  serviceEndPoint?: string;
  lookupServicePayload?: any; //AtlpLookupServicePayload;
  dynamicFieldsProperty?: AtlpLookupDynamicFieldsProperty;
  method?: AtlpLookUpMethods;
  data?: {
    Data: any[];
  };
  fieldsToDisplayInUI?: string[];
  visibleInputFileds?: [
    {
      english: boolean;
      arabic: boolean;
      englishPlaceHolder?: string;
      arabicPlaceHolder?: string;
    }
  ];
  excludeItemsFromList?: {
    columnName?: string;
    values: string[];
  };
  multipleSelect?: boolean;
  clearButtonHide?: boolean;
  codeReadOnly?: boolean;
  isNoTotalCount?: boolean;
  isVisibleSelectAllRowsCheckBox?: boolean;
  isSeperateColumnSearch?: boolean;
  isDynamicHttpParams?: boolean;
  dynamicHttpParams?: string[];
  isAnonymousDataBindingEnable?: boolean;
  isPreLoadDisabled?: boolean;
  baseUrl?: string;
}

export const defaultLookUpData: IAtlpLookupConstant = {
  lookupId: null,
  sliderId: null,
  lookupTitle: '',
  fullApiUrl: '',
  isServerSidePaginationEnabled: false,
  itemsPerPage: 0,
  serviceEndPoint: '',
  lookupServicePayload: {
    skip: '0',
    take: '10',
    searchString: '',
    lookupType: '',
  },
  method: null,
  fieldsToDisplayInUI: [],
  isVisibleSelectAllRowsCheckBox: false,
};
