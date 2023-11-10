import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlpEnvService } from '../environments/env.service';
import { PCSBaseService } from './pcs-base.service';

@Injectable({
  providedIn: 'root',
})
export class PCSMenuService extends PCSBaseService {
  constructor(private api: AtlpEnvService, private http: HttpClient) {
    super(
      `InternetServices/api/TruckVisitAppointment/GetUsersPermissions`,
      api,
      http,
      true,
      false
    );
  }
}
