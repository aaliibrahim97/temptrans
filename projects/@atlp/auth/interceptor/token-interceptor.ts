import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, concatMap, finalize, take } from 'rxjs/operators';
import { IAuthServiceInterface } from '../interfaces';
import { PcsSecurityService } from '../pcs-auth/services/pcs-security.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { x_skip_bearer_interceptor } from '../interceptor-skipper/interceptor-header-skipper';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  selectedLanguage: string;
  private tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private pcsSecurityService: PcsSecurityService,
    private defaultSnak: SnakBarService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    atlpTranslationService?.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers && request.headers.has(x_skip_bearer_interceptor)) {
      const headers = request.headers.delete(x_skip_bearer_interceptor);
      return next.handle(request.clone({ headers }));
    }

    // this interceptor is not required in Business Portal, added a check to remove it
    if (request.headers.get('AppName') === 'BU') {
      return next.handle(request);
    }

    // request.headers.append('selectedCompanyID',"12312313");

    if (request.url && request.url.toLowerCase().includes('/api/')) {
      return next.handle(this.addToken(request)).pipe(
        catchError((err) => {
          if (err.status === 401 && this.pcsSecurityService.getRefreshToken()) {
            this.authService.logout();
            // return this.handle401Error(request, next);
          } else if (err.status === 403) {
            this.defaultSnak.error('User Not Authorized');
            this.authService.login();
          }
          return throwError(err);
        })
      );
    } else {
      //don't delete later we will enable for gzip
      // return next.handle(
      //   request.clone({
      //     setHeaders: {
      //       'Content-Encoding': 'gzip',
      //     },
      //   })
      // );
      return next.handle(request);
    }
  }

  private getLang(lang) {
    if (lang == 'ar' || lang == 'ae') {
      return 'ar-AE';
    } else {
      return 'en-US';
    }
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.pcsSecurityService.getToken();
    const selectedCompanyID = localStorage.getItem('selectedCompanyID');
    // For Gzip compression
    // Content-Encoding: gzip
    if (selectedCompanyID) {
      return token
        ? req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token,
              'x-selected-org': selectedCompanyID,
              selectedLanguage: this.getLang(this.selectedLanguage),
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0',
            },
          })
        : req.clone({
            setHeaders: {
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0',
            },
          });
    } else {
      return token
        ? req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token,
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0',
            },
          })
        : req.clone({
            setHeaders: {
              'Cache-Control': 'no-store, no-cache,  max-age=0',
              Pragma: 'no-cache',
              Expires: '0',
            },
          });
    }
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (this.isRefreshingToken) {
      return this.tokenRefreshed$.pipe(
        // filter(Boolean),
        take(1),
        concatMap(() => next.handle(this.addToken(req)))
      );
    }

    this.isRefreshingToken = true;

    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    this.tokenRefreshed$.next(false);

    return this.pcsSecurityService.refreshToken().pipe(
      concatMap((res: any) => {
        this.tokenRefreshed$.next(true);
        return next.handle(this.addToken(req));
      }),
      catchError((err) => {
        this.authService.logout();
        return throwError(err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }
}

export const createLanguageHeader: (lang: any) => HttpHeaders = (lang) => {
  return new HttpHeaders().set('selectedLanguage', lang);
};
