import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from './api-base.service';
@Injectable({
  providedIn: 'root',
})
export class MainLookUpService extends ApiBaseService {
  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private translate: AtlpTranslationService
  ) {
    super(`lookup`, api, http, translate, true);
  }

  getCountries() {
    const params: any = {
      Type: 'Countries_CRM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getCities(countryCode: any) {
    const params: any = {
      Type: 'Cities_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
      filterkey: 'Parent_Name',
      filterValue: countryCode,
    };
    return this.getByParams(params);
  }

  getDocumentTypes() {
    const params: any = {
      Type: 'DocumentTypes_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getVATCategories() {
    const params: any = {
      Type: 'VATCategory_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getLicenseIssuingEmirates() {
    const params: any = {
      Type: 'LicenseIssuingEmirates_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getLicenseIssuingAuthority(emirateName: any) {
    const params: any = {
      Type: 'LicenseIssueAuth_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      filterkey: 'Parent_Name',
      orderBy: 'description',
      filterValue: emirateName,
    };
    return this.getByParams(params);
  }

  getLicenseTypes() {
    const params: any = {
      Type: 'LicenseTypes_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getAreas() {
    const params: any = {
      Type: 'CRM_Area',
      fields: 'lookup_type,name,description,metadata',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getSectors(areaName: any) {
    const params: any = {
      Type: 'CRM_Sectors',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      filterkey: 'Parent_Name',
      orderBy: 'description',
      filterValue: areaName,
    };
    return this.getByParams(params);
  }

  getEstablishmentTypes() {
    const params: any = {
      Type: 'EstablishmentTypes_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getProfiles() {
    const params: any = {
      Type: 'UM_PROFILE',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }

  getwhatTodoTypes() {
    const params: any = {
      Type: 'UM_WhatToDo',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
      filterValue: 'CON',
    };
    return this.getByParams(params);
  }
  getRegServices() {
    const params: any = {
      Type: 'RegServices',
      fields: 'lookup_type,name,children,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
  }
  getLicenseStages() {
    const params: any = {
      Type: 'LicenseStage_UM',
      fields: 'lookup_type,name,description,metadata,parent_Name',
      orderBy: 'description',
    };
    return this.getByParams(params);
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

  getIndividualQuickLinks() {
    const params: any = {
      Type: 'IndividualQuickLinks',
      fields: 'lookup_type,name,description,metadata,parent_Name,children',
      orderBy: 'name',
    };
    return this.getByParams(params);
  }
}
