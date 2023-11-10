import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAtlpInputLookUpService } from '../../models/atlp-input-lookup.interface';

@Injectable({
  providedIn: 'root',
})
export class InputLookupMockService implements IAtlpInputLookUpService {
  private _productUrl = './assets/data-provider/inputlookup.json'; // fake

  constructor(private _http: HttpClient) {}

  fetch(params?: HttpParams): Promise<any> {
    const query = params.get('query').trim();
    const pageNumber = params.get('pageNumber');
    const pageSize = params.get('pageSize');

    return this._http
      .get<any[]>(this._productUrl, { params: params })
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
        }),
        delay(400)
      )
      .toPromise();
  }
}
