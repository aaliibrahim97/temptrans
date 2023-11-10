import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JosoorModel } from '../components/josoor/josoor.model';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class JosoorService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {}

  public getAllBusinessType(): Observable<any> {
    return this.http.get(
      `${this.api.lookupbaseUrl}lookup?Type=JosoorTypeofBusiness&fields=lookup_type,name,description,metadata,parent_Name`
    );
  }

  public getAllSector(): Observable<any> {
    return this.http.get(
      `${this.api.lookupbaseUrl}lookup?Type=JosoorSector&fields=lookup_type,name,description,metadata,parent_Name`
    );
  }

  public getCompanyDetails(orgId, contactID): Observable<any> {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Organizations/${orgId}/contact/${contactID}`
    );
  }

  public saveJosoorDetails(
    data: JosoorModel.IJosoorSaveViewModel
  ): Observable<any> {
    return this.http.post(
      `${this.api.companyInfoBaseUrl}/CompanyInformation/submission`,
      data
    );
  }

  public updateJosoorDetails(
    data: JosoorModel.IJosoorSaveViewModel
  ): Observable<any> {
    return this.http.put(
      `${this.api.companyInfoBaseUrl}/CompanyInformation/update`,
      data
    );
  }

  public getJosoorDetails(ucid: string): Observable<any> {
    return this.http.get(
      `${this.api.companyInfoBaseUrl}/CompanyInformation/companyInfo/${ucid}`
    );
  }
}
