import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SnakBarService } from '../snak-bars/service/snak-bar-default.component';
import { AtlpFooterService } from 'projects/@atlp/services/atlp-footer.service';
import { Observable } from 'rxjs';
import { FooterCaptcha } from './footerCaptcha.captcha';
import { map } from 'rxjs/operators';
@Component({
  selector: 'atlp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  emailForm: FormGroup;
  currentYear: any;
  copyright: any;
  selectedLanguage = 'en';
  isFooterJosoorProd: boolean = false;
  isFooterCashDisProd: boolean = false;
  isJosoorAR = true;
  code: any = '';
  generateCaptcha$: Observable<FooterCaptcha>;
  captchaSeconds = 120;
  captchaInterval: any;
  captchaToken: string = '';
  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;
  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  type: 'image' | 'audio';
  submitted: boolean = false;
  enableCaptcha: boolean = true;
  emailVal: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private _iconsService: IconsService,
    private atlpTranslationService: AtlpTranslationService,
    public envService: AtlpEnvService,
    private defaultSnakBar: SnakBarService,
    private atlpFooterService: AtlpFooterService,
    private changeDetect: ChangeDetectorRef,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    this._iconsService.registerIcons(this.icons);
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      recaptcha: new FormControl('', [Validators.required]),
    });
    this.isFooterJosoorProd = this.envService.isFooterJosoorProd;
    this.isFooterCashDisProd = this.envService.isFooterCashDisProd;
    this.currentYear = new Date().getFullYear();
    this.copyright = this.translate.instant('COPYRIGHT', {
      value: this.currentYear,
    });
  }

  ngOnDestroy(): void {}

  private get icons(): Array<string> {
    return [
      'Facebook',
      'Youtube',
      'Instagram',
      'LinkedIn',
      'Twitter',
      'mail-icon',
      'tel-icon',
      'ad-ports',
      'ded',
      'maqta',
      'footerArrow',
      'refresh',
    ];
  }

  constructURL(type: string, url: string) {
    if (type == 'atlp') {
      const baseUrl = this.envService.atlpFooterBaseUrl;
      const currentLang =
        this.selectedLanguage.toLowerCase() == 'ar' ||
        this.selectedLanguage.toLowerCase() == 'ae'
          ? 'ar'
          : 'en';
      this.isJosoorAR = currentLang == 'ar' ? false : true;
      return `${baseUrl}/${currentLang}/${url}`;
    } else if (type == 'adeg') {
      const baseUrl = this.envService.adegFooterBaseUrl;
      const currentLang =
        this.selectedLanguage.toLowerCase() == 'ar' ||
        this.selectedLanguage.toLowerCase() == 'ae'
          ? 'ar'
          : 'en';
      return currentLang == 'en'
        ? `${baseUrl}/${url}`
        : `${baseUrl}/${currentLang}/${url}`;
    } else {
      return '';
    }
  }

  redirectURL(type: string) {
    if (type == 'CashDisclosure') {
      const currentLang =
        this.selectedLanguage.toLowerCase() == 'ar' ||
        this.selectedLanguage.toLowerCase() == 'ae'
          ? 'ar'
          : 'en';
      return currentLang == 'en'
        ? this.envService.IACDecCashDisclosureUrl
        : this.envService.IACDecCashDisclosureARUrl;
    }
    return '';
  }

  enableCaptchaCode() {
    this.emailVal = this.emailForm.get('email').value;
    if (this.emailVal && !this.emailForm.controls['email'].invalid) {
      this.submitted = true;
      this.enableCaptcha = false;
      this.regenerateCaptcha();
    } else {
      //this.emailForm.reset();
      this.submitted = false;
      this.enableCaptcha = true;
    }
    if (this.emailForm.invalid) return;
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      this.emailVal = this.emailForm.get('email').value;
      this.code = this.emailForm.get('recaptcha').value;
      this.atlpFooterService
        .postSubmit(this.emailVal, this.code, this.captchaToken)
        .subscribe(
          (res) => {
            if (res?.success) {
              this.enableCaptcha = true;
              this.submitted = false;
              this.emailForm.reset({
                email: '',
                recaptcha: '',
              });
              this.defaultSnakBar.success(
                this.translate.instant('SubmitSuccess')
              );
            } else {
              this.submitted = true;
              this.enableCaptcha = true;
              this.defaultSnakBar.error(res?.msg);
            }
          },
          (error) => {
            this.defaultSnakBar.error(error?.error?.msg);
          }
        );
    } else {
      this.submitted = false;
      this.enableCaptcha = true;
    }
  }

  regenerateCaptcha() {
    if (this.emailForm) {
      this.emailForm.patchValue({
        recaptcha: '',
      });
    }
    this.generateCaptcha$ = this.atlpFooterService.generateCaptcha().pipe(
      map((res) => {
        res.image = `data:image/png;base64,${res.image}`;
        this.captchaToken = res.token;
        this.setupCaptchaInterval();
        return res;
      })
    );
  }

  setupCaptchaInterval() {
    this.captchaSeconds = 120;
    if (this.captchaInterval) {
      clearInterval(this.captchaInterval);
    }
    this.captchaInterval = setInterval(() => {
      this.captchaSeconds--;
      if (this.captchaSeconds <= 0) {
        clearInterval(this.captchaInterval);
        this.emailForm.patchValue({
          recaptcha: '',
        });
        this.regenerateCaptcha();
      }
      this.changeDetect.detectChanges();
    }, 1000);
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
  }
  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
  }
}
