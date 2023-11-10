import { ITestVoyageCardData } from './ITestVoyageCardData';
import { ITestVoyageInfoData } from './ITestVoyageInfoData';

export interface ITestVoyageData {
  [x: string]: any;
  id: number;
  info: ITestVoyageInfoData;
  rotation: ITestVoyageCardData;
  customs: ITestVoyageCardData;
  terminal: ITestVoyageCardData;
  callRequest: ITestVoyageCardData;
  manifest: ITestVoyageCardData;
  discharge: ITestVoyageCardData;
  loading: ITestVoyageCardData;
}
