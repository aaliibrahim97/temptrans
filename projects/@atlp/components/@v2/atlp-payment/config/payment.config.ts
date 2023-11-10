import { Injectable } from '@angular/core';
import { jsonToQueryString } from 'projects/@atlp/core/helpers/utils';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class AtlpCommonPaymentAPI {
  constructor(private api: AtlpEnvService) {}

  GET_MPAY_PAYMNET_API_BASE_URL = (): string =>
    `${this.api.mPayPaymentBaseUrlV2}`;

  GET_WRAPPER_API_API_BASE_URL = (): string => `${this.api.wrapperApiBaseUrl}`;
  // GET_ATLP_PAYMNET_PLACEHOLDER = (): string => `${this.api.mPayPaymentPlaceholder}`;

  GET_ATLP_PAYMNET_METHODS_URL = (params: any): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/PaymentMethods${jsonToQueryString(
      params
    )}`;

  GET_ATLP_PAYMNET_LIST_OF_BANKS_URL = (params: any): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/BanksList${jsonToQueryString(
      params
    )}`;

  GET_Tokenized_CARDS_LIST = (): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/CardsList`;

  GET_Payment_OTP_Validation = (): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/OTPValidate`;

  // MPAY BASE METHODS
  GET_MPAY_PAYMNET_METHODS_URL = (params: any): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/PaymentMethods${jsonToQueryString(
      params
    )}`;

  GET_Payment_Create_OTP = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}OTP/Create`;

  GET_MPAY_Payment_OTP_Validation = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}OTP/Validate`;

  GET_Payment_Delete_Token = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentProcess/DeleteCustomerPaymentToken`;

  GET_MPAY_Tokenized_CARDS_LIST = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/CardsList`;

  GET_MPAY_One_Click_Checkout_URL = (params: any): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/GetCheckoutURL${jsonToQueryString(
      params
    )}`;

  GET_MPAY_PAYMNET_LIST_OF_BANKS_URL = (params: any): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/BanksList`;

  GET_One_Click_Checkout_URL = (params: any): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/OneClickCheckoutURL${jsonToQueryString(
      params
    )}`;

  POST_ATLP_PAYMNET_CHECKOUT_URL = (): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}api/Create`;

  POST_MPAY_PAYMNET_CHECKOUT_URL = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/GenerateCheckout`;

  GET_ATLP_PAYMNET_TOKEN = (): string =>
    `${this.GET_WRAPPER_API_API_BASE_URL()}Token`;

  GET_MPAY_Payment_Status_Response = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/ValidatePaymentStatus`;
  POST_MPAY_Validate_Payment_Record = (): string =>
    `${this.GET_MPAY_PAYMNET_API_BASE_URL()}PaymentAPI/ValidatePayment`;
}
