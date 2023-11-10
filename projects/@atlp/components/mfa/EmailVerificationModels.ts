export class EmailVerificationModel {
  VerificationEmail: string;
  RegisteredEmail: string;
  RegisteredContactId: string;
  OTP: string;
}

export class MFAOTPVerificationModel {
  code: string;
}

export class MobileVerificationModel {
  VerifiedMobileNo: string;
  RegisteredMobileNo: string;
  RegisteredContactId: string;
  OTP: string;
}
