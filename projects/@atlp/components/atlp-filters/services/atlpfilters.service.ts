import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SavedFilter } from '../interfaces/savedFilter';

@Injectable({
  providedIn: 'root',
})
export class AtlpFiltersService {
  constructor(private http: HttpClient) {}

  saveFilter(url: string, name: string, filters: any) {
    return this.http.post(url, { name, filters });
  }

  getFiltersList(url, options = {}): Observable<SavedFilter[]> {
    return this.http
      .get<SavedFilter[]>(url, { ...options, observe: 'body' })
      .pipe(
        catchError((error) => {
          return []
          // return of([
          //   <SavedFilter>{
          //     id: '1',
          //     name: 'test',
          //     searchDate: '',
          //     filters: [
          //       {
          //         filterBy: 'id',
          //         filterType: 'contains',
          //         value: '12',
          //       },
          //       {
          //         filterBy: 'name',
          //         filterType: 'like',
          //         value: 'abc',
          //       },
          //     ],
          //   },
          //   <SavedFilter>{
          //     id: '1',
          //     name: 'test2',
          //     searchDate: '',
          //     filters: [],
          //   },
          //   <SavedFilter>{
          //     id: '1',
          //     name: 'test3',
          //     searchDate: '',
          //     filters: [],
          //   },
          // ]);
        })
      );
  }

  deleteSelectedFilter(deleteURL: string, id) {
    if (!deleteURL) {
      return of({ status: false });
    }
    return this.http.delete(deleteURL + id);
  }

  getFilterDetails(url, id) {}
}
