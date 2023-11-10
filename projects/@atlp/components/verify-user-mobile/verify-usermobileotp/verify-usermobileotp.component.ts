import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
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
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { UserEmailOTPService } from 'projects/@atlp/services/verify-useremailotp.service';
import { VerifyUserService } from 'projects/@atlp/services/verify-user.service';
import {
  EmailVerificationModel,
  MobileVerificationModel,
} from '../../mfa/EmailVerificationModels';
import { processErrors } from 'projects/@atlp/core/helpers/process-errors.helper';
import { VerifyUserMobileService } from 'projects/@atlp/services/verify-user-mobile.service';
import { UserMobileOTPService } from 'projects/@atlp/services/verify-usermobileotp.service';

//test
@UntilDestroy()
@Component({
  selector: 'atlp-verify-mobile-userotp',
  templateUrl: './verify-usermobileotp.component.html',
  styleUrls: ['./verify-usermobileotp.component.scss'],
})
export class VerifyUserMobileOTPComponent
  implements OnInit, OnDestroy, OnChanges
{
  @ViewChild('ngxotp') ngxOtp: NgxOtpInputComponent;
  @Output() OnOTPsuccessfulVerificationEvent = new EventEmitter<any>();
  @Input() userInfoDetails: any;
  @Input() enteredEmail: any;
  seconds = 120;
  interval;
  SidebarName = SidebarName;
  VerifyEmailMessage: any;
  errorlst: any;
  maskedemail: string;
  resentSuccess: boolean = false;
  requestPending = false;
  OTPError: boolean = false;

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
    private changeDetect: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    private emailotpservice: UserMobileOTPService,
    private verifyUserService: VerifyUserMobileService,
    private defaultSnakBar: SnakBarService,
    public translateService: TranslateService,
    private _atplSidebarV2Service: AtlpSidebarV2Service
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.userInfoDetails = this.userInfoDetails;
    this.enteredEmail = this.enteredEmail;
    this.maskedemail = this.censorEmail(this.enteredEmail);
  }

  ngOnInit(): void {
    this.setupInterval();
  }

  setupInterval() {
    this.seconds = 120;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(this.interval);
        if (this.ngxOtp) {
          this.ngxOtp.clear();
        }
      }
      this.changeDetect.detectChanges();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.ngxOtp) {
      this.ngxOtp.clear();
    }
  }
  // censorWord = function (str) {
  //   return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
  // };

  censorEmail = function (email) {
    if (email) {
      return email.slice(2).replace(/.(?=...)/g, '*');
    } else {
      return '';
    }
  };

  onResendClick() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.ngxOtp.clear();
    this.resentSuccess = true;
    this.SendEmailOTP();
  }
  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  onYesClick() {}

  onNoClick() {
    this.toggleV2SidebarOpen(SidebarName.cancelregistrationDialog);
  }

  onOTPChange(code) {
    this.OTPError = false;
    this.resentSuccess = false;
    const stringCode = code.join('');
    if (stringCode.length >= 6 && !this.requestPending) {
      var request = new MobileVerificationModel();
      request.RegisteredContactId = this?.userInfoDetails?.id;
      request.RegisteredMobileNo = this?.userInfoDetails?.mobileNumber;
      request.VerifiedMobileNo = this.enteredEmail;
      request.OTP = stringCode;
      this.ngxService.start();
      this.requestPending = true;
      this.emailotpservice.post(request).subscribe(
        (res: any) => {
          this.ngxService.stop();
          this.requestPending = false;
          if (res?.success) {
            this.toggleV2SidebarOpen(SidebarName.verifyUserMobileOTP);
            this.OnOTPsuccessfulVerificationEvent.emit();
          } else {
          }
        },
        (error) => {
          this.ngxService.stop();
          this.requestPending = false;
          if (error && error?.status == 429) {
            this.defaultSnakBar.error(
              this.translateService.instant('Too_Many_Attempts')
            );
          } else {
            error?.error?.errorlst?.forEach((val) => {
              if (
                val.error != null &&
                val.error != '' &&
                (val.error == 'ERR_UM_09' || val.error == 'ERR_UM_10')
              ) {
                if (val.error == 'ERR_UM_09') {
                  this.OTPError = true;
                }
              } else {
                this.errorlst = processErrors(error?.error?.errorlst);
              }
            });
          }
        }
      );
    }
  }

  createRequestToSendOTP() {
    var request = new MobileVerificationModel();
    request.RegisteredContactId = this?.userInfoDetails?.id;
    request.RegisteredMobileNo = this?.userInfoDetails?.mobileNumber;
    request.VerifiedMobileNo = this.enteredEmail;
    return request;
  }

  SendEmailOTP() {
    this.verifyUserService.post(this.createRequestToSendOTP()).subscribe(
      (resp) => {
        if (resp?.success) {
          if (this.resentSuccess) {
            this.defaultSnakBar.success('OTP_RESENT_SUCCESS');
          }
          this.setupInterval();
        } else {
          this.VerifyEmailMessage = resp?.message;
        }
      },
      (error) => {
        this.VerifyEmailMessage =
          error?.error?.errorlst && error?.error?.errorlst.length
            ? processErrors(error?.error?.errorlst)
            : error?.error?.msg;
      }
    );
  }

  displayTimer(value: number) {
    const sec_num = value;
    let hours: any = Math.floor(sec_num / 3600);
    let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    let seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds;
  }
}
