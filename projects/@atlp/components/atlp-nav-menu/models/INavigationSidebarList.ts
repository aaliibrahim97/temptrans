import { INavigationListData } from './INavigationListData';

export interface INavigationSidebarList {
  id: string;
  iconName: string;
  workingName: string;
  translate?: string;
  active: boolean;
  hideMenu?: boolean;
  url?: string;
  useImgPng?: boolean;
  content?: INavigationListData[];
  contentRecent?: INavigationListData[];
  permission?: any[];
  redirectUrl?: string;
  redirectUrlSamePage?: string;
  openSideBar?: string;
  isLink?: boolean;
  isIndividual?: boolean;
  isProfileInfoRequired?: boolean;
}
