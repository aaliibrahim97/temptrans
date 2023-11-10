import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {
  IUserData,
} from 'projects/@atlp/auth/interfaces';
import { PcsConfigService } from '../pcs-auth/services/pcs-config.service';
import { IHeaders, IParams } from '../interfaces/http-helper.model';
import { ITokenParseModel } from '../interfaces/ITokenParseModel';
import { parseJwt } from '../utils/authHelper';
import { IAuthServiceInterface } from '../interfaces/IAuth-service-interface';

@Injectable({
  providedIn: 'root',
})
export class B2cAuthService implements IAuthServiceInterface {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private http: HttpClient,
    private pcsConfigService: PcsConfigService
  ) {}

  getIsAuthTokenSetStatus$: Observable<boolean>;

  redirectToSsoDashbord(): void {
    throw new Error('Method not implemented.');
  }

  getIsAuthorizedUser(): boolean {
    throw new Error('Method not implemented.');
  }

  getUser(): Observable<IUserData> {
    throw new Error('Method not implemented.');
  }

  userDataFromToken(): ITokenParseModel {
    const authToken = this.getToken();
    if (authToken) {
      const tokenData: ITokenParseModel = parseJwt(authToken);
      return tokenData;
    }
    return null;
  }

  checkIsUserAuthorizedAndSetUserData(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getIsAuthorized(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      concatMap((isAuthenticatedAlready) =>
        isAuthenticatedAlready
          ? of(isAuthenticatedAlready)
          : this.oidcSecurityService.checkAuth()
      ),
      map((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        }
        return false;
      })
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }

  public getToken(): string {
    const token = this.oidcSecurityService.getToken();
    return token;
  }

  public setTokenFromReturnUrl(token: string): void {
    const tokenKey = this.pcsConfigService.getTokenKey();
    window.localStorage.setItem(tokenKey, token);
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
