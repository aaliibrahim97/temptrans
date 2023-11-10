import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import {
  AtlpLookupId,
  AtlpLookUpMethods,
} from '../models/atlp-lookup-enum.model';
import { IAtlpLookupConstant } from '../models/atlp-lookup-constants.model';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { AtlpIndexDBService } from 'projects/@atlp/services/atlp-index-db.service';
import { jsonToQueryString } from 'projects/@atlp/core/helpers/utils';
import { x_skip_bearer_interceptor } from 'projects/@atlp/auth/interceptor-skipper/interceptor-header-skipper';

@Injectable({
  providedIn: 'root',
})
export class AtlpLookupService {
  httpPostRequest: Observable<object>[] = [];
  httpGetRequest: Observable<object>[] = [];
  lookupHeaderKeys: {};
  constructor(
    private httpClient: HttpClient,
    private atlpIndexDBService: AtlpIndexDBService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    this.lookupHeaderKeys = {};
  }

  withAtlpLookUpConfig(AtlpGenericLookupConstants: {
    [name: string]: IAtlpLookupConstant;
  }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      //this.initializeLookps(AtlpGenericLookupConstants, resolve);
      resolve();
    });
  }

  initializeLookps(AtlpGenericLookupConstants, resolve) {
    for (const lookupKey in AtlpGenericLookupConstants) {
      let lookupObj: IAtlpLookupConstant =
        AtlpGenericLookupConstants[lookupKey];
      if (lookupObj.method === AtlpLookUpMethods.GET) {
        let url = lookupObj.fullApiUrl;

        let httpRequestObj: Observable<object> = this.httpClient.get(url);
        this.httpGetRequest.push(httpRequestObj);
      } else if (lookupObj.method === AtlpLookUpMethods.POST) {
        let url = lookupObj.fullApiUrl;

        let httpRequestObj: Observable<object> = this.httpClient.post(
          url,
          lookupObj.lookupServicePayload
        );
        this.httpPostRequest.push(httpRequestObj);
      }
      // check auth token required or not
      // if (this.authService.getIsAuthorizedUser()) {
      // }else{
      // }

      forkJoin(this.httpPostRequest).subscribe((results) => {
        const AtlpGenericLookupConstantsKeys = this.objectFilter(
          AtlpGenericLookupConstants,
          (lookupItem) => lookupItem.method === AtlpLookUpMethods.POST
        );
        let i = 0;
        results.forEach((responseData) => {
          this.atlpIndexDBService.add(
            AtlpGenericLookupConstantsKeys[i],
            responseData
          );
          i++;
        });
      });
      forkJoin(this.httpGetRequest).subscribe((results) => {
        const atlpGenericLookupConstantsKeys = this.objectFilter(
          AtlpGenericLookupConstants,
          (lookupItem) => lookupItem.method === AtlpLookUpMethods.GET
        );
        let i = 0;
        results.forEach((responseData) => {
          this.atlpIndexDBService.add(
            atlpGenericLookupConstantsKeys[i],
            responseData
          );
          i++;
        });
      });
    }
  }

  getLookupDataGeneric(lookUpObject: IAtlpLookupConstant): Observable<any> {
    let headersForLookUp = {};
    if (lookUpObject.skip_auth) {
      let headers = new HttpHeaders({
        [x_skip_bearer_interceptor]: '',
      });
      headersForLookUp = { headers: headers };
    }
    if (lookUpObject.method === AtlpLookUpMethods.GET) {
      let url = lookUpObject.fullApiUrl;
      if (lookUpObject.lookupServicePayload) {
        const queryParams = jsonToQueryString(
          lookUpObject.lookupServicePayload
        );
        url = `${url}${queryParams}`;
      }
      return this.httpClient.get<any>(url, headersForLookUp);
    } else {
      let url = lookUpObject.fullApiUrl;
      return this.httpClient.post<any>(
        url,
        lookUpObject.lookupServicePayload || {},
        headersForLookUp
      );
    }
  }

  objectFilter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  // usage example
  // const lookupdata = await this.atlpLookupService.getLookUpDataById(
  //   '123',
  //   'Code',
  //   AtlpLookupId.CarAgents
  // );
  async getLookUpDataById(id, idKey, lookupId) {
    const lookupData = await this.atlpIndexDBService.get(lookupId);
    const filteredData = lookupData.Data
      ? lookupData.Data.filter((x) => x[idKey] == id)?.[0]
      : null;
    return filteredData;
  }

  // usage example
  // const lookupdata = await this.atlpLookupService.getLookUpDataByName(
  //   'carAgentEnglishName',
  //   'NameEn',
  //   AtlpLookupId.CarAgents
  // );
  async getLookUpDataByName(name, nameKey, lookupId) {
    const lookupData = await this.atlpIndexDBService.get(lookupId);
    const filteredData = lookupData.Data
      ? lookupData.Data.filter((x) => x[nameKey] == name)?.[0]
      : null;
    return filteredData;
  }
}
