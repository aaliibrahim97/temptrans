import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFAQFilterModel } from '../models/faq.item';

@Injectable({
  providedIn: 'root',
})
export class AtlpFaqService {
  showDefaultFQAs: boolean;
  apiURL: string;
  filters: IFAQFilterModel[];
  showFAQ = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  public configureFQADetails(
    showDefaultFQAs: boolean,
    apiURL?: string,
    filters?: IFAQFilterModel[]
  ) {
    this.showDefaultFQAs = showDefaultFQAs;
    this.apiURL = apiURL;
    this.filters = filters;
    this.showFAQ.next('show');
  }

  public getFaqList(
    search?: string,
    filters?: any,
    pageSize?: number,
    PageIndex?: number
  ): any {
    if (this.apiURL) {
      let descriptor = this.createDescriptor(
        search,
        filters,
        pageSize,
        PageIndex
      );
      return this.http.get(this.apiURL, descriptor);
    }
  }

  private createDescriptor(
    search: string = '',
    filters: [] = [],
    pageSize: number,
    PageIndex: number
  ) {
    let payload: any = {
      filter: [],
      pagination: { pageSize: pageSize, PageIndex: PageIndex },
    };

    if (search) {
      payload = {
        ...payload,
        filter: [
          {
            operator: 'and',
            filters: [
              {
                filterBy: 'ActivityName',
                filterType: 'contain',
                value: search || '',
              },
            ],
          },
        ],
      };
    }

    if (filters && filters.length > 0) {
      payload = {
        ...payload,
        filter: filters.map((item) => ({
          filterBy: 'Category',
          filterType: 'equal',
          value: item,
        })),
      };
    }
    const httpHeaders = {
      headers: new HttpHeaders({
        'x-descriptor': JSON.stringify(payload),
      }),
    };
    return httpHeaders;
  }
}
