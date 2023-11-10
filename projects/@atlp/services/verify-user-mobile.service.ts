import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { AtlpEnvService } from '../environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyUserMobileService extends ApiBaseService {
  constructor(
    private api: AtlpEnvService,
    private http: HttpClient,
    private translate: AtlpTranslationService
  ) {
    super(`accountverify/mobile/otp`, api, http, translate, false, true, false);
  }
}
