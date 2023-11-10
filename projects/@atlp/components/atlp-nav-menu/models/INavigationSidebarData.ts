import { INavigationListData } from './INavigationListData';
import { INavigationSidebarList } from './INavigationSidebarList';

export interface INavigationSidebarData {
  id: string;
  iconName: string;
  workingName: string;
  active: boolean;
  hideMenu?: boolean;
  url?: string;
  redirectUrl?: string;
  translate?: string;
  list?: INavigationSidebarList[];
  content?: INavigationListData[];
  openSideBar?: string;
  isLink?: boolean;
  isIndividual?: boolean;
  data?: any;
  isProfileInfoRequired?: boolean;
}
