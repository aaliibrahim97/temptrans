import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAtlpInputLookUpService } from 'projects/@atlp/components/@v2/atlp-lookup/models/atlp-input-lookup.interface';

@Injectable()
export class AtlpLookupPaginationService implements IAtlpInputLookUpService {
  protected fullUrl: string;
  constructor(private _http: HttpClient) {}

  setProps(_fullUrl: string) {
    this.fullUrl = _fullUrl;
  }

  fetch(params?: HttpParams): Promise<any> {
    const query = params.get('query').trim();
    const pageNumber = params.get('pageNumber');
    const pageSize = params.get('pageSize');

    return this._http
      .get<any[]>(this.fullUrl, { params: params })
      .pipe(
        map((result) => {
          if (query) {
            result = result.filter(
              (x) =>
                x.code && x.code.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          }
          if (pageNumber && pageSize) {
            const currentPage = Number(pageNumber) * Number(pageSize);
            return {
              Data: result.slice(
                currentPage,
                Number(currentPage) + Number(pageSize)
              ),
              totalItems: result.length,
            };
          } else {
            return {
              Data: result.slice(0, Number(pageSize)),
              totalItems: result.length,
            };
          }
        })
      )
      .toPromise();
  }
}
