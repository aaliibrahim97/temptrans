import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationReadService extends ApiBaseService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {
    super(`notification/api/userMessage/markasread`, api, http, true);
  }
}
