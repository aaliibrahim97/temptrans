export enum userState {
  REGISTERED = 'Registered',
  COMPANY_DRAFT = 'CompanyDraft',
  COMPANY_SUBMITTED = 'CompanySubmitted',
  INDIVIDUAL_DRAFT = 'IndividualDraft',
  INDIVIDUAL_SUBMITTED = 'IndividualSubmitted',
  COMPANY_ROC = 'CompanyReturnForCorrection',
  INDIVIDUAL_ROC = 'IndividualReturnForCorrection',
  COMPANY_APPROVED = 'CompanyApproved',
  INDIVIDUAL_APPROVED = 'IndividualApproved',
  COMPANY_INPROGRESS = 'CompanyInProgress',
  INDIVIDUAL_INPROGRESS = 'IndividualInProgress',
  INDIVIDUAL_REJECTED = 'IndividualRejected',
  COMPANY_REJECTED = 'CompanyRejected',
  COMPANY_SUBMISSION_INPROGRESS = 'CompanySubmissionInProgress',
}

export enum UserStatusEnum {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  SUBMISSIONINPROGRESS = 'SUBMISSIONINPROGRESS',
  INPROGRESS = 'INPROGRESS',
  APPROVED = 'APPROVED',
  REGISTERED = 'REGISTERED',
}

export enum AccountVerificationStatus {
  Verified = 1,
  VerificationInProgress = 2,
  NotVerified = 3,
}

export enum documentType {
  PROFILE = 'PROFILE',
  IOPROFILE = 'IOPROFILE',
}
