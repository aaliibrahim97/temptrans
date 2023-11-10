import { PaymentProcessStatus } from "../constant/payment.enum";
import { ApiTransModel, BeneficiaryDetailsModel, BillingDetailsModel, MetaDataModel } from "./payment.model";

export class PaymentReceiveModel {
  mpayPayload: MpayPayload;
  totalAmount: number;
  paymentReviewDescription_en?: string;
  paymentReviewDescription_ar?: string;
  paymentProcessStatus: PaymentProcessStatus;
}

export class MpayPayload {
  OrderNumber: string;
  IsModalPayment: boolean;
  IsMobilePayment: boolean;
  UpdateStatusUrl?: string;
  BankID?: string;
  PaymentMethod?: string;
  CollectionType: string;
  MerchantId: string;
  TradeLicenseNumber: string;
  GenerateOrderNo: boolean;
  ApplyCharges: boolean;
  StdReceiptRequired: boolean;
  CreatedBy: string;
  UserEmail?: string;
  EnableEWalletCapture: boolean;
  Amount: number;
  Lang?: string;
  ERPStatus?: string;
  IsSummaryItemDisplay?:boolean;
  ApiTrans: MpayApiTransModel[];
  ApiTransDisplay?:MpayApiTransModelDisplay[];
  BeneficiaryDetails: MpayBeneficiaryDetailsModel[];
  MetaData?: MetaDataModel[];
  BillingDetails?: BillingDetailsModel;
  ApplicationName?: string;
  OneClickTokenId?: string;
  CreatePaymentToken?: boolean;
  DisplayPaymentMethods?:string[]=[];
  TransRef?:string;
}

export class MpayApiTransModel extends ApiTransModel  {
  ItemName_en?: string;
  ItemName_ar?: string;
  ItemDescription_en?: string;
  ItemDescription_ar?: string;
}

export class MpayApiTransModelDisplay   {
  TransactionNumber: string;
  PaidAmount: number;  
  ItemName_en?: string;
  ItemName_ar?: string;
  ItemDescription_en?: string;
  ItemDescription_ar?: string;
}



export class MpayBeneficiaryDetailsModel extends  BeneficiaryDetailsModel{
  PaymentMethod: string;
}



export const PaymentReceiveModelConst: PaymentReceiveModel = {
  mpayPayload: null,
  totalAmount: 0,
  paymentProcessStatus: PaymentProcessStatus.DEFAULT,
};
