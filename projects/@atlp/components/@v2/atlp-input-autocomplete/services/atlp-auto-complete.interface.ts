import { HttpParams } from '@angular/common/http';

export interface IAtlpAutocompleteService {
  fetch(params?: HttpParams): Promise<any>;
}
