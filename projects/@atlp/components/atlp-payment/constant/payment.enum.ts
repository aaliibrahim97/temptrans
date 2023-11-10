export enum PaymentProcessStatus {
  CHOOSEPAYMENTMETHOD = 'CHOOSEPAYMENTMETHOD',
  CHECKOUT = 'CHECKOUT',
  COMPLETE = 'COMPLETE',
  DEFAULT = 'DEFAULT',
}

export enum PaymentExtraChargesTypes {
  PROCESSING_FEE = 'Processing Fee',
  VAT = 'VAT',
  MAQTA_VAT = 'MAQTA VAT',
  SERVICE_CHARGES = 'Service Charge',
  FIXED_CHARGES = 'Fixed Charge',
}

export enum PaymentBankStatus {
  AUTHORIZED = 'AUTHORIZED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILURE',
}

export enum PaymentMethodNames {
  INTERNETBANKING = 'InternetBanking',
  EWALLET = 'EWallet',
  ECOMMERCE = 'e-Commerce',
  ADPAY= 'ADPay',
  CASH= 'Cash',
  CHEQUE= 'Cheque',
  APPLEPAY= 'ApplePay',
  GOOGLEPAY= 'GooglePay',
  POSTERMINAL= 'Pos Terminal',
  PAYMENTTOKENIZATION= 'PaymentTokenization'

}
