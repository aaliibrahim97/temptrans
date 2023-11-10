import { HttpClient, HttpContext } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAuthServiceInterface } from '../auth/interfaces';
import { ITokenParseModel } from '../auth/interfaces/ITokenParseModel';
import { AtlpEnvService } from '../environments/env.service';
import { DashboardInstanceStoreService } from '@mg_core/atlp-dashboard-designer';

interface ITransactionDataModel {
  UserID: string;
  UserName: string;
  TransactionTypeCode: string;
  TransactionCompletedDate: string;
  UserCompany: string;
  TransactionCreatedDate: string;
  UserEmailId: string;
  ATLPReferenceNumber: string;
  PortCode: string;
  PortName: string;
  RotationNumber: string;
}

interface ICreateTransactionDataModel {
  TransactionTypeCode: string;
  TransactionCompletedDate: string;
  TransactionCreatedDate: string;
  ATLPReferenceNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class HappinessIndexService {
  userInfoFromToken: ITokenParseModel;
  triggerHappinessIndex = new BehaviorSubject('default');
  isHappinessIndex = new BehaviorSubject('show');

  happinessIndexCount = new BehaviorSubject<number>(0);

  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private dashboardInstanceStoreService: DashboardInstanceStoreService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {}

  public getAllTranscation(userName: string, Ucid: string): Observable<any> {
    return this.http.get(
      `${this.api.crmFeedBackAPI}HappinessSurvey/gettransactions`,
      // {
      //   headers: {
      //     UserName: userName,
      //     Ucid: Ucid,
      //   },
      // }
      {
        context: new HttpContext().set(
          this.dashboardInstanceStoreService.DASH_INTERCEPTER_HEADERS_INSTANCE,
          new Map<string, string>().set('UserName', userName).set('Ucid', Ucid)
        ),
        headers: {
          UserName: userName,
          Ucid: Ucid,
        },
      }
    );
  }

  public postTransaction(data: ITransactionDataModel): Observable<any> {
    return this.http.post(
      `${this.api.crmFeedBackAPI}HappinessSurvey/PostTransaction`,
      data
    );
  }

  public updateRating(data): Observable<any> {
    return this.http.put(
      `${this.api.crmFeedBackAPI}HappinessSurvey/UpdateFeedbackRating`,
      data
    );
  }

  private happinessSurveyTransaction(
    data: ICreateTransactionDataModel
  ): Observable<any> {
    return this.http.post(
      `${this.api.UserManagementAPIVersionOne}HappinessSurvey`,
      data
    );
  }

  public createTransaction(
    typeCode: string,
    completedDate: string,
    CreatedDate: string,
    refNumber: string
  ) {
    let data: ICreateTransactionDataModel = {
      TransactionTypeCode: typeCode,
      TransactionCompletedDate: completedDate,
      TransactionCreatedDate: CreatedDate,
      ATLPReferenceNumber: refNumber,
    };
    this.happinessSurveyTransaction(data).subscribe((res) => {});
  }

  //

  //Will be uncommented for any other sub module
  // public createTransaction() {
  //     let userInfoDataFromToken = null;
  //     let userInfoServiceData = null;
  //     userInfoDataFromToken =  this.authService.userDataFromToken();
  //     if (this.userInfoService.userInfoDetails && this.userInfoService.userInfoDetails.data != null) {
  //         userInfoServiceData = this.userInfoService.userInfoDetails.data ? this.userInfoService.userInfoDetails.data : null;
  //     }
  //     if (userInfoServiceData && userInfoServiceData != null) {
  //         const selectedCompanyID = localStorage.getItem('selectedCompanyID');
  //         const company = userInfoServiceData.organizations.filter(x => x.id == selectedCompanyID);
  //         let transactionData: ITransactionDataModel = {
  //             "UserID": userInfoDataFromToken && userInfoDataFromToken.UserId ? userInfoDataFromToken.UserId : '',
  //             "UserName": userInfoDataFromToken && userInfoDataFromToken.UserName ? userInfoDataFromToken.UserName : '',
  //             "TransactionTypeCode": "",
  //             "TransactionCompletedDate": new Date().toLocaleString('en-GB'),
  //             "UserCompany": company && company.length > 0 ? company[0].tradeName["en-US"] : '',
  //             "TransactionCreatedDate": new Date().toLocaleString('en-GB'),
  //             "UserEmailId": userInfoDataFromToken && userInfoDataFromToken.Email ? userInfoDataFromToken.Email : '',
  //             "ATLPReferenceNumber": "",
  //             "PortCode": "",
  //             "PortName": "",
  //             "RotationNumber": ""
  //         }
  //         this.postTransaction(transactionData).subscribe(res => {
  //             if (res) { }
  //         })
  //     }

  // }
}
