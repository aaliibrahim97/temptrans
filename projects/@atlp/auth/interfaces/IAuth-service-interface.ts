import { IUserData } from './IUserData';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IHeaders, IParams } from './http-helper.model';
import { ITokenParseModel } from './ITokenParseModel';

Injectable();
export interface IAuthServiceInterface {

  getIsAuthorized(): Observable<boolean>;

  checkIsUserAuthorizedAndSetUserData(): Promise<boolean>;

  getIsAuthorizedUser(): boolean;

  login(): void;

  logout(): void;

  redirectToSsoDashbord(): void;

  getUser(): Observable<IUserData>;

  get<T>(url: string, headers?: IHeaders[], params?: IParams[]): Observable<T>;

  put<T>(
    url: string,
    data: any,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<T>;

  delete(
    url: string,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<any>;

  post<T>(
    url: string,
    data: any,
    headers?: IHeaders[],
    params?: IParams[]
  ): Observable<T>;

  setTokenFromReturnUrl(token: string): void;

  userDataFromToken(): ITokenParseModel;
}
