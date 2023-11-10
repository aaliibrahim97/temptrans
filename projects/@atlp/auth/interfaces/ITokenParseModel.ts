export interface ITokenParseModel {
  sub: string;
  jti: string;
  pcsTkn: string;
  pcsRtkn: string;
  pcsExp: string;
  companyID: string;
  companyCode: string;
  companyProfileNameEng: string;
  companyProfileCode: string;
  OtherProfiles: string;
  IsPCSSuperUser: string;
  IsAuthorizedUser: string;
  Email: string;
  UserName: string;
  UserId: string;
  UserCode: string;
  CompanyName: string;
  TradeLicenseNumber: string;
  TerminalCode: string;
  TerminalID: string;
  IsBorougeDocCenterUser: string;
  Id: string;
  SecurityStamp: string;
  ZCContactId: string;
  ucID: string;
  isSuperUser: string;
  companyType: string;
  isCFS: string;
  exp: number;
  iss: string;
  aud: string;
}