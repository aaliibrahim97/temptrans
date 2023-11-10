import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ManageAccountModel } from '../components/manage-account/manage-account.model';
import { AtlpEnvService } from '../environments/env.service';
import { AtlpTranslationService } from './app-translation.service';

@Injectable({
  providedIn: 'root',
})
export class ManageAccountService {
  selectedLanguage: string;
  openMCCompanyAddress = new BehaviorSubject('default');
  openMCVatInfo = new BehaviorSubject('default');
  openMCTradeLicenseInfo = new BehaviorSubject('default');
  onAccountDetailsUpdated = new BehaviorSubject('default');

  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  public getOrganizationDetails(selectedOrgId: string) {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Organizations/${selectedOrgId}`
    );
  }

  getSubmission(contactID, organizationID) {
    if (organizationID) {
      return this.http.get(
        `${this.api.baseApiUrl}Registrations/contact/${contactID}/submission?organizationID=${organizationID}`
      );
    } else {
      return this.http.get(`${this.api.baseApiUrl}${contactID}/submission`);
    }
  }

  getProfile(contactID, organizationID) {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Organizations/${organizationID}/contact/${contactID}`
    );
  }
  public getContactDetails(contactId: string) {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Registrations/contact/${contactId}`
    );
  }

  mapMainLookUpResponse(obervable: Observable<any>) {
    return obervable.pipe(
      map((response) => this.processMainLookUpresponse(response)),
      catchError((e) => [])
    );
  }

  processMainLookUpresponse(response) {
    var datalist: FilterModel[] = [];
    response.items.forEach((rec) => {
      let f = new FilterModel();
      f.name = rec.name;
      let arabicDesc = rec?.metadata?.find(
        (meta) => meta?.metadata_Type === 'Language'
      )?.data
        ? JSON.parse(
            rec?.metadata?.find((meta) => meta.metadata_Type === 'Language')
              .data
          ).AR
        : rec.description;
      f.description =
        this.selectedLanguage == 'en'
          ? rec.description
          : arabicDesc
          ? arabicDesc
          : rec.description;
      if (
        rec.lookup_Type == 'Countries_CRM' &&
        rec?.metadata?.length &&
        rec?.metadata?.find((meta) => meta.metadata_Type === 'Other_Info')?.data
      ) {
        var metadatainfo = JSON.parse(
          rec?.metadata?.find((meta) => meta.metadata_Type === 'Other_Info')
            .data
        );
        f.name = metadatainfo ? metadatainfo['Country_ISO-2_Code'] : rec.name;
      }
      datalist.push(f);
    });
    return datalist;
  }

  retrieveFromDED(licenseNo: string) {
    return this.http.get(
      `${this.api.baseApiUrl}Registrations/Company/${licenseNo}`
    );
  }

  public updateAccountDetails(
    data: ManageAccountModel.IRegistrationViewModel
  ): Observable<any> {
    return this.http.put(
      `${this.api.baseApiUrl}Registrations/organization/update/1`,
      data
    );
  }
}

export class FilterModel {
  name: string;
  description: string;
  type: string;
}
