import _ from 'lodash';

export const ATLP_INLINE_FILTER_DATA_COL_FILTER = {
  sourceFilterDataList: {},
  filterDataList: [],
};

export const ATLP_INLINE_COMMON_FILTER_DATA = _.cloneDeep({
  selectedFilterItems: [],
  selectedFilterValues: [],
  tempSelectedItems: [],
  filterPayload: null,
  lastfiltereditem: null,
});
