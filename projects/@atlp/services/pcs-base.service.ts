import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AtlpEnvService } from '../environments/env.service';



// @Injectable()
export class PCSBaseService {
  constructor(
    private controller: string,
    private envService: AtlpEnvService,
    protected httpClient: HttpClient,
    private issenyar : boolean = false,
    private subscription : boolean = false
  ) {
  }

  protected constructUrl(route?, controllerOverride: string = this.controller) {
    console.info(
      'API: ',
      `${controllerOverride}`,
      `${route ? `/${route}` : ''}`
    );

     if(this.issenyar){
      return `${this.envService.SenyarBaseURL}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    }
    else if(this.subscription){
      return `${this.envService.PCSSubscriptionBaseURL}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    }
    else {
    return `${this.envService.baseApiUrl}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    }
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
