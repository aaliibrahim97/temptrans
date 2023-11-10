import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class MFAService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {}

  genericMFAOTPMethod(type: string, code: string) {
    return this.http.put(
      `${this.api.usermanagementbaseUrl}userinfo/mfa/${type}/${code}`,
      {}
    );
  }

  public mfaRegister(): Observable<any> {
    return this.http.post(
      `${this.api.usermanagementbaseUrl}userinfo/mfa/register`,
      {}
    );
  }
}
