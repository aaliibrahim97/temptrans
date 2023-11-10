import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { NgxAngularMaterialHijriAdapterService } from '../adapter/ngx-angular-material-hijri-adapter.service';
import { DateLocaleKeys } from '../adapter/entities/moment-hijri-date-locale-keys.enum';
import * as moment from 'moment';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import * as _momentH from 'moment-hijri';
import { ATLP_MOMENT_HIJRI_DATE_FORMATS } from '../const/ATLP_MOMENT_HIJRI_DATE_FORMATS';

@Directive({
  selector: '[atlpHijriDatePicker]',
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
    // Change the format by using `MOMENT_HIJRI_DATE_FORMATS` for Dates and `MOMENT_HIJRI_DATE_TIME_FORMATS` for date/time.
    { provide: MAT_DATE_FORMATS, useValue: ATLP_MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    { provide: MAT_DATE_LOCALE, useValue: DateLocaleKeys.EN_US },
  ],
})
export class HijriDatePickerDirective implements AfterViewInit, OnDestroy {
  valueSubscription: any;
  constructor(
    private hijriDateAdapter: NgxAngularMaterialHijriAdapterService,
    private el: ElementRef,
    private renderer: Renderer2,
    public atlpTranslationService: AtlpTranslationService
  ) {
    this.hijriDateAdapter?.setLocale(DateLocaleKeys.EN_US);

    // this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
    //   this.hijriDateAdapter?.setLocale(
    //     lang === "ae" || lang == DateLocaleKeys.AR
    //       ? DateLocaleKeys.AR_SA
    //       : DateLocaleKeys.EN_US
    //   );
    // });
  }

  ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    const inputTag: any = Array.from(hostElem.children).find(
      (x: any) => x.tagName === 'INPUT'
    );
    if (inputTag) {
      const maxHijri = moment()
        .add(50, 'years')
        .format('E MMM d yyyy HH:mm:ss zzz');
      const minHijri = moment()
        .add(-60, 'years')
        .set('months', 1)
        .set('days', 1)
        .format('E MMM d yyyy HH:mm:ss zzz');

      const maxHijriISO = moment()
        .add(50, 'years')
        .format("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
      const minHijriISO = moment()
        .add(-60, 'years')
        .set('months', 1)
        .set('days', 1)
        .format("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

      this.renderer.setAttribute(inputTag, 'ng-reflect-max', maxHijri);
      this.renderer.setAttribute(inputTag, 'ng-reflect-min', minHijri);
      this.renderer.setAttribute(inputTag, 'max', maxHijriISO);
      this.renderer.setAttribute(inputTag, 'min', minHijriISO);
    }
  }
}
