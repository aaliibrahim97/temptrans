import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import {
  AtlpFilterListRequestModel,
  AtlpFilterListResponse,
  AtlpFilterModel,
  AtlpSavedFilter,
} from '../interfaces/atlp-saved-filter';
import { IAtlpFilterService } from './atlp-filter.interface';
import { AtlpFilterApiConfig } from '../config/atlp-filter-api.config';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import {
  ISnakBarModelData,
  SnakBarHorizontalPosition,
  SnakBarModelDefaultErrorData,
  SnakBarVerticalPosition,
} from 'projects/@atlp/components/snak-bars/models/snak-bar.models';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';

@Injectable()
export class AtlpFilterService implements IAtlpFilterService, OnDestroy {
  private _unsubscribeAll$ = new Subject<any>();
  atlpFilterListResponse: AtlpFilterListResponse[] = [];
  serviceCode: string;
  subServiceCode: string;
  filterTypeName: string;

  constructor(
    private httpClient: HttpClient,
    private atlpFilterApiConfig: AtlpFilterApiConfig,
    private defaultSnakBar: SnakBarService,
    private userInfoService: UserInfoService,
    private _serviceCode: string,
    private _subServiceCode: string
  ) {
    this.serviceCode = _serviceCode;
    this.subServiceCode = _subServiceCode;
    this.filterTypeName = `ATLP_${_serviceCode}_${_subServiceCode}`;
  }

  getUniqueFilterId(): string {
    return [
      this.serviceCode,
      this.subServiceCode,
      this.userInfoService.email,
      this.userInfoService.UCID || this.userInfoService.userId || 'INDIVIDUAL',
    ]
      .join('_')
      .replace(/\s/g, '')
      .split('-')
      .join('_');
  }

  formatRequestPayloadToString(filters: AtlpFilterModel[]): AtlpFilterModel[] {
    filters.forEach((filter) => {
      filter.value = JSON.stringify(filter.value);
    });
    return filters;
  }

  formatRequestPayloadToJson(filters: AtlpFilterModel[]): AtlpFilterModel[] {
    filters.forEach((filter) => {
      filter.value = JSON.parse(filter.value);
    });
    return filters;
  }

  async saveFilter(
    name: string,
    filters: AtlpFilterModel[]
  ): Promise<AtlpFilterListResponse[]> {
    return new Promise(async (resolve, reject) => {
      const payload: AtlpSavedFilter = {
        id: '',
        filterName: name,
        filterTypeName: this.filterTypeName,
        searchDate: new Date().toISOString(),
        filters: this.formatRequestPayloadToString(filters),
      };

      let filterListModel: AtlpFilterListRequestModel = {
        serviceCode: this.serviceCode,
        subServiceCode: this.subServiceCode,
        email: this.userInfoService.email,
        ucid:
          this.userInfoService.UCID ||
          this.userInfoService.userId ||
          'INDIVIDUAL',
      };

      this.httpClient
        .post<any>(
          this.atlpFilterApiConfig.SAVE_FILTER(filterListModel),
          payload
        )
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe(
          (result) => {
            const mappedNewData: AtlpFilterListResponse = {
              id: result.data,
              name: payload.filterName,
              searchDate: payload.searchDate,
              filters: payload.filters,
            };
            payload.id = result.data;
            this.atlpFilterListResponse.unshift(mappedNewData);
            resolve([...this.atlpFilterListResponse]);
          },
          (error) => {
            const snackBarData: ISnakBarModelData = {
              ...SnakBarModelDefaultErrorData,
              duration: 1500,
              message: 'Failed to save filter. Please try again later...!',
              snakBarHorizontalPosition: SnakBarHorizontalPosition.left,
              snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
            };
            this.defaultSnakBar.warningWithOptions(snackBarData);
            resolve([...this.atlpFilterListResponse]);
          }
        );
    });
  }

  async deleteFilter(id: string) {
    let filterListModel: AtlpFilterListRequestModel = {
      serviceCode: this.serviceCode,
      subServiceCode: this.subServiceCode,
      email: this.userInfoService.email,
      ucid:
        this.userInfoService.UCID ||
        this.userInfoService.userId ||
        'INDIVIDUAL',
    };

    const response = await this.httpClient
      .delete<any>(
        this.atlpFilterApiConfig.DELETE_FILTER(id, filterListModel),
        {}
      )
      .toPromise();
    if (response.success) {
      const removeIndex = this.atlpFilterListResponse
        .map(function (item) {
          return item.id;
        })
        .indexOf(id);
      // remove object
      this.atlpFilterListResponse.splice(removeIndex, 1);
    } else {
      const snackBarData: ISnakBarModelData = {
        ...SnakBarModelDefaultErrorData,
        duration: 1500,
        message: 'Failed to delete filter. Please try again later...!',
        snakBarHorizontalPosition: SnakBarHorizontalPosition.left,
        snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
      };
      this.defaultSnakBar.warningWithOptions(snackBarData);
    }
    return [...this.atlpFilterListResponse];
  }

  getFiltersList(formatApiResponse: any): Observable<AtlpFilterListResponse> {
    let filterListModel: AtlpFilterListRequestModel = {
      serviceCode: this.serviceCode,
      subServiceCode: this.subServiceCode,
      email: this.userInfoService.email,
      ucid:
        this.userInfoService.UCID ||
        this.userInfoService.userId ||
        'INDIVIDUAL',
    };

    return this.httpClient
      .get<any>(this.atlpFilterApiConfig.GET_FILTERS(filterListModel))
      .pipe(
        map((response: any) => {
          let result: AtlpFilterListResponse[] = [];
          result = response.data
            ? response.data.map((dataItem) => {
                let formattedFilterData = dataItem.filters;
                if (formatApiResponse) {
                  formattedFilterData = [];
                  dataItem.filters.forEach((item) => {
                    const formattedObj = formatApiResponse(item);
                    item.originalVal = formattedObj.value;
                    formattedFilterData.push(formattedObj);
                  });
                }
                let mappedObj: AtlpFilterListResponse = {
                  id: dataItem.id,
                  name: dataItem.filterName,
                  searchDate: dataItem.searchDate,
                  filters: this.formatRequestPayloadToJson(formattedFilterData),
                };
                return mappedObj;
              })
            : [];
          this.atlpFilterListResponse = result;
          return [...this.atlpFilterListResponse];
        }),
        catchError((error) => {
          return [];
        })
      );
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
