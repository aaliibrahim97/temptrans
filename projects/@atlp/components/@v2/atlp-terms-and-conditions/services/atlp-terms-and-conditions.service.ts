import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AltpTermsAndConditionService {
  service: any;

  constructor(
    private http: HttpClient,
  ) {}

  public GetTermsAndConditions(payload): Observable<any> {
    return this.http.post<any>(
      this.service.GET_TERMS_AND_CONDITIONS_URL(),
      payload
    );
  }
}
