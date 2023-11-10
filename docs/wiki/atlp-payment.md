# ATLP Payment Module

ATLP Payment Module is used to process different payment methods using api call back with Mpay Team. The Payment methods which are intergrated now are as below:

- Credit card.
- Internet Banking.
- EWallet.
- Cash
- AD Pay

## How to use

Include in your html component:

```html
<atlp-sidebar
  class="sidebar-with-content"
  [name]="SidebarName.choosePaymentMethod"
  position="right"
  [folded]="false"
  [invisibleOverlay]="true"
  [superimposed]="true"
>
  <app-payment-review-methods
    *ngIf="paymentData.paymentProcessStatus != 'DEFAULT'"
    class="app-payment-review-cart"
    [paymentReceiveModel]="paymentData"
    (postPaymentStatus)="postPaymentStatus($event)"
    (closePaymentProcess)="closePaymentProcess($event)"
  >
  </app-payment-review-methods>
</atlp-sidebar>
```

three new sidebarname enums added to the main atlp project. those are:

> - choosePaymentMethod
> - paymentCheckout
> - paymentComplete

## Input Parameters

- <b>paymentReceiveModel</b>:
  input tag is <b>paymentReceiveModel</b> , it is used to pass payment information to the component:

```html
<app-payment-review-methods [paymentReceiveModel]="paymentData">
  . . .</app-payment-review-methods
>
```

Fields inside object <b>paymentReceiveModel</b>

- <b>totalAmount</b>: (mandatory) Total amount of all items fr payment with out extra charges;
- <b>paymentProcessStatus</b>: (mandatory) Different status of the payment. it is enum with following values [DEFAULT, CHOOSEPAYMENTMETHOD, CHECKOUT, COMPLETE];
- <b>mpayPayload</b>: (mandatory) Details of the payment.
  > Structure of <b>mpayPayload</b> object
  >
  > - <b>OrderNumber</b>: (mandatory) Unique identifier to link payment with mapy records.
  > - <b>IsModalPayment</b>: (mandatory) Identifies if it is Modal payment or not,Possible values (true/ false);
  > - <b>isMobilePayment</b>: (mandatory) Identifies if it is mobile payment or not, Possible values (true/ false);
  > - <b>UpdateStatusUrl</b>: (optional) Url to update application records after payment;
  > - <b>BankID</b>: (optional) it will be seleted once user selects payment method and bank;
  > - <b>PaymentMethod</b>: (optional) it will be seleted once user selects payment method;
  > - <b>CollectionType</b>: (mandatory) Unique key specfic to application provided by Mpay;
  > - <b>MerchantId</b>: (mandatory) MerchantId specfic to application provided by Mpay;
  > - <b>TradeLicenseNumber</b>: (mandatory) User's UCID while doing payment;
  > - <b>GenerateOrderNo</b>: (mandatory) if true Order no will be created by Mapy Team,Possible values (true/ false);
  > - <b>ApplyCharges</b>: (mandatory) Extra charges need to be applied or not by Mapy, Possible values (true/ false) ;
  > - <b>StdReceiptRequired</b>: (mandatory) If true recipt can be viewed and downloadable,Possible values (true/ false);
  > - <b>CreatedBy</b>: (mandatory) specfic username of the user;
  > - <b>UserEmail</b>: (optional) specfic email of user or appliction;
  > - <b>Lang</b>: (optional) Current culture info;
  > - <b>EnableEWalletCapture</b>: (mandatory) if true the status information received in eventlistner;
  > - <b>Amount</b>: (mandatory) Total amount of all items for payment, only number;
  > - <b>ApiTrans</b>: (mandatory) Array of items in the payment list
  >   > Structure of <b>ApiTrans</b> object
  >   >
  >   > - <b>name_en</b>: (optional) Item name english;
  >   > - <b>name_ar</b>: (optional) Item name arabic;
  >   > - <b>TransactionID</b>: (mandatory) Id for item;
  >   > - <b>TransactionNumber</b>: (mandatory) Id for item;
  >   > - <b>PaidAmount</b>: (mandatory) Amount of Item, only number;
  >   > - <b>VATAmount</b>: (mandatory) VAT of Item , zero if nothing, only number;
  >   > - <b>VATRate</b>: (mandatory) VAT Rate in percentage of Item,, zero if nothing, only number;
  >   > - <b>RemainingAmount</b>: (mandatory) Remaining amount of Item, zero if nothing, only number;
  >   > - <b>Rate</b>: (mandatory) Rate of Item, only number;
  >   > - <b>quantity</b>: (mandatory) Quantity of Item, only number;
  >   > - <b>Organization</b>: (mandatory) Organization information;
  >   > - <b>IsExternal</b>: (mandatory) IsExternal information;
  >   > - <b>InvoiceNumber</b>: (mandatory) InvoiceNumber information;
  >   > - <b>RevenueAccountCode</b>: (mandatory) RevenueAccountCode information;
  >   > - <b>CategoryType</b>: (mandatory) CategoryType information;
  >   > - <b>CategoryValue</b>: (mandatory) CategoryValue information;
  >   > - <b>Description</b>: (mandatory) Description information;
  >   >
  >   > ***
  > - <b>BeneficiaryDetails</b>: (mandatory) Array of BeneficiaryDetails in the payment. Specific to the payment methods in a COllection Type.
  >   > Structure of <b>BeneficiaryDetails</b> object
  >   >
  >   > - <b>PaymentMethod</b>: (mandatory) Details specfic to payment method;
  >   > - <b>Amount</b>: (mandatory) Amount of Item, only number;
  >   > - <b>Organization</b>: (mandatory) Organization information.Fixed value "Abu Dhabi Port";
  >   > - <b>TransactionID</b>: (mandatory) TransactionID for Beneficiary;
  >   > - <b>AccountCode</b>: (mandatory) AccountCode for ewallet.(noqudi);
  >   > - <b>ServiceID</b>: (optional) Specific to payment method;
  >   >
  >   > ***
  > - <b>MetaData</b>: (optional) Array field to pass some information;
  > - <b>BillingDetails</b>: (optional) billing details can be supplied here or if it is empty will be asked in the payment checkout screen;
  >   > Structure of <b>BillingDetails</b> object. All fields are self explanatory
  >   >
  >   > - FirstName:
  >   > - LastName:
  >   > - Address:
  >   > - Country:
  >   > - State:
  >   > - City:
  >   > - ZipCode:
  >   > - Email:
  >   > - MobileNo:
  >   > - EmiratesID:
  >   > - UAEPassID:
  >   >
  >   > ***

