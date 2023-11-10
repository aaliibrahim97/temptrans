import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  AtlpTranslationLoaderService,
  Locale,
} from 'projects/@atlp/services/translation-loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AtlpTranslationService {
  private onLanguageChanged$ = new BehaviorSubject<string>(
    localStorage.getItem('selectedLang') || 'en'
  );
  languageChanged$ = this.onLanguageChanged$.asObservable();
  direction = 'ltr';
  mode = 'light';
  lang: string;

  constructor(
    private translate: TranslateService,
    private _atlpTranslationLoaderService: AtlpTranslationLoaderService
  ) {}

  translateString(value) {
    return this.translate.instant(value);
  }

  readLangFromUrl() {
    let lang = 'en';
    const urlArray = window.location.href.toLowerCase().split('/');
    if (urlArray.includes('ar')) {
      lang = 'ar';
    }
    return lang;
  }

  setDefaultLanguageSettings(
    lang: string,
    navigationEnglish: Locale,
    navigationArabic: Locale
  ) {
    this._atlpTranslationLoaderService.loadTranslations(
      navigationEnglish,
      navigationArabic
    );
    this.translate.use(lang);
  }

  setCurrentLanguage(lang: string) {
    localStorage.setItem('selectedLang', lang);
    this.lang = lang;
    this.onLanguageChanged$.next(lang);
  }

  public getCurrentLanguage(): Observable<string> {
    this.lang = localStorage.getItem('selectedLang');
    return this.languageChanged$;
    //return of(this.lang);
  }

  public getCurrentLang(): string {
    this.lang = localStorage.getItem('selectedLang');
    return this.lang;
  }

  handleRtlCHange(lang: string) {
    this.lang = lang;
    if (lang.toLowerCase() === 'ae' || lang.toLowerCase() === 'ar') {
      this.direction = 'rtl';
      document.getElementsByTagName('html')[0].dir = 'rtl';
      document.getElementsByTagName('html')[0].classList.add('rtl');
      document.getElementsByTagName('html')[0].lang = 'ar';
    } else {
      this.direction = 'ltr';
      document.getElementsByTagName('html')[0].dir = 'ltr';
      document.getElementsByTagName('html')[0].classList.remove('rtl');
      document.getElementsByTagName('html')[0].lang = 'en';
    }
  }

  handleTheamChange(theamName: string) {
    if (theamName.toLowerCase() === 'dark') {
      this.mode = 'dark';
      localStorage.setItem('atlp-prefs-mode', 'false');
      localStorage.setItem('selectedTheme', 'dark');
      document.getElementsByTagName('body')[0].classList.remove('light');
    } else {
      this.mode = 'light';
      localStorage.setItem('selectedTheme', 'light');
      localStorage.setItem('atlp-prefs-mode', 'true');
      document.getElementsByTagName('body')[0].classList.add('light');
    }
  }
}
