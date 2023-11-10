import { ManageAccountEnum } from './manage-account.enum';
export module ManageAccountModel {
  export interface IRegistrationViewModel {
    updateType:
      | ManageAccountEnum.CompanyAddress
      | ManageAccountEnum.TradeLicenseInfo
      | ManageAccountEnum.VatInfo;
    organization:
      | ITradeLicenseInfoViewModel
      | IVatInfoViewModel
      | ICompanyAddressViewModel;
    documentList?: IDocumentListViewModel[];
  }
  export interface ITradeLicenseInfoViewModel {
    licenseIssuingCountry: string;
    licenseIssuingEmirates: string;
    licenseIssuingAuthority: string;
    licenseNo: string;
    licenseIssuingDate: string;
    licenseExpiryDate: string;
    tradeName: {
      'ar-AE': string;
      'en-US': string;
    };
    licenseType: string;
    establishmentType: string;
    activities: any[];
    licenseStage: string;
  }

  export interface IVatInfoViewModel {
    vatCategory: string;
    vatNumber: string;
    isVATAccepted: boolean;
  }

  export interface ICompanyAddressViewModel {
    ucid: string;
    licenseIssuingEmirates: string;
    establishmentAddress: string;
    country: string;
    city: string;
    buildingNumber: string;
    poBox: string;
    email: string;
    website: string;
    streetAddress: string;
    tawtheeqMetaData: {
      area: string;
      sector: string;
    };
    phoneNo: string;
    phoneNoCode: string;
  }

  export interface IDocumentListViewModel {
    links?: {};
    fileName: string;
    mimeType: string;
    metaData: any;
    documentNumber: string;
    documentSection: 'Organization';
    documentType: 'VAT' | 'TradeLicense';
    issueDate?: string;
    expiryDate?: string;
    contactType: 3;
  }

  export class FilterModel {
    name: string;
    description: string;
    type: string;
  }
}
