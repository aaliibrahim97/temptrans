import { Injectable } from '@angular/core';
import { SnakBarService } from '../components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsService {
  constructor(
    private defaultSnakBar: SnakBarService,
    public translate: TranslateService
  ) {}

  // To show the toaser
  showToaster(type: 'error' | 'success', message: string, value?: any) {
    this.defaultSnakBar[type](
      this.translate.instant(message, {
        value: value,
      })
    );
  }

  // Construct URL Based on Lang
  constructURLBasedOnLang(lang: string, url: string) {
    return lang == 'en'
      ? url
      : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
  }
}
