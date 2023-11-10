import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from '../lib/atlp-layout/components/header/header-user/services/api-base.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends ApiBaseService {
  UCID: any = null;
  selectedCompanyId: string;
  private userOrganization: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  constructor(private api: AtlpEnvService, private http: HttpClient) {
    super(`Organizations`, api, http, false, true);
  }

  getuserSelectedCompanyID(): any {
    return localStorage.getItem('selectedCompanyID');
  }

  getuserUCID(): any {
    return this.UCID;
  }

  getuserOrganization(): BehaviorSubject<any> {
    return this.userOrganization;
  }

  loadOrganizationDetails() {
    let selectedCompanyId = this.getuserSelectedCompanyID();

    if (selectedCompanyId === undefined) return null;

    this.get(selectedCompanyId)
      .pipe(
        filter((response) => response.success == true),
        map((response) => response.data)
      )
      .subscribe({
        next: (organization) => {
          this.userOrganization.next(organization);
        },
      });
  }
}
