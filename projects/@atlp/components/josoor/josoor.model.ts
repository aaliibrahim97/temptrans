export module JosoorModel {
  export interface IJosoorSaveViewModel {
    isDraft: boolean;
    companyInformationDTO: {
      id: string;
      ucid: string;
      companyDetails: IJosoorCompanyDetails;
      typeOfBusiness: string[];
      typeOfBusinessOther: string;
      sectors: string[];
      sectorOther: string;
      companyOverview: string;
      companyProducts: string;
      pointOfContactForSales: IJosoorPOC;
      pointOfContactForGeneric: IJosoorPOC;
      linkedIn: string;
      twitter: string;
      instagram: string;
      facebook: string;
      youtube: string;
      logo: IJosoorDocuments;
      brochures: IJosoorDocuments;
      productImages: IJosoorDocuments;
    };
  }

  interface IJosoorPOC {
    fullName: string;
    jobTitle: string;
    email: string;
    mobileNumber: string;
  }

  interface IJosoorDocuments {
    documentDetails: string[];
    batchId: string;
  }

  interface IJosoorCompanyDetails {
    businessName: string;
    telephone: string;
    website: string;
    licenceNumber: string;
  }

  export class FilterModel {
    name: string;
    description: string;
    type: string;
  }
}
