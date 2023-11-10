import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { ApiBaseService } from 'projects/@atlp/lib/atlp-layout/components/header/header-user/services/api-base.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SmartFormService extends ApiBaseService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {
    super(`AtlpDynamicForm`, api, http, false, false, true);
  }
}
