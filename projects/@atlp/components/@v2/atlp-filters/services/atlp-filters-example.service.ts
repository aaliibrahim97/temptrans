import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AtlpFilterModel,
  AtlpSavedFilter,
} from '../interfaces/atlp-saved-filter';

@Injectable({
  providedIn: 'root',
})
export class AtlpFiltersService {
  constructor(private http: HttpClient) {}

  saveFilter(url: string, name: string, filters: AtlpFilterModel) {
    return this.http.post(url, { name, filters });
  }

  getFiltersList(url, options = {}): Observable<AtlpSavedFilter[]> {
    return of([
      <AtlpSavedFilter>{
        id: '1',
        filterName: 'test',
        searchDate: '',
        filters: [
          {
            filterBy: 'id',
            filterType: 'contains',
            value: '12',
          },
          {
            filterBy: 'name',
            filterType: 'like',
            value: 'abc',
          },
        ],
      },
      <AtlpSavedFilter>{
        id: '1',
        filterName: 'test2',
        searchDate: '',
        filters: [],
      },
      <AtlpSavedFilter>{
        id: '1',
        filterName: 'test3',
        searchDate: '',
        filters: [],
      },
    ]);
    // return this.http
    //   .get<AtlpSavedFilter[]>(url, { ...options, observe: "body" })
    //   .pipe(
    //     catchError((error) => {
    //       return [];
    //       // return of([
    //       //   <AtlpSavedFilter>{
    //       //     id: '1',
    //       //     name: 'test',
    //       //     searchDate: '',
    //       //     filters: [
    //       //       {
    //       //         filterBy: 'id',
    //       //         filterType: 'contains',
    //       //         value: '12',
    //       //       },
    //       //       {
    //       //         filterBy: 'name',
    //       //         filterType: 'like',
    //       //         value: 'abc',
    //       //       },
    //       //     ],
    //       //   },
    //       //   <SavedFilter>{
    //       //     id: '1',
    //       //     name: 'test2',
    //       //     searchDate: '',
    //       //     filters: [],
    //       //   },
    //       //   <SavedFilter>{
    //       //     id: '1',
    //       //     name: 'test3',
    //       //     searchDate: '',
    //       //     filters: [],
    //       //   },
    //       // ]);
    //     })
    //   );
  }

  deleteSelectedFilter(deleteURL: string, id) {
    if (!deleteURL) {
      return of({ status: false });
    }
    return this.http.delete(deleteURL + id);
  }

  getFilterDetails(url, id) {}
}
