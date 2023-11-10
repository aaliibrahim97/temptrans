import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentMgmtService {
  baseUrl: string;
  constructor(private http: HttpClient, private envService: AtlpEnvService) {
    this.baseUrl = this.envService.DocumentMangementApi;
  }

  downloadTemplate(id: string) {
    return this.http.get(`${this.baseUrl}supportdocument/download/${id}`, {
      responseType: 'blob',
    });
  }

  downloadTemplatebyURL(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
}
