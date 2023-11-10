import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpEnvService } from '../environments/env.service';

import { PCSBaseService } from './pcs-base.service';

@Injectable({
  providedIn: 'root',
})
export class PCSSubscriptionService extends PCSBaseService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {
    super(`Subscription/SubscriptionStatus`, api, http, false, true);
  }
}
