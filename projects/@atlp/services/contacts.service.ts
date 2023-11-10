import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  selectedTheme: string;
  constructor(private api: AtlpEnvService, private http: HttpClient) {}

  public postUserPreference(data: any, contactID: string): Observable<any> {
    return this.http.post(
      `${this.api.usermanagementbaseUrl}Contacts/${contactID}/UserPreference`,
      data
    );
  }

  public postCompanyPreference(data: any): Observable<any> {
    return this.http.put(
      `${this.api.userPreferenceBaseURL}v1/UserPreference/companypreference`,
      data
    );
  }

  public getUserPreference(contactID: string): Observable<any> {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Contacts/${contactID}/MetaDatas?type=UserPreferences`
    );
  }

  public getOrganizationsBasedOnContact(contactID: string): Observable<any> {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}Contacts/${contactID}/organizations`
    );
  }

  public setuserPreference(data: any): Observable<any> {
    return this.http.post(
      `${this.api.userPreferenceBaseURL}v1/UserPreference`,
      data
    );
  }

  public updateuserPreference(data: any): Observable<any> {
    return this.http.put(
      `${this.api.userPreferenceBaseURL}v1/UserPreference`,
      data
    );
  }

  public getSaveduserPreference(contactID: string): Observable<any> {
    return this.http.get(
      `${this.api.userPreferenceBaseURL}v1/UserPreference/contact/${contactID}`
    );
  }

  public updateUserTheme(contactID: any, theme: string): Observable<any> {
    return this.http.put(
      `${this.api.userPreferenceBaseURL}v1/UserPreference/contact/${contactID}/theme/${theme}`,
      {}
    );
  }

  public updateUserLanguage(
    contactID: any,
    selectedLang: string
  ): Observable<any> {
    return this.http.put(
      `${this.api.userPreferenceBaseURL}v1/UserPreference/contact/${contactID}/language/${selectedLang}`,
      {}
    );
  }
}
