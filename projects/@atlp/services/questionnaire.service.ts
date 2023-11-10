import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITokenParseModel } from '../auth/interfaces/ITokenParseModel';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  userInfoFromToken: ITokenParseModel;
  triggerHappinessIndex = new BehaviorSubject('default');
  isHappinessIndex = new BehaviorSubject('show');

  constructor(
    private api: AtlpEnvService,
    private http: HttpClient
  ) { }

  public getAdegSectorType(): Observable<any> {
    return this.http.get(
      `${this.api.lookupbaseUrl}lookup?Type=DEDSECTORS&fields=lookup_type,name,description,metadata,parent_Name,children`
    );
  }

  public postSubmit(data): Observable<any> {
    return this.http.post(
      `${this.api.baseApiUrl}UserManagement/AdegQuestionnaire`,
      data
    );
  }

  public ADEGService(ucid, userId) {
    return this.http.get(`${this.api.baseApiUrl}UserManagement/CheckIndustrialUser?ucid=${ucid}&userId=${userId}`)
  }
}
