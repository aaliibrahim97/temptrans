export enum TestVoyageCardStatus {
  approved = 'approved',
  rejected = 'rejected',
  blocked = 'blocked',
  pending = 'pending',
  addCr = 'addCr',
  addMf = 'addMf',
  addDl = 'addDl',
  addLl = 'addLl',
  added = 'added',
  na = 'na',
}

export interface ITestVoyageCardData {
  status?: TestVoyageCardStatus;
  statusText?: string;
  id?: number;
  time?: string;
  date?: string;
  textInfo?: string;
  textDescr?: string;
  update?: string;
  addition?: string;
  duration?: number;
}
