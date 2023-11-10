import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root',
})
export class LookupService extends ApiBaseService {
  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private translate: AtlpTranslationService
  ) {
    super(`lookUp`, api, http, translate, false, true, false);
  }

  getActivities(
    pageSize: number = 40,
    pageNumber: number = 1,
    search: string = '',
    activityIds: [] = []
  ) {
    return this.getByDescriptor(
      'Activities',
      search,
      activityIds,
      pageSize,
      pageNumber
    );
  }

  getActivitiesLookup(
    pageSize: number = 40,
    pageNumber: number = 1,
    search: string = '',
    activityIds: [] = []
  ) {
    let descriptor = this.createDescriptor(
      search,
      activityIds,
      pageSize,
      pageNumber
    );
    return this.post(descriptor, 'ActivitiesLookup');
  }

  getVATCategories() {
    const params = {
      lookupType: 'VAT_CATEGORY',
    };
    return this.getByParams(params);
  }

  getTermsnConditions(isAR = false) {
    const params = {
      lookupType: isAR ? 'TERMSCONDITION_AR' : 'TERMSCONDITION',
    };
    return this.getByParams(params);
  }

  getTermsnConditionsTitle(isAR = false) {
    const params = {
      lookupType: isAR ? 'TERMSTITLE_AR' : 'TERMSTITLE',
    };
    return this.getByParams(params);
  }

  getCities(CountryCode?) {
    const params = {
      lookupName: CountryCode ? CountryCode : '',
      lookupType: 'CITYLIST',
    };
    return this.getByParams(params);
  }

  getEmiratesList() {
    const params = {
      lookupType: 'EMIRATESLIST',
    };
    return this.getByParams(params);
  }

  getLicenseTypes() {
    const params = {
      lookupType: 'INDUSTRY_TYPE',
    };
    return this.getByParams(params);
  }

  getIssuingAuthority(lookupName) {
    const params = {
      lookupName,
      lookupType: 'LICENSE_ISSUING_AUTHORITY',
    };
    return this.getByParams(params);
  }
}
