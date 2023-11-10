export interface IUserData {
  /**
   * firstName
   */
  firstName: string;
  /**
   * lastName
   */
  lastName: string;
  /**
   * imgUrl
   */
  imgUrl: string;

  /**
   * company/s the user belogngs to
   */
  companies: ICompany[];
}

export interface ICompany {
  /**
   * company name
   */
  name: string;
  /**
   * company unique identitifier
   */
  ucid: string;
}
