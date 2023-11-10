export interface MenuContentList {
  description: string;
  url: string;
  redirectUrl?: string;
  translate?: string;
  workingName?: string;
  isLink?: boolean;
  isProfileInfoRequired?: boolean;
  isIndividual?: boolean;
  hideMenu?: boolean;
}

export interface INavigationListData {
  id: string;
  contentName: string;
  translate?: string;
  menuContentList: MenuContentList[];
}
