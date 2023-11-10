import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { ToastrService } from 'ngx-toastr';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
// import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';

@Component({
  selector: 'app-payment-otp',
  templateUrl: './payment-otp.component.html',
  styleUrls: ['./payment-otp.component.scss'],
})
export class PaymentOtpComponent implements OnInit {
  @Input() dialogData: any;
  @Output() setPaymentOTP: EventEmitter<any> = new EventEmitter();
  @Output() setResendPaymentOTP: EventEmitter<any> = new EventEmitter();
  SidebarName = SidebarName;
  isResendEnable: boolean = false;
  otpCountDowninterval: any;
  title = 'otp';
  form: FormGroup;
  formInput = [
    'payment-otp-input1',
    'payment-otp-input2',
    'payment-otp-input3',
    'payment-otp-input4',
    'payment-otp-input5',
    'payment-otp-input6',
  ];
  @ViewChildren('formRow') rows: any;

  constructor(
    private _atplSidebarService: AtlpSidebarV2Service,
    private toaster: ToastrService
  ) {
    this.form = this.toFormGroup(this.formInput);
  }
  ngOnInit() {}
  toFormGroup(elements) {
    const group: any = {};

    elements.forEach((key) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
    if (index == 5 && event.code != 'Backspace') {
      this.PaymentOTPValidation();
    }
  }

  PaymentOTPValidation() {
    var paymentOTP = this.form.value['payment-otp-input1'];
    paymentOTP = paymentOTP + this.form.value['payment-otp-input2'];
    paymentOTP = paymentOTP + this.form.value['payment-otp-input3'];
    paymentOTP = paymentOTP + this.form.value['payment-otp-input4'];
    paymentOTP = paymentOTP + this.form.value['payment-otp-input5'];
    paymentOTP = paymentOTP + this.form.value['payment-otp-input6'];
    paymentOTP = paymentOTP.replace(' ', '');

    if (paymentOTP == null || paymentOTP == '' || paymentOTP.length != 6) {
      this.toaster.error('Please enter valid OTP');
    } else {
      this.VerifyOTPProcessFromMPAY(paymentOTP);
    }
    this.rows._results[0].nativeElement.focus();
    this.form.reset();
  }
  VerifyOTPProcessFromMPAY = (paymentOTP) => {
    this.setPaymentOTP.emit(paymentOTP);
  };
  ResendOTPProcess() {
    this.form.reset();
    this.setResendPaymentOTP.emit(true);
    this.rows._results[0].nativeElement.focus();
    this.countDown();
  }
  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
    this.form.reset();
  }
  countDown() {
    clearInterval(this.otpCountDowninterval);
    var countDown = 30;
    document.getElementById('OTPResendText').innerText =
      'Send again OTP option will be available after : ';
    document.getElementById('OTPResendLink').innerText = '';

    this.otpCountDowninterval = setInterval(() => {
      if (countDown > 0) {
        countDown = countDown - 1;
        document.getElementById('OTPResendCount').innerText =
          countDown.toString();
        this.isResendEnable = false;
      } else {
        this.isResendEnable = true;
        clearInterval(this.otpCountDowninterval);
        document.getElementById('OTPResendCount').innerText = '';
        document.getElementById('OTPResendText').innerText =
          'SMS code not received? ';
        document.getElementById('OTPResendLink').innerText = 'Send Again';
      }
    }, 1000);
  }
}
