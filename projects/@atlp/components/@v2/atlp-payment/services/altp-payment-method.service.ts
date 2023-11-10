import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap, timeout } from 'rxjs/operators';
import { AtlpCommonPaymentAPI } from '../config/payment.config';
import { atlpPaymentConstants } from '../constant/constant';
import { PaymentCheckoutModel, TokenResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class AltpPaymentMethodService {
  tokenHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'refresh_token':this.getPaymentRefreshToken(),
  });
  tokenParams = new HttpParams()      
    .set(`expiredToken`, this.getPaymentToken())
    .set(`refreshToken`, this.getPaymentRefreshToken());

  constructor(
    private httpClient: HttpClient,
    private atlpCommonPaymentAPI: AtlpCommonPaymentAPI
  ) {}

  public Listofpaymethods(paymentData): Observable<any> {
    const params = {
      IsMobilePayment: paymentData.isMobilePayment,
      CollectionType: paymentData.collectionType,
      Amount: paymentData.amount,
      ApplyCharges: paymentData.applyCharges,
      OrderId: paymentData.orderId,
      ApplicationName: paymentData.applicationName,
    };
    return this.httpClient.get<any>(
      `${this.atlpCommonPaymentAPI.GET_MPAY_PAYMNET_METHODS_URL(params)}`
    );
  }

  public ListofBanks(bankData): Observable<any> {
    const params = {
      OrderId: bankData.orderId,
      ApplicationName: bankData.applicationName,
    };
    return this.httpClient.get<JSON>(
      this.atlpCommonPaymentAPI.GET_MPAY_PAYMNET_LIST_OF_BANKS_URL(params)
    );
  }

  public PaymentCheckout(payload: PaymentCheckoutModel): Observable<any> {
    return this.httpClient
      .post<any>(
        this.atlpCommonPaymentAPI.POST_MPAY_PAYMNET_CHECKOUT_URL(),
        payload
      )
      .pipe(
        timeout(atlpPaymentConstants.MPAY_API_TIMEOUT),
        catchError((e) => {
          e.message = 'Server not responding, try again!';
          return throwError(e);
        })
      );
  }

  public GetTokenData(): Observable<any> {
    return this.httpClient
      .post<any>(
        this.atlpCommonPaymentAPI.GET_ATLP_PAYMNET_TOKEN(),
        this.tokenParams.toString(),
        { headers: this.tokenHeaders }
      )
      .pipe(
        tap((tokenData) => this.handlePaymentToken(tokenData)),
        shareReplay()
      );
  }

  public GetRefreshTokenData(): Observable<any> {
    return this.httpClient
      .post<any>(
        this.atlpCommonPaymentAPI.GET_ATLP_PAYMNET_TOKEN(),
        this.tokenParams.toString(),
        { headers: this.tokenHeaders }
      )
      .pipe(
        tap((tokenData) => this.handlePaymentToken(tokenData)),
        shareReplay()
      );
  }

  getPaymentToken(): string {
    return localStorage.getItem(atlpPaymentConstants.PAYMENT_TOKEN_KEY);
  }
  getPaymentRefreshToken(): string {
    return localStorage.getItem(atlpPaymentConstants.PAYMENT_REFRESH_TOKEN_KEY);
  }

  handlePaymentToken(tokenData: any): void {
    localStorage.setItem(
      atlpPaymentConstants.PAYMENT_TOKEN_KEY,
      tokenData.access_token
    );
    localStorage.setItem(
      atlpPaymentConstants.PAYMENT_REFRESH_TOKEN_KEY,
      tokenData.refresh_token
    );
  }
  
  public TokenizedCards(email:string, phone:string): Observable<any> {
    const params = {
      Email: email,
      Phone: phone,
    };
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.GET_MPAY_Tokenized_CARDS_LIST(),params );
  }
  public PaymentOTPValidation(referenceNumber:string, otp:string): Observable<any> {
    const params = {
      ReferenceNumber: referenceNumber,
      OTP: otp,
    };
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.GET_MPAY_Payment_OTP_Validation(),params );
  }
  public ProcessOneClickTrans(transRef:string): Observable<any> {
    const params = {
      TransRef:transRef
    };
    return this.httpClient.get<JSON>(
      this.atlpCommonPaymentAPI.GET_MPAY_One_Click_Checkout_URL(params)
    );
  }
  public CreatePaymentOTP(referenceNumber:string, isDeleted:boolean,isResandOTP:boolean): Observable<any> {
    const params = {
      ReferenceNumber: referenceNumber,
      IsDeletedOTP: isDeleted,
      IsResandOTP:isResandOTP
    };
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.GET_Payment_Create_OTP(),params );
  }
  public DeletePaymentToken(paymentToken:string): Observable<any> {
    const params = {
      referenceNumber: paymentToken
    };
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.GET_Payment_Delete_Token()+'?'+paymentToken,params);
  }
  public GetPaymentStatusResponse(transRef:string, secureResponseData:string): Observable<any> {
    
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.GET_MPAY_Payment_Status_Response()+'?transRef='+transRef+'&secureResponseData='+secureResponseData,null );
  }
  public ValidatePaymentRecord(validatePayment:any){
    return this.httpClient.post<any>(
      this.atlpCommonPaymentAPI.POST_MPAY_Validate_Payment_Record(),validatePayment );
  }
}
