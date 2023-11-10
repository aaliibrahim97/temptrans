import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FooterCaptcha } from '../components/footer/footerCaptcha.captcha';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class AtlpFooterService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {}

  public postSubmit(email, code, token): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        code: code,
        token: token,
      }),
    };
    return this.http.post(
      `${this.api.baseApiUrl}Contacts/subscribe/${email}`,
      {},
      options
    );
  }
  generateCaptcha(): Observable<FooterCaptcha> {
    return this.http
      .get<any>(this.api.usermanagementbaseUrl + 'registrations/captcha')
      .pipe(map((res) => (res.success ? res.data : {})));
  }
}
