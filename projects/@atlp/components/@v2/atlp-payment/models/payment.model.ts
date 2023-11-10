import {
  PaymentExtraChargesTypes,
  PaymentProcessStatus,
} from '../constant/payment.enum';
import { PaymentReceiveModel } from './paymentmet-request.models';

export class PaymentExtraCharges {
  serviceName: PaymentExtraChargesTypes;
  serviceCharge: number;
}
export class PaymentResponseModel {
  msg: string;
  success: boolean;
  data:any;
  errorlst:any
}
export interface IpaymentModel {
  paymentReceiveModel: PaymentReceiveModel;
  checkoutUrl: string;
  paymentMethod: string;
  processingBank: string;
  onlineRefId?: string;
  transRefId?: string;
  chequeDetails?: {
    chequeNumber: string;
    chequeBankName: string;
    chequeDate: string;
    chequeAmount: number;
  };
  OneClickTokenId:string;
  CreatePaymentToken:boolean;

}

export class PaymentMethodResponse {
  PaymentMethod: string;
  ImagePath: string;
  Amount: number;
  ApplyCharges: boolean;
  ChargesConfiguration: PaymentMethodResponseChargesConfiguration;
}

export class PaymentMethodResponseChargesConfiguration {
  ChargesMessage: string;
  FixCharges: number;
  MaqtaVATAmount: number;
  PercentageCharges: number;
  TotalAmount: number;
  VATAmount: number;
}

export interface IApiBaseResponse<T> {
  Data: T;
  Msg?: string;
  Success: boolean;
  Errorlst?: IApiErrorlst[];
}

export interface IApiErrorlst {
  Error: string;
  Value: string;
}

export class BankList {
  BankID: string;
  BankName: string;
  BankName_Ar: string;
  ImagePath: string;
}
export class TokenizedCard{
  CardNumber:string;
  CardType : string;
  SuspendMsg:string;
  IsSuspend:boolean;
  ReferenceNumber:string;
  CardIcon:string;

}
export class PaymentCheckoutModel {
  OrderNumber: string;
  IsModalPayment: boolean;
  IsMobilePayment: boolean;
  UpdateStatusUrl: string;
  BankID: string;
  PaymentMethod: string;
  CollectionType: string;
  MerchantId: string;
  TradeLicenseNumber: string;
  GenerateOrderNo: boolean;
  ApplyCharges: boolean;
  StdReceiptRequired: boolean;
  CreatedBy: string;
  UserEmail: string;
  EnableEWalletCapture: boolean;
  EnableEWalletPayment: boolean;
  EnableCashPayment?: boolean;
  Amount: number;
  ProductId: string;
  Lang?: string;
  ERPStatus?: string;
  IsEmbedded: boolean;
  ChequeNumber?: string;
  ChequeDate?: string;
  ChequeBankName?: string;
  ApiTrans: ApiTransModel[];
  BeneficiaryDetails: BeneficiaryDetailsModel[];
  MetaData: MetaDataModel[];
  BillingDetails: BillingDetailsModel;
  ApplicationName?: string;
  OneClickTokenId?: string;
  CreatePaymentToken?: boolean;
  EnablePaymentTokenization?: boolean;
  TransRef?: string;

}
export class ApiTransModel {
  TransactionID: string;
  TransactionNumber: string;
  PaidAmount: number;
  VATAmount: number;
  VATRate: number;
  RemainingAmount: number;
  Rate: number;
  Quantity: number;
  Organization: string;
  IsExternal: boolean;
  InvoiceNumber: string;
  RevenueAccountCode: string;
  CategoryType: string;
  CategoryValue: string;
  Description?: string;
  TransTypeKey?:string;
}

export class BeneficiaryDetailsModel {
  Amount: number;
  Organization: string;
  TransactionID: string;
  AccountCode: string;
  ServiceID?: string;
}

export class BillingDetailsModel {
  FirstName: string;
  LastName: string;
  Address: string;
  Country: string;
  State: string;
  City: string;
  ZipCode: string;
  Email: string;
  MobileNo: string;
  EmiratesID?: string;
  UAEPassID?: string;

}
export class MetaDataModel {}

export class PaymentCheckoutResponseModel {
  OrderNumber: string;
  CheckoutURL: string;
  TransRef: string;
  msg: string;
  success: boolean;
  IsOneClickTrans: boolean;
  IsOTPSent: boolean;
  IsOneClickOTPEnabled:boolean;
}

export interface IPaymentDialogData {
  OrderNumber: string;
  OnlineRefID: string;
  isSuccess?: boolean;
  amount?: number;
}

export class TokenResponse{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}
