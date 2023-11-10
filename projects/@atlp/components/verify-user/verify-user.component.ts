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
import { VerifyUserOTPComponent } from './verify-userotp/verify-userotp.component';
import { VerifyUserModel } from './verify-user.model';
import { processErrors } from 'projects/@atlp/core/helpers/process-errors.helper';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
@UntilDestroy()
@Component({
  selector: 'atlp-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(VerifyUserOTPComponent)
  verifyUserOTPComponent: VerifyUserOTPComponent;

  @Output() updateUserDetailsEmitter = new EventEmitter<any>();
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
    private verifyUserService: VerifyUserService,
    public translateService: TranslateService,
    private defaultSnakBar: SnakBarService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    private userInfoService: UserInfoService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  OnOTPsuccessfulVerification(e) {
    this.updateUserDetailsEmitter.emit(e);
    this.toggleV2SidebarOpen(SidebarName.verifyUser);
  }

  ngOnInit(): void {
    this.userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.form.patchValue({ email: this.userInfoDetails?.emailAddress });
    this.form.get('email').valueChanges.subscribe((value) => {
      if (!this.form.get('email').valid) {
        this.EmailValidMessage = this.translateService.instant(
          'Valid_Email_Address'
        );
        this.EmailChangeMessage = '';
      } else {
        if (value?.trim() != this.userInfoDetails?.emailAddress?.trim()) {
          this.EmailChangeMessage = this.translateService.instant(
            'Email_Changed_From_Logged_In'
          );
          this.EmailValidMessage = '';
        } else {
          this.EmailChangeMessage = '';
          this.EmailValidMessage = '';
        }
      }
    });
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
    var request = new VerifyUserModel();
    request.RegisteredContactId = this?.userInfoDetails?.id;
    request.RegisteredEmail = this?.userInfoDetails?.emailAddress;
    request.VerificationEmail = this?.form?.get('email')?.value;
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
          this.toggleV2SidebarOpen(SidebarName.verifyUserOTP);
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
