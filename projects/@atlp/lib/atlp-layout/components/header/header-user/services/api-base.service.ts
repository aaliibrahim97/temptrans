import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { createDescriptorHeader } from './data.helper';

// @Injectable()
export class ApiBaseService {
  constructor(
    private controller: string,
    private envService: AtlpEnvService,
    protected httpClient: HttpClient,
    private isnotification: boolean = false,
    private isusermanagement: boolean = false,
    private isSVM: boolean = false
  ) {}

  protected constructUrl(route?, controllerOverride: string = this.controller) {
    // console.info(
    //   'API: ',
    //   `${controllerOverride}`,
    //   `${route ? `/${route}` : ''}`
    // );
    if (this.isnotification) {
      return `${this.envService.notificationBaseUrl}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    } else if (this.isusermanagement) {
      return `${this.envService.usermanagementbaseUrl}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    } else if (this.isSVM) {
      return `${this.envService.svmURL}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    } else {
      return `${this.envService.wrapperApiBaseUrl}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    }
  }

  getByDescriptor(
    route?,
    search: string = '',
    // activityIds: [] = [],
    pageSize = 10,
    PageIndex = 1,
    viewAll = false
  ) {
    let payload: any = {
      pagination: { pageSize, PageIndex },
    };
    let viewUnreadNotificationFilter = [];
    if (!viewAll) {
      viewUnreadNotificationFilter = [
        {
          filterBy: 'read',
          filterType: 'isfalse',
          value: true,
        },
      ];
    }
    payload = {
      ...payload,
      filter: viewUnreadNotificationFilter,
      order: { orderBy: 'read', orderType: 'asc' },
    };
    return this.httpClient.get(this.constructUrl(route ? route : ''), {
      headers: createDescriptorHeader(payload),
    });
  }

  getByParams(params, route?): Observable<any> {
    return this.httpClient.get(this.constructUrl(route ? route : ''), {
      params,
    });
  }

  public get(id?): Observable<any> {
    return this.httpClient.get(this.constructUrl(id));
  }

  public post(data, route?): Observable<any> {
    return this.httpClient.post(this.constructUrl(route), data);
  }

  public put(data, route?): Observable<any> {
    return this.httpClient.put(this.constructUrl(route), data);
  }

  public delete(id) {
    return this.httpClient.delete(this.constructUrl(id));
  }

  public update(id, param): Observable<any> {
    return this.httpClient.put(this.constructUrl(id), param);
  }
}
