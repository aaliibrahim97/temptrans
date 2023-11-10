export interface AtlpFilterModel {
  filterBy: string;
  displayName?: string;
  filterType: string; //equal, contains, greater than, less than,
  value: any;
  originalVal?: any;
}

export interface AtlpSavedFilter {
  id?: string;
  filterName: string;
  filterTypeName: string;
  searchDate?: string;
  filters: AtlpFilterModel[];
}

export interface AtlpFilterListResponse {
  id: string;
  name: string;
  searchDate: string;
  filters: AtlpFilterModel[];
}

export interface AtlpFilterListRequestModel {
  serviceCode: string;
  subServiceCode: string;
  email: string;
  ucid: string;
}
