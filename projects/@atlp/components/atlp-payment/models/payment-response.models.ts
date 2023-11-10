export class AtlpPaymentResponseModel {
   data: AtlpPaymentResponseModelItem;
   metaData?: [any];
}

export class AtlpPaymentResponseModelItem {
    OrderNumber: string;
    OnlineRefID: string;
    TotalAmount: number;
    BankStatus: string;
    TransRefID: string;
    PaymentMethod: string;
}
