import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { AtlpEnvService } from '../environments/env.service';
import { ApiBaseService } from '../lib/atlp-layout/components/header/header-user/services/api-base.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileUploadService } from './file-upload.service';

export interface IProfilePicData {
  referenceID: string;
  deleteLink: string;
  downloadLink: string;
  imageURL: SafeResourceUrl | '';
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoService extends ApiBaseService {
  userInfo: any = null;
  userInfoResponse: any = null;
  UCID: any = null;
  userId: string = null;
  email: any = null;
  contactId: any = null;
  userOrganization: any = null;
  allOrganizations: any = null;
  dataUpdated = new BehaviorSubject<string>('');
  profilePicUpdated = new BehaviorSubject<string>('');
  public profilePicData: IProfilePicData = <IProfilePicData>{};
  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {
    super(`UserInfo`, api, http, false, true);
  }

  getuserSelectedCompanyID(): any {
    return localStorage.getItem('selectedCompanyID');
  }

  getuserUCID(): any {
    return this.UCID;
  }

  getuserEmail(): any {
    return this.email;
  }

  getContactID(): any {
    return this.contactId;
  }

  getuserOrganization(): any {
    return this.userOrganization;
  }

  //will check if details are there or not then the call will be made to fetch
  //the user info details for logged in user
  getUserInfoDetails(): any {
    if (!this.userInfoResponse) {
      this.getUserInfoReponse();
    }
    return this.userInfoResponse;
  }

  getAllOrganizations(): any {
    return this.allOrganizations;
  }

  getUserInfoReponse() {
    this.get().subscribe(
      (resp) => {
        if (resp?.data) {
          this.userInfoResponse = resp;
          this.userInfo = resp;
          this.processUserInfoResponse(resp);
        }
      }
      //  error =>{
      //    return of({});
      //  }
    );
  }

  setUserInfoFromToken(): Observable<any> {
    if (!this.userInfo) {
      return this.getUserInfo();
    } else {
      return of(this.userInfo);
    }
  }
  // only enhancement of UCID in the old one

  processUserInfoResponse(response): any {
    if (response?.data) {
      this.email = response?.data?.emailAddress;
      this.contactId = response?.data?.id;
      let selectedCompanyID = localStorage.getItem('selectedCompanyID');
      this.allOrganizations = response?.data?.organizations;
      if (selectedCompanyID) {
        response.data.selectedCompany = response?.data?.organizations?.filter(
          (x) => x?.id == selectedCompanyID
        )[0];
        this.UCID = response.data.selectedCompany?.ucid;
        this.userOrganization = response.data.selectedCompany;
        this.userId = response.data.selectedCompany?.id;
        return response;
      } else {
        this.userId = response.data?.organizations?.filter(
          (org) => org.contactType?.toLowerCase() == 'individual'
        )[0]?.id;
      }
    }
    return response;
  }

  //old methods  will be removed after discussion with other streams

  get userInfoDetails(): any {
    return this.userInfo;
  }

  getUserInfo(): Observable<any> {
    let resp = this.get().pipe(
      map((resp) => {
        if (resp?.data) {
          this.userInfo = resp;
          return this.processUserInfoResponse(resp);
        } else {
          console.log('Empty user info => ', resp);
        }
      }),
      catchError((e) => {
        return of({});
      })
    );
    return resp;
  }

  getImageByContact() {
    let queryString = '';
    queryString = `?documentType=PROFILE`;

    return this.fileUploadService.get(this.contactId + queryString).pipe(
      map((res) => {
        const data = res && res?.success ? res?.data : null;
        if (data) {
          this.profilePicData.referenceID = data?.referenceId;
          this.profilePicData.deleteLink = data?.links?.delete;
          this.profilePicData.downloadLink = data?.links?.download;
        }
        return data;
      }),
      switchMap((response) => {
        return this.fileUploadService
          .getDocument(response?.links?.download)
          ?.pipe(
            map((blob) => {
              this.fileUploadService.fileToBase64(blob).then((base64: any) => {
                this.profilePicData.imageURL =
                  this.sanitizer.bypassSecurityTrustResourceUrl(base64) || '';
                this.profilePicUpdated.next('updated');
              });
            })
          );
      })
    );
  }

  getUserProfilePicData(): any {
    return this.profilePicData;
  }
}
