import { Injectable } from '@angular/core';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AirMenuService {
  constructor(private userInfoService: UserInfoService) {}

  getAirUserType(): any {
    let userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;

    if (
      userInfoDetails?.selectedCompany?.contactRoles?.some(
        (x) =>
          x.code?.toUpperCase() == 'MGS' ||
          x.code?.toUpperCase()?.trim() == 'L2ADMIN'
      )
    ) {
      return AirUser.SDUser;
    } else if (
      userInfoDetails?.selectedCompany?.contactRoles?.some(
        (x) => x.code?.toUpperCase() == 'GHA' || x.code?.toUpperCase() == 'GHS'
      )
    ) {
      return AirUser.SPUser;
    } else if (
      userInfoDetails?.selectedCompany?.contactRoles?.some(
        (x) => x.code?.toUpperCase() == 'PLC'
      )
    ) {
      return AirUser.POUser;
    } else if (
      userInfoDetails?.selectedCompany?.profiles?.some(
        (x) => x.code?.toUpperCase() == 'FFW'
      )
    ) {
      return AirUser.FFUser;
    } else {
      return AirUser.NotanAirUser;
    }
  }
}

export enum AirUser {
  SPUser = 0,
  POUser = 1,
  FFUser = 2,
  NotanAirUser = 4,
  SDUser = 5,
}
