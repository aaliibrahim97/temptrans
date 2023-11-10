import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAtlpAutocompleteService } from './atlp-auto-complete.interface';

@Injectable({
  providedIn: 'root',
})
export class AtlpAutoCompleteDataService implements IAtlpAutocompleteService {
  protected fullUrl: string;

  constructor(private _http: HttpClient) {}

  setProps(_fullUrl: string) {
    this.fullUrl = _fullUrl;
  }

  fetch(params?: HttpParams): Promise<any> {
    const query = params.get('query');

    return this._http
      .get<any[]>(this.fullUrl, { params: params })
      .pipe(
        map((result) => {
          if (query) {
            return result.filter(
              (x) =>
                x.name && x.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          }
          return result;
        })
      )
      .toPromise();
  }
}
