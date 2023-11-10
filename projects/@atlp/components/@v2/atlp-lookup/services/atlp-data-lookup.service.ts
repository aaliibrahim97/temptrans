import { Injectable } from '@angular/core';
import { IAtlpLookupConstant } from '../models/atlp-lookup-constants.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { AtlpLookUpMethods } from '../models/atlp-lookup-enum.model';
import { catchError } from 'rxjs/operators';
import { jsonToQueryString } from 'projects/@atlp/core/helpers/utils';
import { AtlpIndexDBService } from 'projects/@atlp/services/atlp-index-db.service';
import { x_skip_bearer_interceptor } from 'projects/@atlp/auth/interceptor-skipper/interceptor-header-skipper';

const atlpDefaultLookUpResponse = {
  data: [],
  msg: null,
  success: true,
  errorList: null,
};

@Injectable({
  providedIn: 'root',
})
export class AtlpLookupDataService {
  lookupHeaderKeys: {};

  constructor(
    private httpClient: HttpClient,
    private atlpIndexDBService: AtlpIndexDBService
  ) {
    this.lookupHeaderKeys = {};
  }

  async initializeLookps(
    AtlpGenericLookupConstants: {
      [name: string]: IAtlpLookupConstant;
    },
    resolve
  ) {
    let httpGetAndPostRequest: Observable<object>[] = [];
    httpGetAndPostRequest = await this.getFromIndexDb(
      AtlpGenericLookupConstants
    );
    if (httpGetAndPostRequest.length > 0) {
      resolve(httpGetAndPostRequest);
      return;
    }

    for (const lookupKey in AtlpGenericLookupConstants) {
      let headersForLookUp = {};

      let lookupObj: IAtlpLookupConstant =
        AtlpGenericLookupConstants[lookupKey];
      if (lookupObj.skip_auth) {
        let headers = new HttpHeaders({
          [x_skip_bearer_interceptor]: '',
        });
        headersForLookUp = { headers: headers };
      }
      if (lookupObj.method === AtlpLookUpMethods.GET) {
        let urlWithQueryParams = '';
        const queryParams = jsonToQueryString(lookupObj.lookupServicePayload);
        urlWithQueryParams = `${lookupObj.fullApiUrl}${queryParams}`;
        headersForLookUp = this.lookupHeaderKeys;

        let httpGetRequestObj: Observable<object> = this.httpClient
          .get(urlWithQueryParams)
          .pipe(catchError((err) => of(atlpDefaultLookUpResponse)));
        httpGetAndPostRequest.push(httpGetRequestObj);
      } else if (lookupObj.method === AtlpLookUpMethods.POST) {
        let url = lookupObj.fullApiUrl;
        let httpPostRequestObj: Observable<object> = this.httpClient
          .post(url, lookupObj.lookupServicePayload, headersForLookUp)
          .pipe(catchError((err) => of(atlpDefaultLookUpResponse)));
        httpGetAndPostRequest.push(httpPostRequestObj);
      }
    }
    forkJoin(httpGetAndPostRequest).subscribe(
      (results) => {
        let i = 0;
        let returnResponse = [];
        const lookUpKeys = Object.keys(AtlpGenericLookupConstants);
        results.forEach((responseData: any) => {
          let lookupName = lookUpKeys[i];
          let lookupObj = {};
          lookupObj[lookupName] = responseData;
          returnResponse.push(lookupObj);
          if (responseData?.Data?.length > 0) {
            this.atlpIndexDBService.add(lookupName, responseData);
          }
          i++;
        });
        resolve(returnResponse);
      },
      (errorResponse) => {
        console.log(
          'Error While loading chassis lookups',
          JSON.stringify(errorResponse)
        );
      }
    );
  }

  async getFromIndexDb(AtlpGenericLookupConstants: {
    [name: string]: IAtlpLookupConstant;
  }) {
    let returnResponse = [];
    try {
      const lookUpKeys = Object.keys(AtlpGenericLookupConstants);
      for (let i = 0; i < lookUpKeys.length; i++) {
        let lookUpData = await this.atlpIndexDBService.get(lookUpKeys[i]);
        if (lookUpData && lookUpData?.Data?.length > 0) {
          let lookupObj = {};
          lookupObj[lookUpKeys[i]] = lookUpData;
          returnResponse.push(lookupObj);
        }
      }
      if (lookUpKeys.length != returnResponse.length) {
        returnResponse = [];
      }
    } catch (error) {
      console.log('Error while getting getFromIndexDb: => ', error);
    }
    return returnResponse;
  }
}
