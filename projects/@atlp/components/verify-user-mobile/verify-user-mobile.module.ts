import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { AtlpSidebarV2Module } from '../@v2/atlp-sidebar/atlp-sidebar.module';
import { MatMenuModule } from '@angular/material/menu';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { VerifyUserMobileComponent } from './verify-user-mobile.component';
import { VerifyUserMobileOTPComponent } from './verify-usermobileotp/verify-usermobileotp.component';

@NgModule({
  declarations: [VerifyUserMobileComponent, VerifyUserMobileOTPComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    FlexLayoutModule,
    CoreModule,
    MatSelectModule,
    NgxMatIntlTelInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    AtlpSidebarV2Module,
    MatTabsModule,
    MatSnackBarModule,
    MatMenuModule,
    NgxOtpInputModule,
  ],
  exports: [VerifyUserMobileComponent, VerifyUserMobileOTPComponent],
})
export class VerifyUserMobileModule {}
