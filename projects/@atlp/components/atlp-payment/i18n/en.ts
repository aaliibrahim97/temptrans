import { Locale } from "projects/@atlp/services/translation-loader.service";
import { PaymentExtraChargesTypes } from "../constant/payment.enum";

export const locale: Locale = {
  lang: "en",
  data: {
    REVIEWCART_MAINTITLE: "Payment Checkout",
    REVIEWCART_PLEASE_REVIEW_YOUR_CART: "Please review your Payment details", 
    REVIEWCART_DESCRIPTION:"Before you go to payment, please review your payment details. Click on Cancel to go back. Click on Pay to proceed to checkout",
    REVIEWCART_TRANSACTION_REFERENCE_NO: "Order Number",
    REVIEWCART_AMOUNT_TO_PAY: "Amount to Pay", 
    PAYMENTMETHOD_PLEASESELECTAPAYMENTMETHOD: "PLEASE SELECT A PAYMENT METHOD",
    PAYMENTMETHOD_CREDITCART: "CREDIT / DEBIT CARD",
    PAYMENTMETHOD_INTERNET_BANKING: "INTERNET BANKING",
    PAYMENTMETHOD_EWALLET: "E WALLET", 
    PAYMENTMETHOD_ADPAY:"AD PAY",
    PAYMENTMETHOD_CASH:"CASH", 
    PAYMENTMETHOD_CHEQUE:"CHEQUE", 
    PAYMENTMETHOD_APPLEPAY:"APPLE PAY", 
    PAYMENTMETHOD_GOOGLEPAY:"GOOGLE PAY", 
    PAYMENTMETHOD_POSTERMINAL:"POS TERMINAL",     
    PAYMENTMETHOD_PAYMENTTOKENIZATION:"PAYMENT TOKENIZATION", 
    PAYMENTMETHOD_TOTAL_AMOUNT_TO_PAY:"Total Amount To Pay",  
    PAYMENTMETHOD_SELECTABANK: "SELECT A BANK",
    PAYMENTMETHOD_PAYNOW: "Pay now",
    PAYMENTMETHOD_CANCEL: "Cancel",
    PAYMENTMETHOD_BANKLIST_ERROR:"Bank List retrieval failed...! Please try again",   
    PAYMENT_REVIEW_PROCESSINGFAILED_MESSAGE:"Payment Processing failed...! Please try again",
    PAYMENTMETHOD_GETPAYMENTRETRIEVAL_FAILED:"Get payment methods retrieval failed...! Please try again",
    PAYMENTMETHOD_SESSION_EXPIRED:"Session expired or User not Authenticated",
    PAYMENTMETHOD_CHOOSEPAYMENTMETHOD_TOCONTINUE:"Choose one payment method to Continue",
    PAYMENTMETHOD_CHOOSEONEBANKTOCONTINUE: "Choose one bank to Continue",
    PAYMENTMETHOD_ENTER_CHEQUE_DETAILS: "ENTER CHEQUE DETAILS",   
    PAYMENTMETHOD_CHEQUE_NUMBER: "Cheque Number",   
    PAYMENTMETHOD_BANK_NAME: "Bank Name",   
    PAYMENTMETHOD_CHEQUE_DATE: "Cheque Date",   
    PAYMENTMETHOD_CHEQUE_AMOUNT: "Cheque Amount",        
    PAYMENTMETHOD_TOTAL_AMOUNT_DUE: "Total Amount Due",
    PAYMENTMETHOD_MSG_VALIDATION_ERROR: "Validation Error",    
    PAYMENTMETHOD_MSG_DATA_MISSING: "Payment data is missing.",
    PAYMENTMETHOD_MSG_INVALID_STATUS: "Payment data has invalid paymentProcessStatus information.",    
    PAYMENTMETHOD_MSG_NO_ITEMS: "Payment data has no items in it.",
    PAYMENTMETHOD_MSG_APPLYCHARGES: "Payment data has no applyCharges value.",       
    PAYMENTMETHOD_MSG_NO_COLLECTIONTYPE: "Payment data has no collectionType value.",
    PAYMENTMETHOD_MSG_NO_ISMOBILE: "Payment data has no isMobilePayment value.",   
    PAYMENTMETHOD_MSG_NO_REF_NUMBER: "Payment data has no referenceNumber value.", 
    PAYMENTMETHOD_MSG_INVALID_AMOUNT: `Payment data has invalid totalAmount. 
    Payment cannot process with zero amount.`,
    PAYMENTMETHOD_MSG_ITEM_ERROR: "Some mandatory data in payment items is missing.",
    PAYMENTMETHOD_MSG_CHEQUE_NUMBER_ERROR: "Cheque Number is required",
    PAYMENTMETHOD_MSG_CHEQUE_BANK_NAME: "Cheque Bank Name is required",
    PAYMENTMETHOD_MSG_CHEQUE_DATE: "Cheque Date is required",        
    PAYMENTMETHOD_MSG_CHEQUE_AMOUNT: "Cheque Amount is required",     
    PAYMENTMETHOD_PRODUCTID_INDIVIDUAL: "Individual",    
    PAYMENTMETHOD_PRODUCTID_CORPORATE: "Corporate",    
    PAYMENTMETHOD_MSG_MODAL_PAYMENT: "Modal Payment Information is missing.",
    PAYMENTMETHOD_MSG_GENERATE_ORDERNO: "GenerateOrderNo Information is missing.", 
    PAYMENTMETHOD_MSG_STANDARD_RECEIPT: "Standard Recipt Required Information is missing.",             
    PAYMENTMETHOD_MSG_EWALLET_CAPTURE: "Enable EWallet Capture Information is missing.",
    PAYMENTMETHOD_MSG_MERCHANT_ID: "Merchant Id Information is missing.", 
    PAYMENTMETHOD_MSG_CREATED_BY: "Created By Information is missing.",
    PAYMENTMETHOD_MSG_TRADE_LICENSE_NUMBER: "Trade License Number Information is missing.",               
    PAYMENTMETHOD_MSG_BENEFICIARY_DETAILS: "Mandatory information in Beneficiary details missing.",    
    PAYMENTMETHOD_MSG_PRODUCTID: "Choose Individual or Corporate option before checkout.", 
    PAYMENTMETHOD_MSG_CHEQUE: "Cheque details are incomplete, Kindly check and continue.",        
    PAYMENTMETHOD_EXTRA_FIXED_CHARGES:PaymentExtraChargesTypes.FIXED_CHARGES,
    PAYMENTMETHOD_EXTRA_PROCESSING_FEE:PaymentExtraChargesTypes.PROCESSING_FEE,
    PAYMENTMETHOD_EXTRA_VAT:PaymentExtraChargesTypes.VAT,
    PAYMENTMETHOD_EXTRA_SERVICE_CHARGES:PaymentExtraChargesTypes.SERVICE_CHARGES,
    PAYMENTMETHOD_EXTRA_MAQTA_VAT:PaymentExtraChargesTypes.MAQTA_VAT,
    PAYMENT_DIALOG_TITLE:"Payment Details",
    PAYMENT_DIALOG_SUBTITLE:"Before you close you can copy your payment details to clip board, by clicking copy button below.",
    PAYMENT_DIALOG_PAYMENT_STATUS:"Payment Status",
    PAYMENT_DIALOG_SUCCESS:"Success",
    PAYMENT_DIALOG_FAILED:"Failed",
    PAYMENT_DIALOG_ONLINE_REF_NO:"Online Reference ID Number",
    PAYMENT_DIALOG_AMOUNT_PAID:"Amount Paid",
    PAYMENT_DIALOG_COPY_PAYMENT_DETAILS:"Copy Payment Details",
    PAYMENT_DIALOG_CLOSE:"Close",
    PAYMENT_DIALOG_COPIED_TO_CLIPBOARD:"Payment data copied to clipboard.",
    PAYMENT_DIALOG_PAYMENT_SUCCESS:"Payment success",   
    PAYMENT_DIALOG_PAYMENT_FAILED_MSG:"Payment failed...! Kindly contact ADport service desk.",
    TIME_OUT_MSG:"Server not responding, try again later.",
    TOKENIZED_CARD_DELETION_CONFORMATION:"Are you sure you want to delete the card?",
    TOKENIZED_CARD_DELETION_SUCCESSFULLY:"Card deleted successfully",
    TOKENIZED_CARD_DELETION_Failed:"The card deletion failed, Please try again!",
    TOKENIZED_VERIFICATION_CODE:"VERIFICATION CODE",
    TOKENIZED_CARD_DELETION_VALIDATION:"Select a card from the list",
    CASH_PAYMENT_CONFIRMATION_MESSAGE:"Please confirm the payment is received from the customer?"

  },
};
