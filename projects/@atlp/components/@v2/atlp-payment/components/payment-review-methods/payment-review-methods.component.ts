import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {
  ApiTransModel,
  BankList,
  BeneficiaryDetailsModel,
  IPaymentDialogData,
  IpaymentModel,
  PaymentCheckoutModel,
  PaymentCheckoutResponseModel,
  PaymentExtraCharges,
  PaymentMethodResponse,
  PaymentResponseModel,
  TokenizedCard,
} from '../../models/payment.model';
import { IconsService } from 'projects/@atlp/services/icons.service';
import {
  PaymentProcessStatus,
  PaymentBankStatus,
  PaymentMethodNames,
} from '../../constant/payment.enum';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AltpPaymentMethodService } from '../../services/altp-payment-method.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { locale as navigationEnglish } from '../../i18n/en';
import { locale as navigationArabic } from '../../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { TranslateService } from '@ngx-translate/core';
import { PaymentReceiveModel } from '../../models/paymentmet-request.models';
import { AtlpPaymentResponseModel } from '../../models/payment-response.models';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { ScriptService } from '../../services/atlp-payment-dynamic-script';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { PcsSecurityService } from 'projects/@atlp/auth/pcs-auth/services/pcs-security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FlexStyleBuilder } from '@angular/flex-layout';
import { PaymentOtpComponent } from '../payment-otp/payment-otp.component';
declare let applePay: any;

