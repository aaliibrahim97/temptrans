import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { IUserData } from '../../interfaces';
import { encode } from '../../utils/authHelper';
import { PcsConfigService } from './pcs-config.service';

declare function deleteIndexDB(): any;
// declare function createIndexDB(): any;

@Injectable({
  providedIn: 'root',
})
export class PcsSecurityService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private pcsConfigService: PcsConfigService,
    private http: HttpClient
  ) {}

  IsAuthorized(): Observable<boolean> {
    const token = this.getToken();
    return of(token != null && token !== '');
  }

  IsAuthorizedUser(): boolean {
    const token = this.getToken();
    return token != null && token !== '';
  }

  UserData(): Observable<IUserData> {
    return this.http
      .get(this.pcsConfigService.getUserInfoUrl(), {
        headers: this.getHeaders(),
      })
      .pipe(
        map((userInfo: any): IUserData => {
          return {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            imgUrl: '',
            companies: [{ name: 'Sharf Shipping', ucid: 'UCA00012' }],
          };
        })
      );
  }

  public refreshToken(): Observable<any> {
    return this.http
      .post(this.pcsConfigService.getRefreshTokenUrl(), {
        expiredToken: this.getToken(),
        refreshToken: this.getRefreshToken(),
        // userName: this.userInfo.username,
      })
      .pipe(
        tap((authData) => this.handleLoginData(authData)),
        shareReplay()
      );
  }

  private handleLoginData(authData): void {
    localStorage.setItem(
      this.pcsConfigService.getTokenKey(),
      authData.tokenString
    );
    localStorage.setItem(
      this.pcsConfigService.getRefreshTokenKey(),
      authData.refreshTokenString
    );
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
    // return this.appendAuthHeader(headers);
  }

  private appendAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.getToken();
    if (token === '') {
      return headers;
    }
    const tokenValue = 'Bearer ' + token;
    return headers.set('Authorization', tokenValue);
  }

  authorize(): void {
    // localStorage.clear();
    // createIndexDB();
    if (location.host == '' || location.host.includes('localhost')) {
      // const redirectUrl = `${this.pcsConfigService.getLoginUrl()}?returnUrl=${encode(
      //   window.location.href
      // )}`;
      const redirectUrl = `${this.pcsConfigService.getLoginUrl()}?returnUrl=${
        window.location.origin + window.location.pathname
      }`;
      window.location.href = redirectUrl;
    } else {
      window.location.href = `${this.pcsConfigService.getLoginUrl()}`;
    }
  }

  redirectToSsoDashboard(): void {
    const ssoDashBoardUrl = this.pcsConfigService.getSsoDashbordUrl();
    window.location.href = ssoDashBoardUrl;
  }

  logoff(): void {
    let selectedLang = localStorage.getItem('selectedLang');
    sessionStorage.clear();
    localStorage.clear();
    // if (deleteIndexDB && this.isFunction(deleteIndexDB)) {
    if (typeof deleteIndexDB != 'undefined') {
      deleteIndexDB();
    }
    if (location.host == '' || location.host.includes('localhost')) {
      //this.document.location.href = `${this.pcsConfigService.getLoginUrl()}`;
      const redirectUrl = `${this.pcsConfigService.getLoginUrl()}?returnUrl=${
        window.location.origin + window.location.pathname
      }`;
      window.location.href = redirectUrl;
      // window.open(redirectUrl, "_self");
      // this.document.location.href = redirectUrl;
    } else {
      const ssoLogOutUrl = this.pcsConfigService.getLogoutUrl(selectedLang);
      window.location.href = ssoLogOutUrl;
      //this.document.location.href = ssoLogOutUrl;
      // window.location.reload();
      // setTimeout(() => {
      //   window.open(ssoLogOutUrl, "_self");
      // },2000);
      // this.http.get(ssoLogOutUrl).subscribe((res) => {
      //   console.log(`ssoLogOutUrl => ${ssoLogOutUrl}`);
      //   console.log(`ssoLogOut Response => ${res}`);
      //   localStorage.clear();
      //   this.document.location.href = `${this.pcsConfigService.getLoginUrl()}`;
      // });
    }
  }

  getToken(): string {
    return localStorage.getItem(this.pcsConfigService.getTokenKey());
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.pcsConfigService.getRefreshTokenKey());
  }

  isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === '[object Function]'
    );
  }
}
