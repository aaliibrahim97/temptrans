import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { MFAService } from 'projects/@atlp/services/mfa.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { SnakBarService } from '../../snak-bars/service/snak-bar-default.component';
import { AtlpSidebarV2Service } from '../../@v2/atlp-sidebar/atlp-sidebar.service';

@UntilDestroy()
@Component({
  selector: 'atlp-verify-mfauserotp',
  templateUrl: './verify-mfauserotp.component.html',
  styleUrls: ['./verify-mfauserotp.component.scss'],
})
export class VerifyMFAUserOTPComponent implements OnInit, OnDestroy {
  @ViewChild('ngxotp') ngxOtp: NgxOtpInputComponent;
  @Output() openQRCodeEmitter = new EventEmitter<any>();
  @Output() verifyMFAOTPClosedEmitter = new EventEmitter<any>();
  @Output() mfaStatusUpdated = new EventEmitter<any>();

  SidebarName = SidebarName;
  errorlst: any;
  OTPError: boolean = false;
  requestPending: boolean = false;
  userInfoDetails: any;
  mfaStatus: boolean;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      input: 'feedback-otp-class',
      inputFilled: 'feedback-otp-filled-class',
      inputDisabled: 'feedback-otp-disable-class',
      inputSuccess: 'feedback-otp-success-class',
      inputError: 'feedback-otp-error-class',
    },
  };

  constructor(
    public atplSidebarService: AtlpSidebarService,
    private ngxService: NgxUiLoaderService,
    private mfaService: MFAService,
    private userInfoService: UserInfoService,
    private defaultSnakBar: SnakBarService,
    private translateService: TranslateService,
    public atplSidebarV2Service: AtlpSidebarV2Service
  ) {}

  ngOnInit(): void {
    this.userInfoDetails = this.userInfoService.getUserInfoDetails();
    this.mfaStatus = this.userInfoDetails?.data?.isMFAEnabled;
  }

  ngOnDestroy() {
    if (this.ngxOtp) {
      this.ngxOtp.clear();
    }
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this.atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  closeMFAVerifyOTPSidebar() {
    this.verifyMFAOTPClosedEmitter.emit('closed');
    this.toggleV2SidebarOpen(SidebarName.verifyMFAUserOTP);
  }

  onOTPChange(code) {
    const stringCode = code.join('');
    if (stringCode.length >= 6 && !this.requestPending) {
      let code = stringCode;
      this.ngxService.start();
      this.requestPending = true;
      this.mfaService
        .genericMFAOTPMethod(!this.mfaStatus ? 'enable' : 'disable', code)
        .subscribe(
          (res: any) => {
            this.ngxService.stop();
            this.requestPending = false;
            if (res?.data) {
              this.OTPError = false;
              this.ngxService.stop();
              this.requestPending = false;
              this.userInfoService.get().subscribe((res) => {
                if (res && res?.data) {
                  this.mfaStatus = res?.data?.isMFAEnabled;
                  this.toggleV2SidebarOpen(SidebarName.verifyMFAUserOTP);
                  if (
                    this.atplSidebarV2Service.getSidebar(
                      SidebarName.verifyMFAUser
                    ).opened
                  ) {
                    this.toggleV2SidebarOpen(SidebarName.verifyMFAUser);
                  }
                  this.ngxOtp.clear();
                  this.mfaStatusUpdated.emit(this.mfaStatus);
                  if (this.mfaStatus) {
                    this.defaultSnakBar.success(
                      this.translateService.instant(
                        'MFA.MFA_ENABLED_SUCCESSFULLY'
                      )
                    );
                  } else {
                    this.defaultSnakBar.success(
                      this.translateService.instant(
                        'MFA.MFA_DISABLED_SUCCESSFULLY'
                      )
                    );
                  }
                }
              });
            } else {
              this.OTPError = true;
              this.ngxOtp.clear();
            }
          },
          (error) => {
            this.ngxService.stop();
            this.requestPending = false;
            this.OTPError = true;
            this.ngxOtp.clear();
          }
        );
    }
  }

  openQRCode() {
    this.toggleV2SidebarOpen(SidebarName.verifyMFAUserOTP);
    this.openQRCodeEmitter.emit('open');
  }
}
