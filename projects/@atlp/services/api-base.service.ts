import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpEnvService } from '../environments/env.service';
import { createLanguageHeader } from '../core/helpers/data.helper';
// @Injectable()
export class ApiBaseService {
  selectedLanguage: string;
  options: any = null;
  constructor(
    private controller: string,
    private envService: AtlpEnvService,
    protected httpClient: HttpClient,
    private atlpTranslationService: AtlpTranslationService,
    private islookup: boolean = false,
    private isUMV1: boolean = false,
    private isV2: boolean = false
  ) {
    atlpTranslationService?.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.options = {
        headers: createLanguageHeader(this.getLang(lang)),
      };
    });
  }

  private getLang(lang) {
    if (lang == 'ar' || lang == 'ae') {
      return 'ar-AE';
    } else {
      return 'en-US';
    }
  }

  protected constructUrl(route?, controllerOverride: string = this.controller) {
    console.info(
      'API: ',
      `${controllerOverride}`,
      `${route ? `/${route}` : ''}`
    );
    if (this.islookup) {
      return `${this.envService.lookupbaseUrl}${controllerOverride}${
        route ? `/${route}` : ``
      }`;
    } else if (this.isUMV1) {
      return `${
        this.envService.UserManagementAPIVersionOne
      }${controllerOverride}${route ? `/${route}` : ``}`;
    }
    // else if (this.isSVM) {
    //   return `${this.envService.MGCoreSVMApiUrl}${controllerOverride}${
    //     route ? `/${route}` : ``
    //   }`;
    // }
    else {
      return `${
        this.isV2
          ? this.envService.usermanagementbaseUrl
          : this.envService.baseApiUrl
      }${controllerOverride}${route ? `/${route}` : ``}`;
    }
  }

  getByDescriptor(
    route?,
    search: string = '',
    activityIds: [] = [],
    pageSize = 40,
    PageIndex = 1
  ) {
    let params = this.createDescriptor(
      search,
      activityIds,
      pageSize,
      PageIndex
    );
    if (this.selectedLanguage == 'ar')
      return this.httpClient.get(this.constructUrl(route ? route : ''), {
        headers: createLanguageHeader('ar-AE'),
        params,
      });
    else
      return this.httpClient.get(this.constructUrl(route ? route : ''), {
        headers: createLanguageHeader('en-US'),
        params,
      });
  }

  getByParams(params, route?): Observable<any> {
    if (this.options)
      this.options = { headers: this.options.header, params: params };
    return this.httpClient.get(this.constructUrl(route ? route : ''), {
      params,
    });
  }

  public get(id?): Observable<any> {
    if (this.options)
      return this.httpClient.get(this.constructUrl(id), this.options);
    else return this.httpClient.get(this.constructUrl(id));
  }

  public post(
    data,
    route?,
    token?,
    code?,
    contact_token?: any
  ): Observable<any> {
    let options: any = {
      headers: {
        selectedLanguage: this.getLang(this.selectedLanguage),
      },
    };
    if (token) {
      options = {
        headers: {
          token,
          code,
          selectedLanguage: this.getLang(this.selectedLanguage),
        },
      };
    }
    if (contact_token) {
      options = {
        headers: {
          'contact-token': contact_token,
          selectedLanguage: this.getLang(this.selectedLanguage),
        },
      };
    }
    return this.httpClient.post(this.constructUrl(route), data, options);
  }

  public put(data, route?, token?, code?): Observable<any> {
    let options: any = {
      headers: {
        selectedLanguage: this.getLang(this.selectedLanguage),
      },
    };
    if (token) {
      options = {
        headers: {
          token,
          code,
          selectedLanguage: this.getLang(this.selectedLanguage),
        },
      };
    }
    return this.httpClient.put(this.constructUrl(route), data, options);
  }

  public delete(id) {
    if (this.options)
      return this.httpClient.delete(this.constructUrl(id), this.options);
    else return this.httpClient.delete(this.constructUrl(id));
  }

  public update(id, param): Observable<any> {
    if (this.options)
      return this.httpClient.put(this.constructUrl(id), param, this.options);
    else return this.httpClient.put(this.constructUrl(id), param);
  }

  createDescriptor(
    search: string = '',
    activityIds: [] = [],
    pageSize = 40,
    PageIndex = 1
  ) {
    let payload: any = {
      pagination: { pageSize: pageSize, PageIndex: PageIndex },
    };

    if (search) {
      payload = {
        ...payload,
        filter: {
          operator: 'and',
          filters: [
            {
              filterBy: 'ActivityName',
              filterType: 'contain',
              value: search || '',
            },
          ],
        },
      };
    }

    if (activityIds && activityIds.length > 0) {
      payload = {
        ...payload,
        filter: {
          operator: 'or',
          filters: activityIds.map((r) => ({
            filterBy: 'ActivityID',
            filterType: 'equal',
            value: r,
          })),
        },
      };
    }
    let params = {
      descriptor: JSON.stringify(payload),
    };
    return params;
  }
}
