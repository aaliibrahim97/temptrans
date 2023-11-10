import { CardStatus } from '../enums/card-status.enum';

export interface IVoyageCardData {
  status?: CardStatus;
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
