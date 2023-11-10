import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NgxAngularMaterialHijriAdapterService } from '../adapter/ngx-angular-material-hijri-adapter.service';
import { DateLocaleKeys } from '../adapter/entities/moment-hijri-date-locale-keys.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import * as _momentH from 'moment-hijri';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconsService } from 'projects/@atlp/services/icons.service';
import * as moment from 'moment';
import {
  ATLP_MOMENT_HIJRI_DATE_FORMATS,
  langServiceFactory,
} from '../const/ATLP_MOMENT_HIJRI_DATE_FORMATS';

@Component({
  selector: 'atlp-hijri-mat-datepicker',
  templateUrl: './atlp-hijri-mat-datepicker.component.html',
  styleUrls: ['./atlp-hijri-mat-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AtlpHijriMatDatepickerComponent,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
    // Change the format by using `MOMENT_HIJRI_DATE_FORMATS` for Dates and `MOMENT_HIJRI_DATE_TIME_FORMATS` for date/time.
    { provide: MAT_DATE_FORMATS, useValue: ATLP_MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    {
      provide: MAT_DATE_LOCALE,
      useFactory: langServiceFactory,
      deps: [AtlpTranslationService],
    },
  ],
})
export class AtlpHijriMatDatepickerComponent
  implements ControlValueAccessor, OnChanges
{
  private innerValue: any;
  private changed = [];
  private touched = [];
  disabled: boolean = false;
  maxHijri: Date = moment().add(50, 'years').toDate();
  minHijri: Date = moment().add(-60, 'years').toDate();
  @Input() id: string;
  @Input() name: string;
  @Input() placeholder: string = '';
  @Input() max: Date = null;
  @Input() min: Date = null;
  @Input() required: boolean = false;
  @Output() dateChange = new EventEmitter();
  @Input() isReadOnly: boolean = false;

  constructor(
    private hijriDateAdapter: NgxAngularMaterialHijriAdapterService,
    public atlpTranslationService: AtlpTranslationService,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
    //  this.hijriDateAdapter?.setLocale(DateLocaleKeys.AR_SA);

    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.hijriDateAdapter?.setLocale(
        lang === 'ae' || lang == DateLocaleKeys.AR
          ? DateLocaleKeys.AR_SA
          : DateLocaleKeys.EN_US
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.max) {
      if (moment(this.max).isSameOrAfter(moment().add(50, 'years'))) {
        this.maxHijri = moment().add(50, 'years').toDate();
      } else {
        this.maxHijri = this.max;
      }
    }
    if (changes.min) {
      if (moment(this.min).isSameOrBefore(moment().add(-60, 'years'))) {
        this.minHijri = moment().add(-60, 'years').toDate();
      } else {
        this.minHijri = this.min;
      }
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach((f) => f(value));
      setTimeout(() => {
        this.dateChange.emit();
      }, 100);
    }
  }

  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.innerValue = obj;
  }

  private get icons(): Array<string> {
    return ['data-icon-white'];
  }
}
