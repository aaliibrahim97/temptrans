import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfaComponent } from './mfa.component';
import { AtlpSidebarModule } from '../sidebar/sidebar.module';
import { VerifyMFAUserOTPComponent } from './verify-mfauserotp/verify-mfauserotp.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyMFAUserComponent } from './verify-mfauser/verify-mfauser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpSearchBarModule } from '../search-bar/search-bar.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpSidebarV2Module } from '../@v2/atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [
    MfaComponent,
    VerifyMFAUserComponent,
    VerifyMFAUserOTPComponent,
  ],
  imports: [
    CommonModule,
    AtlpSidebarModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
    AtlpSidebarV2Module,
    AtlpSharedModule,
    AtlpSearchBarModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    FlexLayoutModule,
    AtlpCoreSharedModule,
    CoreModule,
  ],
  exports: [MfaComponent, VerifyMFAUserComponent, VerifyMFAUserOTPComponent],
})
export class MfaModule {}
