import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthServiceInterface } from '../auth/interfaces';
import { AtlpEnvService } from '../environments/env.service';
import { DashboardInstanceStoreService } from '@mg_core/atlp-dashboard-designer';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private dashboardInstanceStoreService: DashboardInstanceStoreService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {}

  public getDashboardAccess(stream: string): Observable<any> {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Dashboard/access/stream/${stream}`
    );
  }

  public getDasboardLayout(id: any): Observable<any> {
    return this.http.get(`${this.api.usermanagementbaseUrl}dashboard/${id}`);
  }

  public getTermsConditions(id: any, fromDashboard?: boolean): Observable<any> {
    const descriptor = {
      Filter: {
        Operator: 'or',
        Filters: [
          { filterBy: 'IsManualTrigger', filterType: 'EQUAL', value: 'false' },
        ],
      },
    };
    if (fromDashboard) {
      return this.http.get(
        `${this.api.usermanagementbaseUrl}dashboard/tc/${id}`,
        {
          context: new HttpContext().set(
            this.dashboardInstanceStoreService
              .DASH_INTERCEPTER_HEADERS_INSTANCE,
            new Map<string, string>().set(
              'x-descriptor',
              JSON.stringify(descriptor)
            )
          ),
        }
      );
    } else {
      const httpHeaders = {
        headers: new HttpHeaders({
          'x-descriptor': JSON.stringify(descriptor),
        }),
      };
      return this.http.get(
        `${this.api.usermanagementbaseUrl}dashboard/tc/${id}`,
        httpHeaders
      );
    }
  }

  public postAcceptTeamsCondition(data: any): Observable<any> {
    return this.http.post(
      `${this.api.usermanagementbaseUrl}dashboard/tc/accept`,
      data
    );
  }
}
