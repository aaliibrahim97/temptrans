import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { VerifyMFAUserOTPComponent } from '../verify-mfauserotp/verify-mfauserotp.component';
import { AtlpSidebarV2Service } from '../../@v2/atlp-sidebar/atlp-sidebar.service';
@UntilDestroy()
@Component({
  selector: 'atlp-verify-mfauser',
  templateUrl: './verify-mfauser.component.html',
  styleUrls: ['./verify-mfauser.component.scss'],
})
export class VerifyMFAUserComponent implements OnInit, OnDestroy {
  @ViewChild(VerifyMFAUserOTPComponent)
  verifyUserOTPComponent: VerifyMFAUserOTPComponent;
  @Output() refreshDashboard = new EventEmitter<any>();
  @Output() verifyMFAUserClosedEmitter = new EventEmitter<any>();

  form: FormGroup;
  // title = "Verify User";
  SidebarName = SidebarName;
  EmailChangeMessage: string;
  EmailValidMessage: string;
  VerifyEmailMessage: string;
  isEmailchangedAfterOTP: boolean = false;

  constructor(
    public atplSidebarService: AtlpSidebarService,
    public translateService: TranslateService,
    private atlpPortalBridge: AtlpPortalBridgeService,
    private _atplSidebarV2Service: AtlpSidebarV2Service
  ) {}

  OnOTPsuccessfulVerification(e) {
    this.toggleV2SidebarOpen(SidebarName.verifyUser);
  }

  ngOnInit(): void {
    this.atlpPortalBridge.updateMFAQRImage.subscribe((res) => {
      if (res) {
        this.updateQRImage(res);
      }
    });
    this.form = new FormGroup({
      qrCode: new FormControl(''),
    });
  }

  updateQRImage(data: any) {
    this.form = new FormGroup({
      qrCode: new FormControl(data.qrCodeSetupImageUrl),
    });
  }

  ngOnDestroy(): void {}

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  onVerifyOTP() {
    this.toggleV2SidebarOpen(SidebarName.verifyMFAUserOTP);
  }

  closeVerifyMFAUser(key: string) {
    this.verifyMFAUserClosedEmitter.emit('closed');
    this.toggleV2SidebarOpen(key);
  }
}
