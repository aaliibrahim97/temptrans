import { HttpParams } from '@angular/common/http';

export interface IAtlpInputLookUpService {
  fetch(params?: HttpParams): Promise<any>;
}
