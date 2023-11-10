import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterCommunicationService  {

  private _filter : any;
  public get filter() : any {
    return this._filter;
  }
  public set filter(v : any) {
    this._filter = v;
  }

}
