import {
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
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { VerifyUserService } from 'projects/@atlp/services/verify-user.service';
import { VerifyUserMobileModel } from './verify-user-mobile.model';
import { processErrors } from 'projects/@atlp/core/helpers/process-errors.helper';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { VerifyUserMobileOTPComponent } from './verify-usermobileotp/verify-usermobileotp.component';
import { MobileVerificationModel } from '../mfa/EmailVerificationModels';
import { VerifyUserMobileService } from 'projects/@atlp/services/verify-user-mobile.service';
@UntilDestroy()
@Component({
  selector: 'atlp-verify-user-mobile',
  templateUrl: './verify-user-mobile.component.html',
  styleUrls: ['./verify-user-mobile.component.scss'],
})
export class VerifyUserMobileComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(VerifyUserMobileOTPComponent)
  verifyUserOTPComponent: VerifyUserMobileOTPComponent;

  @Output() updateUserDetails = new EventEmitter<any>();
  userInfoDetails: any;
  form: FormGroup;
  // title = "Verify User";
  SidebarName = SidebarName;
  EmailChangeMessage: string;
  EmailValidMessage: string;
  VerifyEmailMessage: string;
  isEmailchangedAfterOTP: boolean = false;

  constructor(
    public atplSidebarService: AtlpSidebarService,
    private verifyUserService: VerifyUserMobileService,
    public translateService: TranslateService,
    private defaultSnakBar: SnakBarService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    private userInfoService: UserInfoService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  OnOTPsuccessfulVerification(e) {
    this.updateUserDetails.emit(e);
    this.toggleV2SidebarOpen(SidebarName.verifyUserMobile);
  }

  ngOnInit(): void {
    this.userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
    this.form = new FormGroup({
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^(9715|\\+9715)(\\d{8,8}\\b)'),
      ]),
    });
    //Validators.pattern("'^(9715|\\+9715)(\\d{8,8}\\b)'")]

    this.form.get('mobile').valueChanges.subscribe((value) => {
      if (!this.form.get('mobile').valid) {
        this.EmailValidMessage = this.translateService.instant(
          'Valid_Mobile_Number'
        );
        this.EmailChangeMessage = '';
      } else {
        if (value?.trim() != this.userInfoDetails?.mobileNumber?.trim()) {
          this.EmailChangeMessage = this.translateService.instant(
            'Mobile_Changed_From_Logged_In'
          );
          this.EmailValidMessage = '';
        } else {
          this.EmailChangeMessage = '';
          this.EmailValidMessage = '';
        }
      }
    });
  }

  ngAfterViewInit() {
    this.form.patchValue({ mobile: this.userInfoDetails?.mobileNumber });
  }

  onemailchangekeyevent(event) {
    // this.isEmailchangedAfterOTP = true;
  }

  ngOnDestroy(): void {}

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  createRequestToSendOTP() {
    var request = new MobileVerificationModel();
    request.RegisteredContactId = this?.userInfoDetails?.id;
    request.RegisteredMobileNo = this?.userInfoDetails?.mobileNumber;
    request.VerifiedMobileNo = this?.form?.get('mobile')?.value;
    return request;
  }

  onVerifyEmail() {
    this.verifyUserService.post(this.createRequestToSendOTP()).subscribe(
      (resp) => {
        if (resp?.success) {
          // this.isEmailchangedAfterOTP = false;
          this.verifyUserOTPComponent.setupInterval();
          this.verifyUserOTPComponent.OTPError = false;
          this.verifyUserOTPComponent.ngxOtp.clear();
          this.toggleV2SidebarOpen(SidebarName.verifyUserMobileOTP);
        } else {
          this.VerifyEmailMessage = resp?.message;
        }
      },
      (error) => {
        if (error && error?.status == 429) {
          this.defaultSnakBar.error(
            this.translateService.instant('Too_Many_Attempts')
          );
        } else {
          this.VerifyEmailMessage =
            error?.error?.errorlst && error?.error?.errorlst.length
              ? processErrors(error?.error?.errorlst)
              : error?.error?.msg;
        }
      }
    );
  }
}
