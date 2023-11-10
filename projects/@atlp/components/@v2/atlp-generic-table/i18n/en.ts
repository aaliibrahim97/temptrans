import { Locale } from 'projects/@atlp/services/translation-loader.service';

const translations = {
  SEARCH: 'Search',
  ADD_NEW: 'Add New',
  SORT_A_TO_Z: 'Sort A to Z',
  SORT_Z_TO_A: 'Sort Z to A',
  NO_DATA_FOUND: 'No Data Found',
  APPLY: 'Apply',
  CLEAR: 'Clear',
};

export const locale: Locale = {
  lang: 'en',
  data: translations,
};
