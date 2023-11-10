import { HttpParams } from '@angular/common/http';

export interface IAtlpGenericTableFilterLookupService {
  fetch(params?: HttpParams): Promise<any>;
}
