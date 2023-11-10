import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStatusService {
  private isAuthTokenSet$ = new BehaviorSubject(false);
  constructor() {}

  setAuthTokenStatus$(authStatus: boolean) {
    this.isAuthTokenSet$.next(authStatus);
  }

  get getIsAuthTokenStatus$(): Observable<boolean> {
    return this.isAuthTokenSet$;
  }
}
