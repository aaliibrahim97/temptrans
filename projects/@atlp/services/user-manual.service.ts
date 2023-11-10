import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUserManual {
  userManualName: string;
  userManualNameAr: string;
  userManualUrl: string;
  userManualUrlAr: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserManualService {
  userManual = new BehaviorSubject<IUserManual[]>([]);
  userManual$ = this.userManual.asObservable();

  constructor() {}

  setUserManuals(userManuals: IUserManual[]) {
    this.userManual.next(userManuals);
  }
}
