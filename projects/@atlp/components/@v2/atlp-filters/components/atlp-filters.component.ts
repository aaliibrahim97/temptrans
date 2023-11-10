import { catchError, map } from 'rxjs/operators';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AtlpFiltersService } from '../services/atlp-filters-example.service';
import { AtlpFilterCommunicationService } from '../services/atlp-filter-communication.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import {
  ISnakBarModelData,
  SnakBarHorizontalPosition,
  SnakBarModelDefaultErrorData,
  SnakBarModelDefaultSuccessData,
  SnakBarVerticalPosition,
} from 'projects/@atlp/components/snak-bars/models/snak-bar.models';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ar';
import { ATLP_FILTER_TOKEN } from '../token/atlp_filter.token';
import { AtlpFilterRef } from '../token/atlp-filter-ref.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { AtlpSavedFilter } from '../interfaces/atlp-saved-filter';
import { IAtlpFilterService } from '../services/atlp-filter.interface';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { IAtlpFilterServices } from '../interfaces/atlp-filter-services.interface';

@UntilDestroy({ checkProperties: true, arrayName: 'subscriptions' })
@Component({
  selector: 'atlp-filters-v2',
  templateUrl: './atlp-filters.component.html',
  styleUrls: ['./atlp-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtlpFiltersComponent implements OnInit, AfterContentInit {
  SidebarName = SidebarName;
  @Input() openbyDefault: boolean = false;
  @Input() showSavedFilter: boolean = true;
  @Input() showLoadSavedButton: boolean = true;
  sessionFilters = [];
  previousfilter: string = '';
  showLoadedFilters: boolean = false;
  @Input() title: string;
  @Input() filtersFields: any[] = [];
  @Input() sectiontitle: string;
  @Input() filterServices: IAtlpFilterServices;
  savedFilters$: Observable<any>;
  @Input() key: string;
  @Input() dataType: 'serviceUrl' | 'service' | 'object';
  @Input() savedFiltersData: AtlpSavedFilter[];
  @Input() service?: IAtlpFilterService;
  filterInput = '';
  submitted: boolean = false;
  selectedLanguage: string;
  totalControls: number;
  appliedFilters: number = 0;
  @Input() set source(value: IAtlpFilterService | any[]) {
    if (this.isFilterService(value)) {
      this.service = value as IAtlpFilterService;
    }
  }
  @Input() formatApiResponseFn?: (response: any) => any;
  @ContentChild(ATLP_FILTER_TOKEN as any, { static: true })
  AtlpFilterRef: AtlpFilterRef;
  formGroup: FormGroup;
  @Input() isTwoColumnLayout: boolean = false;

  constructor(
    private atlpFiltersService: AtlpFiltersService,
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private communicationService: AtlpFilterCommunicationService,
    private ngxService: NgxUiLoaderService,
    private defaultSnakBar: SnakBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private atlpTranslationService: AtlpTranslationService,
    private translateService: TranslateService,
    private datepipe: DatePipe
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  private isFilterService(object: any): object is IAtlpFilterService {
    return object && 'getFiltersList' in object;
  }

  ngOnInit(): void {
    this.key = this.service.getUniqueFilterId();
    this.updateSessionFilters();
    if (this.openbyDefault) {
      this.toggleSidebarOpen(SidebarName.filtersSidebar);
    }
    this.loadFilters();
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });
  }

  ngAfterContentInit() {
    this.formGroup = this.AtlpFilterRef.getFormGroup();
    const formValue = this.formGroup.value;
    const mapped = Object.values(formValue).map((value) => !!value);
    const hasValues = mapped.some((value) => value);
    if (hasValues) {
      this.appliedFilters++;
    }
    this.formGroup.valueChanges.subscribe((ctrls) => {
      this.appliedFilters = 0;
      this.totalControls = Object.keys(ctrls).length;
      Object.keys(ctrls).forEach((ctrlItemKey) => {
        if (ctrls[ctrlItemKey]) {
          if (
            AtlpCheckHelper.isObject(ctrls[ctrlItemKey]) &&
            ctrls[ctrlItemKey].Code === ''
          ) {
            return;
          }
          this.appliedFilters++;
        }
      });
    });
  }

  @HostListener('document:keyup.esc')
  onkeyup() {
    if (
      this._atplSidebarService.getSidebar(SidebarName.filtersSidebar).opened
    ) {
      this.toggleSidebarOpen(SidebarName.filtersSidebar);
    }
  }

  // @HostListener('document:keydown.enter', ['$event'])
  // onEnter($event) {
  //   this.searchAndSaveFilterToBrowserSession();
  // }

  @HostListener('document:keypress', ['$event'])
  startSearch(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      //Code that you need to run
      if (
        this._atplSidebarService.getSidebar(SidebarName.filtersSidebar).opened
      ) {
        this.searchAndSaveFilterToBrowserSession();
      }
    }
  }

  updateSessionFilters() {
    this.sessionFilters =
      this.key && sessionStorage.getItem(this.key)
        ? JSON.parse(sessionStorage.getItem(this.key))
        : [];
  }

  async saveFilter(filterName) {
    this.submitted = true;
    if (!filterName) {
      return;
    }
    const filterAlreadyExsist = await this.savedFilters$
      .pipe(
        map((savedFilterItem) =>
          savedFilterItem.filter(
            (filterItem) =>
              filterItem.name.toLowerCase() === filterName.toLowerCase()
          )
        )
      )
      .toPromise();

    if (filterAlreadyExsist && filterAlreadyExsist.length > 0) {
      const snackBarData: ISnakBarModelData = {
        ...SnakBarModelDefaultErrorData,
        message: this.translateService.instant('FILTER_NAME_ALREADY_EXSIST'),
        duration: 2000,
        snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
        snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
      };
      this.defaultSnakBar.errorWithOptions(snackBarData);
      this.filterInput = '';
      return;
    }

    switch (this.dataType) {
      case 'serviceUrl':
        this.atlpFiltersService
          .saveFilter(
            this.filterServices.saveFilterURL,
            filterName,
            this.communicationService.filter
          )
          .pipe(
            catchError((e) => {
              return [];
            })
          )
          .subscribe((response) => {
            const snackBarData: ISnakBarModelData = {
              ...SnakBarModelDefaultSuccessData,
              duration: 2000,
              message: this.translateService.instant(
                'FILTER_SAVED_SUCCESSFULLY'
              ),
              snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
              snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
            };
            this.defaultSnakBar.errorWithOptions(snackBarData);
            this.loadFilters();
          });
        break;
      case 'service':
        const filterData = this.AtlpFilterRef.getFilterDataFn();
        if (filterData && filterData.length > 0) {
          this.ngxService.start();
          const response = await this.service.saveFilter(
            filterName,
            filterData
          );
          this.savedFilters$ = of(response);
          this.submitted = false;
          this.ngxService.stop();
          this.loadFilters();
          this._changeDetectorRef.markForCheck();
        } else {
          const snackBarData: ISnakBarModelData = {
            ...SnakBarModelDefaultErrorData,
            duration: 2000,
            message: this.translateService.instant('PLS_ENTER_REQ_SAVE'),
            snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
            snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
          };
          this.defaultSnakBar.errorWithOptions(snackBarData);
          return;
        }
        break;
      default:
        break;
    }
    this.filterInput = '';
    //this.resetFilters();
  }

  selectFilter(item) {
    // this.onSelectFilter.emit(item);
    this.AtlpFilterRef.onSelectFilter(item);
  }

  onRecentFilterDelete($event, id) {
    $event.preventDefault();
    $event.stopPropagation();
    const removeIndex = this.sessionFilters
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);
    // remove object
    this.sessionFilters.splice(removeIndex, 1);
    //remove from browser session
    sessionStorage.setItem(this.key, JSON.stringify(this.sessionFilters));
  }

  async onSavedFilterDelete($event, id) {
    $event.preventDefault();
    $event.stopPropagation();
    switch (this.dataType) {
      case 'serviceUrl':
        this.atlpFiltersService
          .deleteSelectedFilter(this.filterServices.onDeleteURL, id)
          .subscribe((response: any) => {
            const result = response.status;
            this.loadFilters();
          });
        break;
      case 'service':
        this.ngxService.start();
        const response = await this.service.deleteFilter(id);
        this.savedFilters$ = of(response);
        this.ngxService.stop();
        this.loadFilters();
        this._changeDetectorRef.markForCheck();
        break;
      case 'object':
        this.savedFilters$ = of(this.savedFiltersData);
        break;
      default:
        this.savedFilters$ = of([]);
        break;
    }
  }

  handleFiltersSelect(filter) {
    // this.onSelectFilter.emit(filter);
    this.AtlpFilterRef.onSelectFilter(filter);
  }

  loadFilters() {
    switch (this.dataType) {
      case 'serviceUrl':
        this.savedFilters$ = this.atlpFiltersService
          .getFiltersList(this.filterServices.savedFiltersListURL, {})
          .pipe(catchError((error) => []));
        break;
      case 'service':
        const formatApiResponseFn = this.formatApiResponseFn
          ? this.formatApiResponseFn
          : this.AtlpFilterRef.formatApiResponseFn;
        this.savedFilters$ = this.service
          .getFiltersList(formatApiResponseFn)
          .pipe(catchError((error) => []));
        break;
      case 'object':
        this.savedFilters$ = of(this.savedFiltersData);
        break;
      default:
        this.savedFilters$ = of([]);
        break;
    }
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  sessionSave(filters) {
    if (filters && Array.isArray(filters) && filters.length < 1) {
      return;
    }
    const sessionFilterToAdd = filters
      ? {
          name: new Date().toString(), //this.datepipe.transform(new Date(), "dd/MM/YYYY hh:mm a"), //moment(new Date()).format("ddd DD-MMM-YYYY, hh:mm A"),
          filters: filters,
        }
      : {
          name: new Date().toString(), //this.datepipe.transform(new Date(), "dd/MM/YYYY hh:mm a"), //moment(new Date()).format("ddd DD-MMM-YYYY, hh:mm A"),
          filters: [],
        };

    if (this.sessionFilters.length >= 5) {
      //this.sessionFilters.shift();
      this.sessionFilters.splice(this.sessionFilters.length - 1, 1);
    }
    this.sessionFilters.unshift(sessionFilterToAdd);
    // this.sessionFilters.push(sessionFilterToAdd);
    sessionStorage.setItem(this.key, JSON.stringify(this.sessionFilters));
    this.updateSessionFilters();
  }

  isDate(date: string) {
    //&& !isNaN(new Date(date).toString());
    return new Date(date).toString() !== 'Invalid Date';
  }

  getFormattedDate(dataString) {
    if (dataString && this.isDate(dataString)) {
      return this.datepipe.transform(dataString, 'dd/MM/YYYY hh:mm a');
    } else {
      return dataString;
    }
  }

  getSession() {
    sessionStorage.getItem(this.key);
  }

  displayValue(item) {
    if (this.AtlpFilterRef.getDisplayValue && item?.originalVal) {
      return this.AtlpFilterRef.getDisplayValue(item.originalVal, item);
    } else {
      if (AtlpCheckHelper.isObject(item?.originalVal)) {
        if (this.selectedLanguage === 'en') {
          if (AtlpCheckHelper.hasKey(item.originalVal, 'NameEnglish')) {
            return item.originalVal.NameEnglish;
          }
        } else {
          if (AtlpCheckHelper.hasKey(item.originalVal, 'NameArabic')) {
            return item.originalVal.NameArabic;
          }
        }
        if (AtlpCheckHelper.hasKey(item.originalVal, 'Code')) {
          return item.originalVal.Code;
        }
      }
    }
    return item.originalVal;
  }

  searchAndSaveFilterToBrowserSession(): void {
    const filterData = this.AtlpFilterRef.getFilterDataFn();

    if (filterData && filterData.length > 0) {
      const isSearchAlredyExsist = this.sessionFilters.filter(
        (sessionFilterItem) => {
          let isExsist = this.objectsAreSame(
            sessionFilterItem.filters,
            filterData
          );
          if (isExsist) {
            sessionStorage.removeItem(sessionFilterItem.name);
            let filterName = new Date().toString();
            sessionStorage.setItem(filterName, sessionFilterItem);
            sessionFilterItem.name = filterName;
          }
          return isExsist;
        }
      );

      if (isSearchAlredyExsist && isSearchAlredyExsist.length === 0) {
        this.sessionSave(filterData);
      }

      this.AtlpFilterRef.onSearch();
    } else {
      const snackBarData: ISnakBarModelData = {
        ...SnakBarModelDefaultErrorData,
        message: this.translateService.instant('PLS_ENTER_VALID_FILTER_DATA'),
        duration: 2000,
        snakBarHorizontalPosition: SnakBarHorizontalPosition.right,
        snakBarVerticalPosition: SnakBarVerticalPosition.bottom,
      };
      this.defaultSnakBar.warningWithOptions(snackBarData);
      // this.AtlpFilterRef.onSearch();
      return;
    }
  }

  objectsAreSame(arrOne, arrTwo): boolean {
    if (arrOne.length != arrTwo.length) {
      return false;
    }
    let objectsAreSame = false;
    let allSearchCriteriaCount = 0;
    for (let k = 0; k <= arrOne.length; k++) {
      let x = arrOne[k];
      let y = arrTwo[k];
      let matchCount = 0;
      for (let propertyName in x) {
        if (x[propertyName] === y[propertyName]) {
          matchCount++;
        }
      }
      if (matchCount === 5) {
        allSearchCriteriaCount++;
      }
    }
    if (allSearchCriteriaCount === arrOne.length) {
      objectsAreSame = true;
    }
    return objectsAreSame;
  }

  resetFilters(): void {
    this.communicationService.filter = null;
    // this.onResetFilter.emit();
    this.AtlpFilterRef.onResetFilter();
  }

  openLoadedFilters = (): void => {
    this.showLoadedFilters = !this.showLoadedFilters;
  };

  get icons(): Array<string> {
    return [
      'plus-dark',
      'x-fill-purple',
      'delete-grey',
      'data-icon-white',
      'search-icon',
      'icon-load-filter',
      'icon-save-filter',
    ];
  }

  onDestroy() {}
}
