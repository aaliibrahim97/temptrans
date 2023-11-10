import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtlpCopierService } from 'projects/@atlp/services/copier.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { IPaymentDialogData } from '../../models/payment.model';
// import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { DecimalPipe } from '@angular/common';
import { locale as navigationEnglish } from '../../i18n/en';
import { locale as navigationArabic } from '../../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-payment-success-or-failure-dialog',
  templateUrl: './payment-success-or-failure-dialog.component.html',
  styleUrls: ['./payment-success-or-failure-dialog.component.scss'],
})
export class PaymentSuccessOrFailureDialogComponent implements OnInit {
  reason: string = 'close';
  @Input() paymentResponseData: IPaymentDialogData;
  @Output() paymentCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  SidebarName = SidebarName;
  selectedLanguage = 'en';
  subscriptions: Subscription[] = [];
  lang: string = 'en';

  constructor(
    private atlpCopierService: AtlpCopierService,
    private toaster: ToastrService,
    public atplSidebarService: AtlpSidebarV2Service,
    private _iconsService: IconsService,
    private _decimalPipe: DecimalPipe,
    private atlpTranslationService: AtlpTranslationService,
    public translateService: TranslateService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('selectedLang');
    this.subscriptions.push(
      this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
        this.selectedLanguage = lang;
        this.atlpTranslationService.setDefaultLanguageSettings(
          this.selectedLanguage,
          navigationEnglish,
          navigationArabic
        );
      })
    );
  }

  copy(): void {
    let copyData = '';
    if (this.translateService?.store?.currentLang === 'en') {
      copyData = `
${this.translateService.instant('PAYMENT_DIALOG_TITLE')}:\n\n
${this.translateService.instant(
  'REVIEWCART_TRANSACTION_REFERENCE_NO'
)}                : ${this.paymentResponseData.OrderNumber} \n
${this.translateService.instant('PAYMENT_DIALOG_ONLINE_REF_NO')}  : ${
        this.paymentResponseData.OnlineRefID
      } \n
${this.translateService.instant(
  'PAYMENT_DIALOG_AMOUNT_PAID'
)}                 : ${this._decimalPipe.transform(
        this.paymentResponseData.isSuccess
          ? this.paymentResponseData.amount
          : 0,
        '1.2-2'
      )} \n
${this.translateService.instant(
  'PAYMENT_DIALOG_PAYMENT_STATUS'
)}              : ${
        this.paymentResponseData.isSuccess
          ? this.translateService.instant('PAYMENT_DIALOG_SUCCESS')
          : this.translateService.instant('PAYMENT_DIALOG_FAILED')
      } \n

`;
    } else {
      copyData = `
  : ${this.translateService.instant('PAYMENT_DIALOG_TITLE')}
  \n\n${
    this.paymentResponseData.OrderNumber
  }            : ${this.translateService.instant(
        'REVIEWCART_TRANSACTION_REFERENCE_NO'
      )}
  \n${
    this.paymentResponseData.OnlineRefID
  }          : ${this.translateService.instant('PAYMENT_DIALOG_ONLINE_REF_NO')} 
  \n${this._decimalPipe.transform(
    this.paymentResponseData.isSuccess ? this.paymentResponseData.amount : 0,
    '1.2-2'
  )}                  : ${this.translateService.instant(
        'PAYMENT_DIALOG_AMOUNT_PAID'
      )}  
  \n${this.translateService.instant(
    'PAYMENT_DIALOG_PAYMENT_STATUS'
  )}      :    ${
        this.paymentResponseData.isSuccess
          ? this.translateService.instant('PAYMENT_DIALOG_SUCCESS')
          : this.translateService.instant('PAYMENT_DIALOG_FAILED')
      }             
  `;
    }

    this.atlpCopierService.copyText(copyData);
    this.toaster.success(
      `${this.translateService.instant('PAYMENT_DIALOG_COPIED_TO_CLIPBOARD')}`
    );
  }

  close(evt) {
    //     let paymentSuccess = "Payment success"
    //     let paymentFail = "Payment failed...! Kindly contact ADport service desk."
    //     if (this.lang === "ar") {
    //       paymentSuccess = 'تم الدفع بنجاح'
    //       paymentFail = `حدث خطأ أثناء الدفع! يرجى التواصل مع مكتب
    //                                       خدمة المتعاملين لموانئ أبوظبي`
    //     }
    // if (this.paymentResponseData.isSuccess) {
    //   this.toaster.success( this.translateService.instant('PAYMENT_DIALOG_PAYMENT_SUCCESS'));
    // } else {
    //   this.toaster.error(this.translateService.instant('PAYMENT_DIALOG_PAYMENT_FAILED_MSG'));
    // }
    this.toggleSidebarOpen(SidebarName.paymentComplete);
    this.toggleSidebarOpen(SidebarName.choosePaymentMethod);
    this.paymentCompleteEvent.emit(evt);
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  private get icons(): Array<string> {
    return [
      'close-white-icon',
      'messages-exclamation',
      'approved-icon',
      'error-icon',
      'check-around-white',
      'error-circle',
    ];
  }
}
