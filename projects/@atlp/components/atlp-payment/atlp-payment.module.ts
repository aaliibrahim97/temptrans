import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { PaymentCheckoutComponent } from './components/payment-checkout/payment-checkout.component';
import { PaymentSuccessOrFailureDialogComponent } from './components/payment-success-or-failure-dialog/payment-success-or-failure-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from 'projects/@atlp/lib/atlp-layout/components/header/header.module';
import { PaymentReviewMethodsComponent } from './components/payment-review-methods/payment-review-methods.component';
import { AtlpCommonPaymentAPI } from './config/payment.config';
import { HttpClientModule } from '@angular/common/http';
import { PreventDoubleClickDirective } from './directives/prevent-double-click.directive';
import { SafePipe } from './components/pipes/dom-sanitizer.pipe';
import { DrawerDialogComponent } from './components/drawer-dialog/drawer-dialog.component';
import { PaymentOtpComponent } from './components/payment-otp/payment-otp.component';
import { CashConfirmationDialogComponent } from './components/cash-confirmation-dialog/cash-confirmation-dialog.component';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [
    PaymentCheckoutComponent,
    PaymentSuccessOrFailureDialogComponent,
    SafePipe,
    PaymentReviewMethodsComponent,
    PreventDoubleClickDirective,
    DrawerDialogComponent,
    PaymentOtpComponent,
    CashConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    TranslateModule,
    HeaderModule,
    HttpClientModule,
    AtlpSidebarV2Module,
  ],
  exports: [
    PaymentCheckoutComponent,
    PaymentSuccessOrFailureDialogComponent,
    PaymentReviewMethodsComponent,
  ],
  providers: [DecimalPipe, AtlpCommonPaymentAPI],
})
export class AtlpPaymentModule {}