@UntilDestroy()
@Component({
  selector: 'app-payment-review-methods-v2',
  templateUrl: './payment-review-methods.component.html',
  styleUrls: ['./payment-review-methods.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentReviewMethodsComponent implements OnInit, OnDestroy {
  @Input() paymentReceiveModel: PaymentReceiveModel;
  @Input() paymentSliderKey: SidebarName = SidebarName.choosePaymentMethodV2;
  @Output() postPaymentStatus: EventEmitter<AtlpPaymentResponseModel> =
    new EventEmitter<AtlpPaymentResponseModel>();
  @Output() closePaymentProcess: EventEmitter<AtlpPaymentResponseModel> =
    new EventEmitter<AtlpPaymentResponseModel>();
  paymentData: IpaymentModel = {
    checkoutUrl: null,
    paymentMethod: null,
    paymentReceiveModel: null,
    processingBank: null,
    chequeDetails: {
      chequeNumber: null,
      chequeBankName: null,
      chequeDate: null,
      chequeAmount: null,
    },
    CreatePaymentToken: false,
    OneClickTokenId: null,
  };
  selectedLanguage = 'en';
  SidebarName = SidebarName;
  paymentMethodResponse: PaymentMethodResponse[];
  paymentmethodrequest;
  bankListMethodRequest;
  paymentForm: FormGroup;
  ApplicationList: any = [];
  PaymentMethod = '';
  paymentMethods: any = [];
  Amount: number;
  TotalAmount: number;
  DisplayLineItems: any;

  internetBankingMethods: any = [];
  ListofBanksResponse: BankList[];
  paymentCheckoutModel: PaymentCheckoutModel;

  paymentIconsMap: Map<string, string>;
  paymentMethodNamesMap: Map<string, string>;
  paymentMethodImgPath = 'assets/images/payment-methods';

  apiTransModel: ApiTransModel[] = [];
  beneficiaryDetails: BeneficiaryDetailsModel[] = [];
  timer: NodeJS.Timeout;
  scrHeight: number;
  scrWidth: number;
  subscriptions: Subscription[] = [];

  extraCharges: PaymentExtraCharges[] = [];
  paymentDataRes: IPaymentDialogData;
  //paymentConstants = atlpPaymentConstants.paymentRequestFields;
  childWindow: any;
  reviewDescription: string;

  // MPAY Team Development
  isTokenizationEnabled: boolean = false;
  TokenizedCards: TokenizedCard[];
  IsOneClickOTPSent: boolean = false;
  IsOneClickOTPSentFailed: boolean = false;
  IsOneClickPayment: boolean = false;
  OneClickOTPMsg: string = '';
  IsDeleteOneClickToken: boolean = false;
  IsDeleteOneClickTokenOTPSent: boolean = false;
  DeleteOneClickTokenIdOTPSent: string = '';
  AddNewCardURL: string = '';
  deleteDialogData: {
    title: string;
    message: string;
    messageDetails: any;
    drawerName: SidebarName;
    operation: string;
  };
  paymentOTPDialogData: {
    title: string;
    message: string;
    messageDetails: any;
    drawerName: SidebarName;
    operation: string;
  };

  paymentOTPTokneRef: string = '';
  displayPaymentMethods: any;
  isCashPaymentConfirmed: boolean = false;
  cashPaymentDialogData: {
    title: string;
    message: string;
    messageDetails: any;
    drawerName: SidebarName;
    operation: string;
  };
  paymentTransRef: string = '';
  @ViewChild(PaymentOtpComponent) paymentOtpComponent!: any;
  constructor(
    private iconsService: IconsService,
    public atplSidebarService: AtlpSidebarV2Service,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private atlppaymentlistofservicemethods: AltpPaymentMethodService,
    private ngxService: NgxUiLoaderService,
    private atlpTranslationService: AtlpTranslationService,
    public translateService: TranslateService,
    private decimalPipe: DecimalPipe,
    private scriptService: ScriptService,
    private envService: AtlpEnvService,
    private pcsSecurityService: PcsSecurityService
  ) {
    this.iconsService.registerIcons(this.icons);
    this.paymentIconsMap = new Map<string, string>();
    this.paymentIconsMap.set('e-Commerce', 'credit-card.png');
    this.paymentIconsMap.set('InternetBanking', 'bank-fill.png');
    this.paymentIconsMap.set('EWallet', 'globe-hemisphere-west.png');
    this.paymentIconsMap.set('ADPay', 'money-fill.png');
    this.paymentIconsMap.set('Cash', 'money-fill.png');

    // this.scriptService.load('jquery', 'applePayjs', 'applePaycss').then(() => {
    //   applePay.mPayAPIURL = this.envService.wrapperApiBaseUrl;
    //   applePay.token = this.pcsSecurityService.getToken();
    //   applePay.LoadApplePay();
    //   console.log('Apple Pay Device Support:', applePay.supportedByDevice());
    // });
  }

  ngOnInit(): void {
    console.log(
      'Payment payload passed: => ',
      JSON.stringify(this.paymentReceiveModel)
    );
    this.paymentForm = this.formBuilder.group({
      paymentMethod: '',
      internetBankingBank: '',
      paymentProductId: '',
      chequeDetails: this.formBuilder.group({
        chequeNumber: ['', Validators.required],
        chequeBankName: ['', Validators.required],
        chequeDate: ['', Validators.required],
        chequeAmount: ['', Validators.required],
      }),
    });
    this.paymentTransRef = this.paymentReceiveModel.mpayPayload.TransRef;

    var validatePayment: any = {};
    validatePayment.TransRef = this.paymentReceiveModel.mpayPayload.TransRef;
    validatePayment.MerchantId =
      this.paymentReceiveModel.mpayPayload.MerchantId;
    validatePayment.Lang = localStorage.getItem('selectedLang');
    this.ngxService.start();
    this.atlppaymentlistofservicemethods
      .ValidatePaymentRecord(validatePayment)
      .subscribe((response: PaymentResponseModel) => {
        this.ngxService.stop();
        if (!response.success) {
          this.toaster.error(response.msg);
        } else {
          this.subscriptions.push(
            this.atlpTranslationService
              .getCurrentLanguage()
              .subscribe((lang) => {
                this.selectedLanguage = lang;
                this.atlpTranslationService.setDefaultLanguageSettings(
                  this.selectedLanguage,
                  navigationEnglish,
                  navigationArabic
                );
                this.translatepaymentMethods();
              })
          );
          this.preparePaymentData();
        }
      });
  }

  get chequeNumber(): AbstractControl {
    return this.paymentForm.get('chequeDetails.chequeNumber');
  }
  get chequeBankName(): AbstractControl {
    return this.paymentForm.get('chequeDetails.chequeBankName');
  }
  get chequeDate(): AbstractControl {
    return this.paymentForm.get('chequeDetails.chequeDate');
  }
  get chequeAmount(): AbstractControl {
    return this.paymentForm.get('chequeDetails.chequeAmount');
  }

  public get paymentMethodNames(): typeof PaymentMethodNames {
    return PaymentMethodNames;
  }

  translatepaymentMethods(): void {
    this.paymentMethodNamesMap = new Map<string, string>();
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.ECOMMERCE,
      this.translateService.instant('PAYMENTMETHOD_CREDITCART')
      // crediCard
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.INTERNETBANKING,
      this.translateService.instant('PAYMENTMETHOD_INTERNET_BANKING')
      // internetBanking
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.EWALLET,
      this.translateService.instant('PAYMENTMETHOD_EWALLET')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.ADPAY,
      this.translateService.instant('PAYMENTMETHOD_ADPAY')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.CASH,
      this.translateService.instant('PAYMENTMETHOD_CASH')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.CHEQUE,
      this.translateService.instant('PAYMENTMETHOD_CHEQUE')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.APPLEPAY,
      this.translateService.instant('PAYMENTMETHOD_APPLEPAY')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.GOOGLEPAY,
      this.translateService.instant('PAYMENTMETHOD_GOOGLEPAY')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.POSTERMINAL,
      this.translateService.instant('PAYMENTMETHOD_POSTERMINAL')
    );
    this.paymentMethodNamesMap.set(
      PaymentMethodNames.PAYMENTTOKENIZATION,
      this.translateService.instant('PAYMENTMETHOD_PAYMENTTOKENIZATION')
    );

    // console.log('Payment Methods', this.paymentMethodNamesMap);
  }
  validationError(msg): void {
    this.toaster.error(
      msg,
      this.translateService.instant('PAYMENTMETHOD_MSG_VALIDATION_ERROR')
    );
    this.closePaymentMethods(null);
  }

  preparePaymentData(): void {
    // validation
    if (!this.paymentReceiveModel) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_DATA_MISSING')
      );
    }
    if (
      this.paymentReceiveModel.paymentProcessStatus === null ||
      this.paymentReceiveModel.paymentProcessStatus !==
        PaymentProcessStatus.CHOOSEPAYMENTMETHOD
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_INVALID_STATUS')
      );
    }
    if (
      this.paymentReceiveModel?.mpayPayload?.ApiTrans === undefined ||
      this.paymentReceiveModel?.mpayPayload?.ApiTrans.length === 0
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_NO_ITEMS')
      );
    }

    if (this.paymentReceiveModel.mpayPayload.ApplyCharges === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_APPLYCHARGES')
      );
    }
    if (
      this.paymentReceiveModel.mpayPayload.CollectionType === null ||
      this.paymentReceiveModel.mpayPayload.CollectionType === ''
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_NO_COLLECTIONTYPE')
      );
    }
    if (this.paymentReceiveModel.mpayPayload.IsMobilePayment === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_NO_ISMOBILE')
      );
    }
    if (this.paymentReceiveModel.mpayPayload.IsModalPayment === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_MODAL_PAYMENT')
      );
    }
    if (this.paymentReceiveModel.mpayPayload.GenerateOrderNo === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_GENERATE_ORDERNO')
      );
    }
    if (this.paymentReceiveModel.mpayPayload.EnableEWalletCapture === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_EWALLET_CAPTURE')
      );
    }

    if (this.paymentReceiveModel.mpayPayload.StdReceiptRequired === null) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_STANDARD_RECEIPT')
      );
    }
    if (
      this.paymentReceiveModel.mpayPayload.OrderNumber === null ||
      this.paymentReceiveModel.mpayPayload.OrderNumber === ''
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_NO_REF_NUMBER')
      );
    }
    if (
      this.paymentReceiveModel.mpayPayload.MerchantId === null ||
      this.paymentReceiveModel.mpayPayload.MerchantId === ''
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_MERCHANT_ID')
      );
    }
    if (
      this.paymentReceiveModel.mpayPayload.CreatedBy === null ||
      this.paymentReceiveModel.mpayPayload.CreatedBy === ''
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_CREATED_BY')
      );
    }

    if (
      this.paymentReceiveModel.mpayPayload.TradeLicenseNumber === null ||
      this.paymentReceiveModel.mpayPayload.TradeLicenseNumber === ''
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_TRADE_LICENSE_NUMBER')
      );
    }
    if (
      this.paymentReceiveModel.totalAmount === null ||
      this.paymentReceiveModel.totalAmount === 0 ||
      this.paymentReceiveModel.totalAmount === undefined
    ) {
      this.validationError(
        this.translateService.instant('PAYMENTMETHOD_MSG_INVALID_AMOUNT')
      );
    }

    if (this.paymentReceiveModel.mpayPayload.ApiTrans.length > 0) {
      for (const values of this.paymentReceiveModel.mpayPayload.ApiTrans) {
        if (
          values.TransactionNumber === '' ||
          values.TransactionNumber === null ||
          values.PaidAmount === null ||
          values.PaidAmount === undefined ||
          values.PaidAmount < 0 ||
          values.Rate === null ||
          values.Rate === undefined ||
          values.Rate < 0 ||
          values.Quantity === null ||
          values.Quantity < 0 ||
          values.IsExternal === null
        ) {
          this.validationError(
            this.translateService.instant('PAYMENTMETHOD_MSG_ITEM_ERROR')
          );
        }
      }
    }

    if (
      this.paymentReceiveModel.mpayPayload.IsSummaryItemDisplay != null &&
      this.paymentReceiveModel.mpayPayload.IsSummaryItemDisplay === true &&
      this.paymentReceiveModel.mpayPayload.ApiTransDisplay.length > 0
    ) {
      for (const values of this.paymentReceiveModel.mpayPayload
        .ApiTransDisplay) {
        if (
          values.TransactionNumber === '' ||
          values.TransactionNumber === null ||
          values.PaidAmount === null ||
          values.PaidAmount === undefined ||
          values.PaidAmount < 0
        ) {
          this.validationError(
            this.translateService.instant('PAYMENTMETHOD_MSG_ITEM_ERROR')
          );
        }
      }
    }

    // validation for Beneficiary details not added since these validation depends on Mpay and client application

    if (this.paymentReceiveModel) {
      this.paymentData.paymentReceiveModel = this.paymentReceiveModel;
      this.Amount = this.paymentData.paymentReceiveModel.totalAmount;
      this.TotalAmount = this.paymentData.paymentReceiveModel.totalAmount;

      this.reviewDescription =
        (this.translateService?.store?.currentLang === 'ae' ||
        this.translateService?.store?.currentLang == 'ar'
          ? this.paymentReceiveModel.paymentReviewDescription_ar
          : this.paymentReceiveModel.paymentReviewDescription_en) ||
        this.translateService.instant('REVIEWCART_DESCRIPTION');

      if (
        this.paymentReceiveModel.mpayPayload.IsSummaryItemDisplay != null &&
        this.paymentReceiveModel.mpayPayload.IsSummaryItemDisplay === true
      )
        this.DisplayLineItems =
          this.paymentReceiveModel.mpayPayload.ApiTransDisplay;
      else
        this.DisplayLineItems = this.paymentReceiveModel.mpayPayload.ApiTrans;
      this.ngxService.start();
      this.ListofpaymethodsExtend();
    }
  }

  getItemName(item: any): string {
    return (
      (this.translateService?.store?.currentLang === 'ae' ||
      this.translateService?.store?.currentLang === 'ar'
        ? item.ItemName_ar
        : item.ItemName_en) ||
      this.translateService.instant('REVIEWCART_TRANSACTION_REFERENCE_NO')
    );
  }

  getItemDescription(item: any): string {
    return (
      (this.translateService?.store?.currentLang === 'ae' ||
      this.translateService?.store?.currentLang === 'ar'
        ? item.ItemDescription_ar
        : item.ItemDescription_en) || item.TransactionNumber
    );
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  ListofpaymethodsExtend(): void {
    if (this.paymentData) {
      this.paymentMethods = [];

      this.paymentmethodrequest = {
        isMobilePayment:
          this.paymentData.paymentReceiveModel.mpayPayload.IsMobilePayment,
        collectionType:
          this.paymentData.paymentReceiveModel.mpayPayload.CollectionType,
        amount: this.paymentData.paymentReceiveModel.totalAmount,
        applyCharges:
          this.paymentData.paymentReceiveModel.mpayPayload.ApplyCharges,
        orderId: this.paymentData.paymentReceiveModel.mpayPayload.OrderNumber,
        applicationName:
          this.paymentData.paymentReceiveModel.mpayPayload?.ApplicationName ??
          '',
      };
      this.displayPaymentMethods = [];
      if (
        this.paymentReceiveModel.mpayPayload.DisplayPaymentMethods != null &&
        this.paymentReceiveModel.mpayPayload.DisplayPaymentMethods.length > 0
      ) {
        this.displayPaymentMethods =
          this.paymentReceiveModel.mpayPayload.DisplayPaymentMethods;
      }
      this.atlppaymentlistofservicemethods
        .Listofpaymethods(this.paymentmethodrequest)
        .subscribe(
          (paymentResponse: any) => {
            if (paymentResponse) {
              this.paymentMethodResponse = paymentResponse;
              // Fill payment methods to UI
              for (const item of this.paymentMethodResponse) {
                if (
                  item.PaymentMethod == PaymentMethodNames.PAYMENTTOKENIZATION
                ) {
                  if (this.EnableTokenizationProcess()) {
                    this.isTokenizationEnabled = true;
                    this.GetTokenizatedCards(
                      this.paymentReceiveModel.mpayPayload.BillingDetails.Email,
                      this.paymentReceiveModel.mpayPayload.BillingDetails
                        .MobileNo
                    );
                  }
                } else {
                  if (this.displayPaymentMethods.length > 0) {
                    if (
                      this.displayPaymentMethods.indexOf(item.PaymentMethod) >
                      -1
                    ) {
                      this.paymentMethods.push({
                        label: `${this.paymentMethodNamesMap.get(
                          item.PaymentMethod
                        )}`,
                        value: item.PaymentMethod,
                        img: item.ImagePath,
                      });
                    }
                  } else {
                    this.paymentMethods.push({
                      label: `${this.paymentMethodNamesMap.get(
                        item.PaymentMethod
                      )}`,
                      value: item.PaymentMethod,
                      img: item.ImagePath,
                    });
                  }
                }
              }
              this.ListofBanksExtend();
              this.ngxService.stop();
            } else {
              this.toaster.error(
                this.translateService.instant(
                  'PAYMENTMETHOD_GETPAYMENTRETRIEVAL_FAILED'
                )
              );
            }
          },
          (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.toaster.error(
                this.translateService.instant('PAYMENTMETHOD_SESSION_EXPIRED')
              );
            } else {
              this.toaster.error(err.message);
            }
          }
        );
    }
  }

  ListofBanksExtend(): void {
    this.internetBankingMethods = [];
    this.bankListMethodRequest = {
      orderId: this.paymentData.paymentReceiveModel.mpayPayload.OrderNumber,
      applicationName:
        this.paymentData.paymentReceiveModel.mpayPayload?.ApplicationName ?? '',
    };

    this.atlppaymentlistofservicemethods
      .ListofBanks(this.bankListMethodRequest)
      .subscribe(
        (bankListResponse: BankList[]) => {
          if (bankListResponse) {
            this.ListofBanksResponse = bankListResponse;
            // Fill Banks in UI as per selection
            for (const item of this.ListofBanksResponse) {
              this.internetBankingMethods.push({
                label:
                  this.translateService?.store?.currentLang === 'ae' ||
                  this.translateService?.store?.currentLang === 'ar'
                    ? item.BankName_Ar
                    : item.BankName,
                value: item.BankID,
                img: item.ImagePath,
              });
            }
          } else {
            this.toaster.error(
              this.translateService.instant('PAYMENTMETHOD_BANKLIST_ERROR')
            );
          }
        },
        (err) => {
          this.toaster.error(
            this.translateService.instant('PAYMENTMETHOD_BANKLIST_ERROR')
          );
        }
      );
  }

  CalculateAmount(selectedPaymentMethod): void {
    if (this.ApplicationList) {
      for (const item of this.paymentMethodResponse) {
        if (selectedPaymentMethod === item.PaymentMethod) {
          this.Amount = item.Amount;

          this.TotalAmount = item.ChargesConfiguration
            ? item.ChargesConfiguration?.TotalAmount
            : item.Amount;
          this.chequeAmount.setValue(
            this.decimalPipe.transform(this.TotalAmount.toString(), '1.2-2')
          );

          // fill extra charges
          this.extraCharges = [];
          if (item.ChargesConfiguration) {
            this.extraCharges.push({
              serviceName: this.translateService.instant(
                'PAYMENTMETHOD_EXTRA_FIXED_CHARGES'
              ),
              serviceCharge: item.ChargesConfiguration.FixCharges,
            });
            this.extraCharges.push({
              serviceName: this.translateService.instant(
                'PAYMENTMETHOD_EXTRA_PROCESSING_FEE'
              ),
              serviceCharge: item.ChargesConfiguration.PercentageCharges,
            });
            this.extraCharges.push({
              serviceName: this.translateService.instant(
                'PAYMENTMETHOD_EXTRA_MAQTA_VAT'
              ),
              serviceCharge: item.ChargesConfiguration.MaqtaVATAmount,
            });
            this.extraCharges.push({
              serviceName: this.translateService.instant(
                'PAYMENTMETHOD_EXTRA_VAT'
              ),
              serviceCharge: item.ChargesConfiguration.VATAmount,
            });
          }
        }
      }
    }
    //Tokenization settings from MPAY
    if (selectedPaymentMethod != PaymentMethodNames.ECOMMERCE) {
      this.IsOneClickPayment = false;
      this.paymentData.OneClickTokenId = '';
      this.IsDeleteOneClickToken = false;
    }
    this.IsDeleteOneClickToken = false;
    this.paymentData.CreatePaymentToken = false;
    if (
      this.IsOneClickOTPSent &&
      this.paymentForm.value.paymentMethod === this.paymentMethodNames.ECOMMERCE
    ) {
      this.IsOneClickPayment = true;
    } else {
      this.IsOneClickPayment = false;
    }
  }

  enablePayment(): boolean {
    if (this.paymentForm.value.paymentMethod === PaymentMethodNames.EWALLET) {
      return false;
    } else {
      return !this.paymentForm.value.paymentMethod;
    }
  }

  checkApplePay(paymentMethods): boolean {
    return paymentMethods?.some((c) => c.value === PaymentMethodNames.APPLEPAY);
  }

  ProcessCheckout(): void {
    // Do Validation
    if (!this.paymentForm.value.paymentMethod) {
      this.toaster.error(
        this.translateService.instant(
          'PAYMENTMETHOD_CHOOSEPAYMENTMETHOD_TOCONTINUE'
        )
      );
      return;
    }
    if (
      this.paymentForm.value.paymentMethod ===
        PaymentMethodNames.INTERNETBANKING &&
      !this.paymentForm.value.internetBankingBank
    ) {
      this.toaster.error(
        this.translateService.instant('PAYMENTMETHOD_CHOOSEONEBANKTOCONTINUE')
      );
      return;
    }
    if (
      this.paymentForm.value.paymentMethod ===
        PaymentMethodNames.INTERNETBANKING &&
      !this.paymentForm.value.paymentProductId
    ) {
      this.toaster.error(
        this.translateService.instant('PAYMENTMETHOD_MSG_PRODUCTID')
      );
      return;
    }

    if (
      this.paymentForm.value.paymentMethod === PaymentMethodNames.CHEQUE &&
      (this.chequeNumber.value === '' ||
        this.chequeBankName.value === '' ||
        this.chequeDate.value === '' ||
        this.chequeAmount.value === '' ||
        this.chequeAmount.value <= 0)
    ) {
      this.toaster.error(
        this.translateService.instant('PAYMENTMETHOD_MSG_CHEQUE')
      );
      return;
    }
    if (
      this.paymentForm.value.paymentMethod == PaymentMethodNames.CASH &&
      !this.isCashPaymentConfirmed
    ) {
      this.cashPaymentDialogData = this.onCashPaymentconfirmationDialogModel(
        '',
        this.translateService.instant('CASH_PAYMENT_CONFIRMATION_MESSAGE'),
        'Yes'
      );
      this.toggleSidebarOpen(SidebarName.cashPaymentconfirmationPopUP);
      return;
    }
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    this.paymentCheckoutModel = this.CreateCheckOutData();
    if (
      this.paymentCheckoutModel.EnablePaymentTokenization &&
      this.paymentCheckoutModel.PaymentMethod == PaymentMethodNames.ECOMMERCE &&
      this.paymentCheckoutModel.OneClickTokenId != null &&
      this.paymentCheckoutModel.OneClickTokenId.length == 20
    ) {
      // this.toaster.success("Tokenization card payment process");
    } else {
      this.PaymentPopUpOpenner();
    }
    console.log('request-payment', this.paymentCheckoutModel);
    this.paymentCheckoutModel.TransRef =
      this.paymentReceiveModel.mpayPayload.TransRef;
    this.ngxService.start();

    this.atlppaymentlistofservicemethods
      .PaymentCheckout(this.paymentCheckoutModel)
      .subscribe(
        (paymentCheckoutResponseModel: PaymentCheckoutResponseModel) => {
          if (paymentCheckoutResponseModel.success) {
            console.log('MPAY-Response', paymentCheckoutResponseModel);

            this.paymentData.transRefId = paymentCheckoutResponseModel.TransRef;
            this.paymentData.checkoutUrl =
              paymentCheckoutResponseModel.CheckoutURL;
            if (!this.checkPopUpWindowforPaymentMethod(this.paymentData)) {
              this.paymentData.paymentReceiveModel.paymentProcessStatus =
                PaymentProcessStatus.CHECKOUT;
              // this.paymentData.checkoutUrl="https://www.google.com/output=embedMath.random()"+Math.random().toString();
              this.toggleSidebarOpen(SidebarName.paymentCheckoutV2);
            } else {
              // One click trans is true, OTP sent true and OTP enabled as well then
              // show the OTP screen
              if (
                paymentCheckoutResponseModel.IsOneClickTrans &&
                paymentCheckoutResponseModel.IsOTPSent &&
                paymentCheckoutResponseModel.IsOneClickOTPEnabled
              ) {
                this.paymentOTPDialogData = this.paymentOTPDialogModel(
                  'VERIFICATION CODE',
                  paymentCheckoutResponseModel.msg,
                  ''
                );
                this.toggleSidebarOpen(SidebarName.paymentOTP);
                this.paymentOtpComponent.countDown();
              }
              // One click trans is true, OTP sent is false and
              // OTP enable is false then process the trans without OTP screen
              else if (
                paymentCheckoutResponseModel.IsOneClickTrans &&
                !paymentCheckoutResponseModel.IsOTPSent &&
                !paymentCheckoutResponseModel.IsOneClickOTPEnabled
              ) {
                this.PaymentPopUpOpenner();
                if (this.childWindow) {
                  this.childWindow.location = this.paymentData.checkoutUrl;
                }
                this.timer = setInterval(
                  this.checkChild.bind(this, this.childWindow),
                  500
                );
                // show error if we are not able to sent an OTP..
              } else if (
                paymentCheckoutResponseModel.IsOneClickTrans &&
                !paymentCheckoutResponseModel.IsOTPSent &&
                paymentCheckoutResponseModel.IsOneClickOTPEnabled
              ) {
                this.IsOneClickOTPSentFailed = true;
                this.IsOneClickPayment = true;
                this.OneClickOTPMsg = paymentCheckoutResponseModel.msg;
                this.toaster.error(paymentCheckoutResponseModel.msg);
              } else {
                if (this.childWindow) {
                  this.childWindow.location = this.paymentData.checkoutUrl;
                }
                this.timer = setInterval(
                  this.checkChild.bind(this, this.childWindow),
                  500
                );
              }
              this.ngxService.stop();
            }
          } else {
            if (this.childWindow) {
              this.childWindow.close();
            }
            this.ngxService.stop();
            this.toaster.error(`${paymentCheckoutResponseModel.msg}`);
          }
        },
        (err: HttpErrorResponse) => {
          if (this.childWindow) {
            this.childWindow.close();
          }
          if (err.status === 400) {
            const errors = Array.prototype.map
              .call(err.error.Errorlst, (item: any): any => {
                return item.Error;
              })
              .join(',');
            this.toaster.error(`Validation error occured.${errors}`);
          } else {
            this.toaster.error(err.message);
          }
        }
      );
  }

  filterApplePay(): any {
    return this.paymentMethods.filter(
      (item) => item.value !== this.paymentMethodNames.APPLEPAY
    );
  }

  CreateCheckOutData(): PaymentCheckoutModel {
    this.paymentData.processingBank =
      this.paymentForm.value.internetBankingBank;
    this.paymentData.paymentMethod = this.paymentForm.value.paymentMethod;
    // this.paymentData.paymentReceiveModel.totalAmount = this.TotalAmount;

    // cheque Details
    this.paymentData.chequeDetails.chequeNumber = this.chequeNumber.value;
    this.paymentData.chequeDetails.chequeBankName = this.chequeBankName.value;
    this.paymentData.chequeDetails.chequeDate = this.chequeDate.value
      ? moment(new Date(this.chequeDate.value)).format('YYYY-MM-DD')
      : '';
    this.paymentData.chequeDetails.chequeAmount = this.chequeAmount.value;
    this.apiTransModel = [];
    this.beneficiaryDetails = [];

    // create post Request Model
    if (this.paymentData.paymentReceiveModel.mpayPayload.ApiTrans) {
      for (const item of this.paymentData.paymentReceiveModel.mpayPayload
        .ApiTrans) {
        this.apiTransModel.push({
          TransactionID: item.TransactionID,
          TransactionNumber: item.TransactionNumber,
          PaidAmount: item.PaidAmount,
          VATAmount: item.VATAmount,
          VATRate: item.VATRate,
          RemainingAmount: item.RemainingAmount,
          Rate: item.Rate,
          Quantity: item.Quantity,
          Organization: item.Organization,
          IsExternal: item.IsExternal,
          InvoiceNumber: item.InvoiceNumber,
          RevenueAccountCode: item.RevenueAccountCode,
          CategoryType: item.CategoryType,
          CategoryValue: item.CategoryValue,
          Description: item.Description,
          TransTypeKey: item.TransTypeKey,
        });
      }
    }
    if (this.paymentData.paymentReceiveModel.mpayPayload.BeneficiaryDetails) {
      for (const beneficiary of this.paymentData.paymentReceiveModel.mpayPayload
        .BeneficiaryDetails) {
        if (this.paymentData.paymentMethod === beneficiary.PaymentMethod) {
          this.beneficiaryDetails.push({
            Amount: beneficiary.Amount,
            Organization: beneficiary.Organization,
            TransactionID: beneficiary.TransactionID,
            AccountCode: beneficiary.AccountCode,
            ServiceID: beneficiary.ServiceID,
          });
        }
      }
    }

    return {
      OrderNumber: this.paymentData.paymentReceiveModel.mpayPayload.OrderNumber,
      IsModalPayment:
        this.paymentData.paymentReceiveModel.mpayPayload.IsModalPayment,
      IsMobilePayment:
        this.paymentData.paymentReceiveModel.mpayPayload.IsMobilePayment,
      UpdateStatusUrl:
        this.paymentData.paymentReceiveModel.mpayPayload.UpdateStatusUrl,
      BankID: this.paymentData.processingBank,
      PaymentMethod: this.paymentData.paymentMethod,
      CollectionType:
        this.paymentData.paymentReceiveModel.mpayPayload.CollectionType,
      MerchantId: this.paymentData.paymentReceiveModel.mpayPayload.MerchantId,
      TradeLicenseNumber:
        this.paymentData.paymentReceiveModel.mpayPayload.TradeLicenseNumber,
      GenerateOrderNo:
        this.paymentData.paymentReceiveModel.mpayPayload.GenerateOrderNo,
      ERPStatus: this.paymentData.paymentReceiveModel.mpayPayload.ERPStatus,
      ApplyCharges:
        this.paymentData.paymentReceiveModel.mpayPayload.ApplyCharges,
      StdReceiptRequired:
        this.paymentData.paymentReceiveModel.mpayPayload.StdReceiptRequired,
      CreatedBy: this.paymentData.paymentReceiveModel.mpayPayload.CreatedBy,
      UserEmail: this.paymentData.paymentReceiveModel.mpayPayload.UserEmail,
      ChequeNumber: this.paymentData.chequeDetails.chequeNumber,
      ChequeBankName: this.paymentData.chequeDetails.chequeBankName,
      ChequeDate: this.paymentData.chequeDetails.chequeDate,
      IsEmbedded:
        this.paymentData.paymentMethod === PaymentMethodNames.INTERNETBANKING ||
        this.paymentData.paymentMethod === PaymentMethodNames.ECOMMERCE ||
        this.paymentData.paymentMethod === PaymentMethodNames.EWALLET ||
        this.paymentData.paymentMethod === PaymentMethodNames.ADPAY
          ? false
          : true,
      EnableEWalletCapture:
        this.paymentData.paymentMethod === PaymentMethodNames.INTERNETBANKING
          ? false
          : this.paymentData.paymentReceiveModel.mpayPayload
              .EnableEWalletCapture,
      EnableEWalletPayment:
        this.paymentData.paymentMethod === PaymentMethodNames.EWALLET
          ? true
          : false,
      EnableCashPayment:
        this.paymentData.paymentMethod === PaymentMethodNames.CASH ||
        this.paymentData.paymentMethod === PaymentMethodNames.POSTERMINAL
          ? true
          : false,
      Amount: this.paymentData.paymentReceiveModel.totalAmount,
      ApiTrans: this.apiTransModel,
      BeneficiaryDetails:
        this.paymentData.paymentMethod === PaymentMethodNames.EWALLET ||
        this.paymentData.paymentMethod === PaymentMethodNames.ADPAY
          ? this.beneficiaryDetails
          : [],
      ProductId:
        this.paymentData.paymentMethod === PaymentMethodNames.INTERNETBANKING
          ? this.paymentForm.value.paymentProductId
          : '',
      MetaData: [], //this.paymentReceiveModel?.mpayPayload?.MetaData,
      BillingDetails:
        this.paymentData.paymentReceiveModel.mpayPayload.BillingDetails,
      ApplicationName:
        this.paymentData.paymentReceiveModel.mpayPayload?.ApplicationName ?? '',
      OneClickTokenId: this.paymentData?.OneClickTokenId ?? null,
      CreatePaymentToken: this.paymentData?.CreatePaymentToken ?? false,
      EnablePaymentTokenization: this.isTokenizationEnabled,
      Lang: localStorage.getItem('selectedLang'),
    };
  }

  ProcessApplePay(): void {
    this.paymentForm.value.paymentMethod = PaymentMethodNames.APPLEPAY;
    this.paymentCheckoutModel = this.CreateCheckOutData();
    console.log('request applepay:', this.paymentCheckoutModel);
    applePay.BeginApplePayPayment(this.paymentCheckoutModel);
  }

  checkPopUpWindowforPaymentMethod(paymentData: IpaymentModel): boolean {
    if (
      paymentData.paymentMethod !== PaymentMethodNames.INTERNETBANKING &&
      paymentData.paymentMethod !== PaymentMethodNames.ADPAY &&
      paymentData.paymentMethod !== PaymentMethodNames.EWALLET &&
      paymentData.paymentMethod !== PaymentMethodNames.ECOMMERCE &&
      paymentData.paymentMethod !== PaymentMethodNames.CASH &&
      paymentData.paymentMethod !== PaymentMethodNames.POSTERMINAL
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkChild(child): void {
    if (child != null && child.closed) {
      clearInterval(this.timer);
      this.ngxService.stop();
      if (
        this.paymentDataRes === undefined ||
        this.paymentDataRes?.OnlineRefID === ''
      ) {
        const evtData: AtlpPaymentResponseModel = {
          data: {
            OrderNumber: this.paymentReceiveModel.mpayPayload.OrderNumber,
            OnlineRefID: null,
            TotalAmount: 0,
            BankStatus: PaymentBankStatus.FAILED,
            TransRefID: this.paymentData.transRefId,
            PaymentMethod: this.paymentData.paymentMethod,
          },
        };
        this.postPaymentStatus.emit(evtData);
        this.paymentDataRes = {
          OrderNumber: evtData.data.OrderNumber,
          OnlineRefID: evtData.data.OnlineRefID,
          amount: evtData.data.TotalAmount,
        };
        this.paymentSuccessDialog(false);
        this.toggleSidebarOpen(this.paymentSliderKey);
        this.paymentCompleteEvent(evtData);
      }
    }
  }

  closePaymentMethods(evt): void {
    this.paymentCompleteEvent(evt);
    this.toggleSidebarOpen(this.paymentSliderKey);
  }

  paymentCompleteEvent(evt): void {
    // after closing dialog, event received here to dispose the component.
    if (evt) {
      this.closePaymentProcess.emit(evt);
    }

    this.paymentReceiveModel.paymentProcessStatus =
      PaymentProcessStatus.DEFAULT;
  }

  @HostListener('window:message', ['$event'])
  onMessage(evt): void {
    if (evt.data.TransRef) {
      console.log(evt);
      this.ngxService.start();

      this.atlppaymentlistofservicemethods
        .GetPaymentStatusResponse(
          evt.data.TransRef,
          evt.data.SecureResponseData
        )
        .subscribe(
          (response) => {
            this.ngxService.stop();
            console.log('Final Payment Resposne-MPAY', response);
            if (response.success) {
              const evtData: AtlpPaymentResponseModel = {
                data: {
                  OrderNumber: response.data.OrderNumber,
                  OnlineRefID: response.data.OnlineRefID,
                  TotalAmount: response.data.TotalAmount,
                  BankStatus: response.data.BankStatus,
                  TransRefID: evt.data.TransRef,
                  PaymentMethod: response.data.PaymentMethod,
                },
                metaData: [evt],
              };
              this.postPaymentStatus.emit(evtData);
              this.paymentDataRes = {
                OrderNumber: response.data.OrderNumber,
                OnlineRefID: response.data.OnlineRefID,
                amount: response.data.TotalAmount,
              };
              // to close child window in case of internet banking and adpay
              if (evt.source && !evt.source.closed) {
                evt.source.close();
              }
              // only close sidebar if it is open for iframe.
              if (!this.checkPopUpWindowforPaymentMethod(this.paymentData)) {
                this.toggleSidebarOpen(SidebarName.paymentCheckoutV2);
              }
              if (
                response.data.BankStatus === PaymentBankStatus.AUTHORIZED ||
                response.data.BankStatus === PaymentBankStatus.SUCCESS
              ) {
                this.paymentSuccessDialog(true);
              } else {
                this.paymentSuccessDialog(false);
              }
            } else {
              this.toaster.error(response.msg);
            }
          },
          (err) => {
            this.toaster.error('Unexpected error occurred');
            this.ngxService.stop();
          }
        );

      //this.ngxService.stop();
      // this.changeDetectorRef.detectChanges();
    }
  }

  paymentSuccessDialog(isSuccess: boolean): void {
    this.paymentDataRes.isSuccess = isSuccess;
    this.paymentData.paymentReceiveModel.paymentProcessStatus =
      PaymentProcessStatus.COMPLETE;
    this.toggleSidebarOpen(SidebarName.paymentCompleteV2);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  GetTokenizatedCards(email: string, mobileNo: string) {
    this.ngxService.start();
    this.atlppaymentlistofservicemethods
      .TokenizedCards(email, mobileNo)
      .subscribe(
        (tokenizedCardResponse) => {
          this.ngxService.stop();
          if (tokenizedCardResponse.success) {
            this.TokenizedCards = tokenizedCardResponse.data;
            this.AddNewCardURL = tokenizedCardResponse.AddNewCardURL;
          } else {
            this.toaster.error(
              this.translateService.instant('PAYMENTMETHOD_BANKLIST_ERROR')
            );
          }
        },
        (err) => {
          this.toaster.error(
            this.translateService.instant('PAYMENTMETHOD_BANKLIST_ERROR')
          );
          this.ngxService.stop();
        }
      );
  }

  TokenizedCardSelected(card: TokenizedCard) {
    if (card.IsSuspend) {
      this.paymentData.CreatePaymentToken = false;
      this.paymentData.OneClickTokenId = '';
      this.IsDeleteOneClickToken = false;
      this.toaster.error(card.SuspendMsg);
      return;
    } else {
      this.paymentData.OneClickTokenId = card.ReferenceNumber;
      this.paymentData.CreatePaymentToken = false;
      this.IsDeleteOneClickToken = true;
    }
  }

  PaymentPopUpOpenner() {
    if (this.checkPopUpWindowforPaymentMethod(this.paymentData)) {
      this.childWindow = window.open(
        '',
        '',
        `toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=10,width=${this.scrWidth},height=${this.scrHeight}`
      );
    }
  }

  OneClickTransOTPVerification(oneClickTransOTP: any) {
    this.ngxService.start();
    if (this.IsDeleteOneClickTokenOTPSent) {
      this.paymentOTPTokneRef = this.DeleteOneClickTokenIdOTPSent;
      if (
        this.paymentOTPTokneRef.length == 0 ||
        this.paymentOTPTokneRef == null
      ) {
        this.toaster.error(
          this.translateService.instant('TOKENIZED_CARD_DELETION_VALIDATION')
        );
        this.ngxService.stop();
        return;
      }
    } else {
      // this.paymentOTPTokneRef = this.paymentCheckoutModel.OneClickTokenId;
      this.paymentOTPTokneRef = this.paymentData.OneClickTokenId;
    }
    this.atlppaymentlistofservicemethods
      .PaymentOTPValidation(this.paymentOTPTokneRef, oneClickTransOTP)
      .subscribe(
        (tokenizedCardResponse) => {
          if (tokenizedCardResponse.success) {
            if (this.IsDeleteOneClickTokenOTPSent) {
              this.DeletePaymentTokenFromMPAY();
            } else {
              this.ProcessOneClickTrans();
            }
            this.ngxService.stop();
            this.toggleSidebarOpen(SidebarName.paymentOTP);
          } else {
            this.toaster.error(tokenizedCardResponse.msg);
            if (tokenizedCardResponse.data == '-1000') {
              this.paymentForm.reset();
              this.TokenizedCards = [];
              this.paymentData.OneClickTokenId = '';
              this.paymentData.CreatePaymentToken = false;
              this.IsDeleteOneClickToken = false;
              this.IsDeleteOneClickTokenOTPSent = false;
              this.GetTokenizatedCards(
                this.paymentReceiveModel.mpayPayload.BillingDetails.Email,
                this.paymentReceiveModel.mpayPayload.BillingDetails.MobileNo
              );
              this.toggleSidebarOpen(SidebarName.paymentOTP);
            }
            this.ngxService.stop();
          }
        },
        (err) => {
          this.toaster.error(this.translateService.instant('TIME_OUT_MSG'));
        }
      );
  }
  ProcessOneClickTrans() {
    this.PaymentPopUpOpenner();
    this.atlppaymentlistofservicemethods
      .ProcessOneClickTrans(this.paymentData.transRefId)
      .subscribe(
        (checkOut: PaymentCheckoutResponseModel) => {
          if (checkOut.success) {
            if (this.childWindow) {
              this.childWindow.location = checkOut.CheckoutURL;
            }
          } else {
            if (this.childWindow) {
              this.childWindow.close();
            }
            this.toaster.error(checkOut.msg);
          }
        },
        (err) => {
          this.toaster.error(this.translateService.instant('TIME_OUT_MSG'));
        }
      );
  }
  AddNewCardSelected() {
    // console.log('Save card for future');
    this.paymentData.OneClickTokenId = '';
    this.paymentData.CreatePaymentToken = true;
    this.IsDeleteOneClickToken = false;
    // console.log('Request paymentReceiveModel Payload', this.paymentData);
  }
  DeletePaymentToken() {
    this.deleteDialogData = this.confirmationDialogModel(
      '',
      this.translateService.instant('TOKENIZED_CARD_DELETION_CONFORMATION'),
      'Save'
    );
    this.toggleSidebarOpen(SidebarName.confirmationPopUP);
  }
  DeletePaymentTokenFromMPAY() {
    this.atlppaymentlistofservicemethods
      .DeletePaymentToken(this.DeleteOneClickTokenIdOTPSent)
      .subscribe(
        (tokenizedCardResponse) => {
          this.toaster.success(
            this.translateService.instant(
              'TOKENIZED_CARD_DELETION_SUCCESSFULLY'
            )
          );
          this.ngxService.start();
          // console.log('response from delete token', tokenizedCardResponse);
          // this.toggleSidebarOpen(SidebarName.paymentOTP);
          this.IsOneClickOTPSent = false;
          this.IsDeleteOneClickTokenOTPSent = false;
          this.OneClickOTPMsg = '';

          this.GetTokenizatedCards(
            this.paymentReceiveModel.mpayPayload.BillingDetails.Email,
            this.paymentReceiveModel.mpayPayload.BillingDetails.MobileNo
          );
          this.ngxService.stop();
        },
        (err) => {
          this.toaster.error(
            this.translateService.instant('TOKENIZED_CARD_DELETION_Failed')
          );
          this.ngxService.stop();
        }
      );
  }

  confirmationDialogModel(headerText, messageText, operationType) {
    return {
      title: headerText,
      message: messageText,
      messageDetails: null,
      operation: operationType,
      drawerName: SidebarName.confirmationPopUP,
    };
  }

  paymentOTPDialogModel(headerText, messageText, operationType) {
    return {
      title: headerText,
      message: messageText,
      messageDetails: null,
      operation: operationType,
      drawerName: SidebarName.paymentOTP,
    };
  }

  onDeleteCardConfirm(event: any) {
    this.toggleSidebarOpen(SidebarName.confirmationPopUP);
    this.ngxService.start();

    this.atlppaymentlistofservicemethods
      .CreatePaymentOTP(this.paymentData.OneClickTokenId, true, false)
      .subscribe(
        (tokenizedCardResponse) => {
          if (tokenizedCardResponse.success) {
            this.paymentOTPDialogData = this.paymentOTPDialogModel(
              this.translateService.instant('TOKENIZED_VERIFICATION_CODE'),
              tokenizedCardResponse.msg,
              ''
            );
            this.toggleSidebarOpen(SidebarName.paymentOTP);
            this.IsOneClickOTPSent = true;
            this.IsDeleteOneClickTokenOTPSent = true;
            this.IsDeleteOneClickToken = false;
            this.OneClickOTPMsg = tokenizedCardResponse.msg;
            this.DeleteOneClickTokenIdOTPSent =
              this.paymentData.OneClickTokenId;
            this.paymentOtpComponent.countDown();
          } else {
            this.toaster.error(tokenizedCardResponse.msg);
          }
          this.ngxService.stop();
        },
        (err) => {
          this.toaster.error(this.translateService.instant('TIME_OUT_MSG'));
          this.ngxService.stop();
        }
      );
  }

  ResendPaymentOTPProcess(event: any) {
    this.ngxService.start();
    this.toggleSidebarOpen(SidebarName.paymentOTP);
    if (this.IsDeleteOneClickTokenOTPSent) {
      this.paymentOTPTokneRef = this.DeleteOneClickTokenIdOTPSent;
      if (
        this.paymentOTPTokneRef.length == 0 ||
        this.paymentOTPTokneRef == null
      ) {
        this.toaster.error(
          this.translateService.instant('TOKENIZED_CARD_DELETION_VALIDATION')
        );
        this.ngxService.stop();
        return;
      }
    } else {
      this.paymentOTPTokneRef = this.paymentCheckoutModel.OneClickTokenId;
    }
    this.atlppaymentlistofservicemethods
      .CreatePaymentOTP(
        this.paymentOTPTokneRef,
        this.IsDeleteOneClickTokenOTPSent,
        true
      )
      .subscribe(
        (tokenizedCardResponse) => {
          if (tokenizedCardResponse.success) {
            this.paymentOTPDialogData = this.paymentOTPDialogModel(
              this.translateService.instant('TOKENIZED_VERIFICATION_CODE'),
              tokenizedCardResponse.msg,
              ''
            );
            this.toggleSidebarOpen(SidebarName.paymentOTP);
            this.paymentOtpComponent.countDown();
          } else {
            this.toaster.error(tokenizedCardResponse.msg);
          }
          this.ngxService.stop();
        },
        (err) => {
          this.toaster.error(this.translateService.instant('TIME_OUT_MSG'));
          this.ngxService.stop();
        }
      );
  }

  onCashPaymentConfirm(event: any) {
    this.isCashPaymentConfirmed = true;
    this.toggleSidebarOpen(SidebarName.cashPaymentconfirmationPopUP);
    this.ProcessCheckout();
  }
  onCashPaymentconfirmationDialogModel(headerText, messageText, operationType) {
    return {
      title: headerText,
      message: messageText,
      messageDetails: null,
      operation: operationType,
      drawerName: SidebarName.cashPaymentconfirmationPopUP,
    };
  }
  EnableTokenizationProcess() {
    try {
      if (
        this.paymentReceiveModel.mpayPayload.BillingDetails != null &&
        this.paymentReceiveModel.mpayPayload.BillingDetails.Email != null &&
        this.paymentReceiveModel.mpayPayload.BillingDetails.Email.length > 0 &&
        this.paymentReceiveModel.mpayPayload.BillingDetails.MobileNo != null &&
        this.paymentReceiveModel.mpayPayload.BillingDetails.MobileNo.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  EnablePaymentMehodsAsPerClient() {
    try {
    } catch (e) {
      console.error(e);
    }
  }
  EnablePaymentMehodsAsPerClientCheck(enableFlag) {
    if (
      enableFlag != null &&
      enableFlag != 'undefined' &&
      enableFlag == false
    ) {
      return true;
    } else {
      return false;
    }
  }
  private get icons(): Array<string> {
    return [
      'small-close-btn',
      'messages-exclamation',
      'close-white-icon',
      'pay-check',
      'back-arrow',
      'data-icon-white',
      'warning-circle-fill',
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
