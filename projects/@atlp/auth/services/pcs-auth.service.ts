import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { IUserData, IAuthServiceInterface } from '../interfaces';
import { PcsSecurityService } from '../pcs-auth/services/pcs-security.service';
import { PcsConfigService } from '../pcs-auth/services/pcs-config.service';
import { IHeaders, IParams } from '../interfaces/http-helper.model';
import { ITokenParseModel } from '../interfaces/ITokenParseModel';
import { parseJwt } from '../utils/authHelper';
import { AuthStatusService } from './auth-status.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';

@Injectable({ providedIn: 'root' })
export class PcsAuthService implements IAuthServiceInterface {
  constructor(
    private pcsSecurityService: PcsSecurityService,
    private http: HttpClient,
    private pcsConfigService: PcsConfigService,
    private authStatusService: AuthStatusService,
    private userInfoService: UserInfoService
  ) {}

  redirectToSsoDashbord(): void {
    this.pcsSecurityService.redirectToSsoDashboard();
  }

  async checkIsUserAuthorizedAndSetUserData(): Promise<boolean> {
    let response: boolean = await new Promise((resolve, reject) => {
      return this.getData(resolve, reject);
    });
    return response;
  }

  getData(resolve, reject) {
    this.getIsAuthorized().subscribe((isAuthorized: boolean) => {
      if (isAuthorized) {
        this.userInfoService
          .setUserInfoFromToken()
          .subscribe((userDetails: any) => {
            resolve(true);
          });
      } else {
        resolve(false);
      }
    });
  }

  getIsAuthorized(): Observable<boolean> {
    return this.pcsSecurityService.IsAuthorized();
  }

  getIsAuthorizedUser(): boolean {
    const isAuthorized = this.pcsSecurityService.IsAuthorizedUser();
    if (isAuthorized) {
      this.authStatusService.setAuthTokenStatus$(true);
    }
    return isAuthorized;
  }

  login(): void {
    this.pcsSecurityService.authorize();
  }

  logout(): void {
    this.pcsSecurityService.logoff();
  }

  getUser(): Observable<IUserData> {
    return this.pcsSecurityService.UserData();
  }

  userDataFromToken(): ITokenParseModel {
    const authToken = this.getToken();
    if (authToken) {
      const tokenData: ITokenParseModel = parseJwt(authToken);
      return tokenData;
    }
    return null;
  }

  getToken(): string {
    const token = this.pcsSecurityService.getToken();
    return token;
  }

  public setTokenFromReturnUrl(token: string): void {
    const tokenKey = this.pcsConfigService.getTokenKey();
    window.localStorage.setItem(tokenKey, token);
    this.authStatusService.setAuthTokenStatus$(true);
  }

  get<T>(url: string, headers?: IHeaders[], params?: IParams[]): Observable<T> {
    return this.http
      .get<T>(url, {
        headers: this.addHttpHeader(headers),
        params: this.addHttpParams(params),
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  put<T>(
    url: string,
    data: any,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<T> {
    const body = JSON.stringify(data);
    return this.http
      .put<T>(url, body, {
        headers: this.addHttpHeader(headers),
        params: this.addHttpParams(params),
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  delete(
    url: string,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<any> {
    return this.http
      .delete(url, {
        headers: this.addHttpHeader(headers),
        params: this.addHttpParams(params),
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  post<T>(
    url: string,
    data: any,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<T> {
    const body = JSON.stringify(data);
    return this.http
      .post<T>(url, body, {
        headers: this.addHttpHeader(headers),
        params: this.addHttpParams(params),
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  private addHttpHeader: (headers: IHeaders[]) => HttpHeaders = (headers) => {
    const myHeader = new HttpHeaders();
    headers.forEach((item) => {
      myHeader.append(item.headerName, item.headerValue);
    });
    return myHeader;
  };

  private addHttpParams: (headers: IParams[]) => HttpParams = (headers) => {
    const myParams = new HttpParams();
    headers.forEach((item) => {
      myParams.append(item.paramName, item.paramName);
    });
    return myParams;
  };
}
