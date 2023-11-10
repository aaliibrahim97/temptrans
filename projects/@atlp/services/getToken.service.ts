import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAuthServiceInterface } from '../auth/interfaces';
import { PcsConfigService } from '../auth/pcs-auth/services/pcs-config.service';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from '../lib/atlp-layout/components/header/header-user/services/api-base.service';

@Injectable({
  providedIn: 'root',
})
export class getTokenService extends ApiBaseService {
  constructor(
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private api: AtlpEnvService,
    private http: HttpClient,
    private pcsConfigService: PcsConfigService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(`UserManagement/Token`, api, http, false, true);
  }

  getTokenFromService(): Promise<any> {
    // return new Promise<void>((resolve, reject) => {
    //   this.get()
    //     .pipe(
    //       map((res) => {
    //         console.log(res);
    //         res?.token;
    //       }),
    //       catchError((error: any) => {
    //         // if (error?.error?.status && error?.error?.status == '401') {
    //           return of('');
    //         //}
    //       })
    //     )
    //     .subscribe(
    //       (token: string) => {
    //         if (token) {
    //           console.log("token" + token);
    //           localStorage.setItem(this.pcsConfigService.getTokenKey(), token);
    //           resolve();
    //         }else{
    //           console.log("else block redirects to login");
    //           this.document.location.href = this.api.loginUrl;
    //           resolve();
    //         }
    //       }
    //     );
    // });
    return new Promise<void>((resolve, reject) => {
      this.get().subscribe(
        (res: any) => {
          if (res?.token) {
            localStorage.setItem(
              this.pcsConfigService.getTokenKey(),
              res?.token
            );
            resolve();
          } else {
            // localStorage.clear();
            this.authService.logout();
            //this.document.location.href = this.api.loginUrl;
            resolve();
          }
        },
        (error) => {
          console.log('error block');
          // localStorage.clear();
          this.authService.logout();
          //this.document.location.href = this.api.loginUrl;
        }
      );
    });
  }
}
export function getAuthToken(
  getTokenService: getTokenService,
  pcsConfigService: PcsConfigService
): () => Promise<any> {
  // if(!localStorage.getItem(pcsConfigService.getTokenKey())){
  //   console.log("we entered getAuthToken")
  return () => getTokenService.getTokenFromService();
  //  }
  //  else
  //  {
  // console.log("returned empty promise")
  //  return () => Promise.resolve<any>({});
  //  }
}
