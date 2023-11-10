import { Injectable } from '@angular/core';
import { jsonToQueryString } from 'projects/@atlp/core/helpers/utils';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpFilterListRequestModel } from '../interfaces/atlp-saved-filter';

@Injectable({
  providedIn: 'root',
})
export class AtlpFilterApiConfig {
  constructor(private api: AtlpEnvService) {}

  GET_API_BASE_URL = (): string => `${this.api.userPreferenceBaseURL}`;

  GET_FILTERS = (filterRequestModel: AtlpFilterListRequestModel): string =>
    `${this.GET_API_BASE_URL()}v1/Filter/list${jsonToQueryString(
      filterRequestModel
    )}`;

  SAVE_FILTER = (filterListModel: AtlpFilterListRequestModel): string =>
    `${this.GET_API_BASE_URL()}v1/Filter${jsonToQueryString(filterListModel)}`;

  DELETE_FILTER = (
    filterId: string,
    filterRequestModel: AtlpFilterListRequestModel
  ): string =>
    `${this.GET_API_BASE_URL()}v1/Filter/${filterId}${jsonToQueryString(
      filterRequestModel
    )}`;
}
