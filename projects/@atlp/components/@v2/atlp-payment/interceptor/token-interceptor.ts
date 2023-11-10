import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, concatMap, finalize, take } from 'rxjs/operators';
import { AltpPaymentMethodService } from '../services/altp-payment-method.service';
import { AtlpCommonPaymentAPI } from '../config/payment.config';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';

@Injectable()
export class AtlpPaymentTokenInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;

  private tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(private altpPaymentMethodService: AltpPaymentMethodService,
    private env: AtlpEnvService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url 
      //&& request.url.toLowerCase()
      //.includes(this.env.mPayPaymentPlaceholder)
      
      ) {
      //console.log(request.url.toLowerCase().includes('/mpayapidriven/'));      
      return next.handle(this.addToken(request)).pipe(
        catchError((err) => {
          if (err.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.altpPaymentMethodService.getPaymentToken();
    return token
      ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
      : req;
  }

 

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
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

    return this.altpPaymentMethodService.GetRefreshTokenData().pipe(
      concatMap((res: any) => {

        this.tokenRefreshed$.next(true);
        return next.handle(this.addToken(req));
      }),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }
}