### sample payment Data

```json
{
      totalAmount: 10.00,
      paymentProcessStatus: PaymentProcessStatus.CHOOSEPAYMENTMETHOD,
      mpayPayload: {
        OrderNumber: "REF23456",
        IsModalPayment: true,
        IsMobilePayment: false,
        UpdateStatusUrl: "",
        BankID: "",
        PaymentMethod: "",
        CollectionType: "Appointment Collection",
        MerchantId: "MGMERC00002",
        TradeLicenseNumber: "00150230",
        GenerateOrderNo: false,
        ApplyCharges: true,
        StdReceiptRequired: true,
        CreatedBy: "username",
        UserEmail: "test@test.com",
        EnableEWalletCapture: true,
        Lang:"en",
        Amount: 10.00,
        ApiTrans: [
          {
            TransactionID: "REF23456",
            TransactionNumber: "REF23456",
            PaidAmount: 10.00,
            VATAmount: 0,
            VATRate: 0,
            RemainingAmount: 0,
            Rate: 10.00,
            Quantity: 1,
            Organization: "",
            IsExternal: true,
            InvoiceNumber: "REF23456",
            RevenueAccountCode: "",
            CategoryType: "",
            CategoryValue: "",
            Description: "",
            ItemName_en:"Test item",
            ItemName_ar:"Test item",
          }
        ],
        BeneficiaryDetails: [{
          PaymentMethod:"EWallet"
          AccountCode:"9910214900501",
          Amount:10.00,
          Organization:"Abu Dhabi Port",
          TransactionID:"REF23456"
        }],
        MetaData: [],
        BillingDetails: null,
      },
    };
```

---

After filling the model we have to call below function to start payment process
` this.toggleSidebarOpen(SidebarName.choosePaymentMethod);`

## Output Parameters

- postPaymentStatus: Output function to pass the message event after payment is finished.
- closePaymentProcess: Output function to get event when payment summary information screen is closed.

```html
<app-payment-review-methods
  (postPaymentStatus)="postPaymentStatus($event)"
  (closePaymentProcess)="closePaymentProcess($event)"
></app-payment-review-methods>
```

```javascript
postPaymentStatus(event) {
    //console.log('Final payment status',event);
  }
closePaymentProcess(event) {
    //console.log('Payment close event received', event);
  }

```

## Types of Payment

There are mainly two types payment possible or configured in ATLP modules using this payment module.

Pre Payment: Here payment is collected up front or prior to service submission; but not against an invoice
Post Payment: This payment is done after an invoice is ready with us, which happens only after the submission of a service.

In either case, we can prepare the payment data ready with UI (either UI or API can prepare this payload) and hand over the same to 'app-payment-review-methods' component. After the payment is completed through portal, the calling parent component receive the payment status in postPaymentStatus, refer the sample code provided above. The success/failure status information and transaction reference number shall be updated to Backend API and be recorded as per the design of payment flow of your module.

## Important Note:

The documentation provided above are not final and developed based on the best assumptions, feel free to contact Linoy Pappachan Malakkaran for any suggestions to make it better or fix any issues
