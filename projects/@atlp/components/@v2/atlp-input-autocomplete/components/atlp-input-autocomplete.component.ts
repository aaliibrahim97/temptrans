import {
  AfterViewInit,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  TemplateRef,
  forwardRef,
  ChangeDetectorRef,
  Renderer2,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { IAtlpAutocompleteService } from '../services/atlp-auto-complete.interface';
import { IAtlpLookupConstant } from '../../atlp-lookup/models/atlp-lookup-constants.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  ArrowDown,
  F9,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from '../../../../utils/atlp-key-code-map';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { TranslateService } from '@ngx-translate/core';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { AtlpSidebarV2Service } from '../../atlp-sidebar/atlp-sidebar.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'atlp-mat-autocomplete',
  templateUrl: './atlp-input-autocomplete.component.html',
  styleUrls: ['./atlp-input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AtlpAutocompleteComponent),
      multi: true,
    },
  ],
})
export class AtlpAutocompleteComponent
  implements
    AfterViewInit,
    OnInit,
    OnChanges,
    ControlValueAccessor,
    Validator,
    OnDestroy
{
  /**
   *  How to use this component:
   *
   *  <atlp-mat-autocomplete
   *    placeholder="Search"
   *    [floatLabel]="auto"                          // changes label floating behavior, can be 'always' | 'never' | 'auto'
   *    [minChars] = "2"                             // start fetch items after min chars amount, default is 2
   *    [source]="AutocompleteService | any[]"       // source can be service or array, when array is passed filter is done local
   *    [serviceParams]= "HttpParams"                // sets HttpParams for service fetch function
   *    [doPrefetch]= "false"                        // when active, service do fetch items on init
   *    [clearAfterSearch] = "false"                 // clears input after item select
   *    [hasProgressBar] = "false"                   // adds loading while making request
   *    [hasSearchButton] = "false"                  // adds search button near input
   *    [validationErrors]="errors"                  // string[] every sting in array displays as mat-error
   *
   *    displayItem = "item.name"                    // text will be evaluated and executed, better use displayItemFn for function
   *    [displayTemplate] = "TemplateRef"            // template reference for autocomplete options, displayItem or displayTemplate
   *
   *    [showAddNew] = "false"                       // shows create button when no suggestions
   *    [addNewText] = "'Add new'"                   // text to display near create button
   *    (createNew) = "onCreateNew($event)"          // rises an event when click on create button
   *
   *    [transformResult] = "function"               // callback function to format data from server response
   *    [isFocused]="true"                           // sets focus that triggers fetch
   *
   *    (optionSelected)="onSelectCallback(item)"    // get selected item from event
   *
   *    [formControl]="form.controls['controlName']" // access it as any form control
   *    [(ngModel)]="model.item"                     // or just use model binding
   *    (ngModelChange)="itemSelected($event)"
   *
   *  ></atlp-mat-autocomplete>
   */

  subscriptions: Subscription[] = [];
  private _unsubscribeAll$ = new Subject<never>();
  @Input() set source(value: IAtlpAutocompleteService | any[]) {
    if (this.isAutocompleteService(value)) {
      this.service = value as IAtlpAutocompleteService;
    } else if (value instanceof Array) {
      this.storedItems = value.slice(0);
      this.saveReturnType(this.storedItems);
    }
  }

  @Input() name = '';
  @Input() placeholder: string = 'Search';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() formControl?: FormControl;
  @Input() doPrefetch = false;
  @Input() displayItem? = 'item.name';
  @Input() hasSearchButton = false;
  @Input() hasProgressBar = false;
  @Input() minChars: number = 2;
  @Input() clearAfterSearch = false;
  @Input() showAddNew = false;
  @Input() addNewText = 'Add new';
  @Input() isFocused = false;
  @Input() validationErrors: string[] = [];
  @Input() serviceParams?: HttpParams;
  @Input() displayItemFn?: (item: any) => string;
  @Input() onClearData?: (item: any) => string;
  @Input() displayTemplate?: TemplateRef<any>;
  @Input() transformResult: any = (x: any[]) => x;
  @Input() tabindex: number = 0;
  @Input() position: string = 'below';
  @Input() isDisabled: boolean = false;
  @Input() displayItemCode? = 'item.Code';
  @Input() displayItemNameInEnglish? = 'item.NameEnglish';
  @Input() displayItemNameInArabic? = 'item.NameArabic';
  @Input() multiplesearch;
  @Input() multiplesearch2;
  // @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter<Object>();
  @Output() createNew = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() autoCompleteOnBlur = new EventEmitter();
  @Input() lookUpObject: IAtlpLookupConstant;
  @Input() isRequiredValidation: boolean = false;
  @Input() isInvalidObjectValidation: boolean = false;
  @Input() maxLength: number = null;
  controlPristine: boolean = true;
  @Input() isCustomValidatorFn?: (
    selectedItem: any
  ) => { [key: string]: any } | null;
  private _onValidatorChange: () => void;
  @Input() selectedLang: string;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @ViewChild('autocomplete') autocomplete: MatAutocomplete;
  @ViewChild('itemTemplate') itemTemplate: TemplateRef<any>;

  public selectedOption: any = null;
  public query = '';
  public autocompleteList: any[] | null;
  public request = false;
  public noSuggestions: boolean;
  public requestsInQueue = 0;
  private storedItems?: any[];
  public service?: IAtlpAutocompleteService;
  private returnType: string;
  onChange: any = () => {};
  onTouched: any = () => {};
  disabled = false;
  public keyToCloseSlider: SidebarName;
  patchCodeVal: any;
  @Input() overlayPanelAlwaysTop: boolean = false;
  valuechangeAttemptes: number = 0;
  optionSelectionMouseClick: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _atplSidebarService: AtlpSidebarV2Service,
    private ngxService: NgxUiLoaderService,
    private _iconsService: IconsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.placeholder = this.translateService.instant(this.placeholder);
    this._iconsService.registerIcons(this.icons);
    if (this.hasSearchButton) {
      if (this.lookUpObject?.sliderId) {
        this.keyToCloseSlider = this.lookUpObject.sliderId as SidebarName;
      } else {
        console.log(
          'Lookup slider id not provided for autocomplete =>',
          JSON.stringify(this.lookUpObject)
        );
      }
    }

    if (this.doPrefetch) {
      this.prefetch();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._onValidatorChange) {
      this._onValidatorChange();
    }
  }

  ngAfterViewInit() {
    if (!this.displayTemplate) {
      this.displayTemplate = this.itemTemplate;
    }
    if (this.isFocused) {
      setTimeout(() => {
        this.autocompleteInput.nativeElement.focus();
      });
    }
    setTimeout(() => {
      this._renderer.setAttribute(
        this.autocompleteInput.nativeElement,
        'placeholder',
        this.placeholder
      );
      this._renderer.removeClass(
        this.autocompleteInput.nativeElement,
        'mat-input-element'
      );
      this.setOvelayPanelOnTop();
    });
  }

  setOvelayPanelOnTop() {
    if (this.overlayPanelAlwaysTop) {
      this.autocomplete.opened
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe((isOpend) => {
          this.dispatchOvelayPanelOnTop();
        });

      this.autocomplete.closed
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe((isOpend) => {
          document.getElementById('#cdk-overlay-pane-style')?.remove();
        });
    }
  }

  private dispatchOvelayPanelOnTop() {
    setTimeout(() => {
      const heightOfOpenedPanel: number = document
        .querySelector('.mat-autocomplete-panel')
        .getClientRects()[0].height;
      const currentTop: number = parseInt(
        (<HTMLElement>(
          document.querySelector('.cdk-overlay-pane')
        )).style.top.split('.')[0]
      );
      const newTopNumber = currentTop - heightOfOpenedPanel - 35;
      document.getElementById('#cdk-overlay-pane-style')?.remove();
      this.createClass(
        `.cdk-overlay-pane { top: ${newTopNumber}px !important; }`
      );
    }, 0);
  }

  createClass(rules) {
    let style: any = document.createElement('style');
    style.type = 'text/css';
    style.id = 'cdk-overlay-pane-style';
    style.innerHTML = rules;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  public prefetch() {
    if (!this.service) {
      throw new Error("Service for prefetch is not defined in 'Source'");
    }

    this.storedItems = [];
    this.noSuggestions = false;

    let params = new HttpParams();
    if (this.serviceParams) {
      params = this.serviceParams;
    }

    this.service.fetch(params).then((result: any) => {
      this.storedItems = this.transformResult(result);
      this.noSuggestions = result.length === 0;
      this.saveReturnType(this.storedItems);
    });
  }

  public search(event) {
    if (!this.hasSearchButton) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.doSearchViaService) {
      this.fetch(true);
    } else {
      this.filterStoredItems(true);
    }
    this.toggleSidebarOpen(this.lookUpObject.sliderId);
  }

  public fetch(force?: boolean, callBack?: (selectedItem: any) => void) {
    if (!this.service) {
      throw new Error(
        "Service for fetch is not defined in 'Source' for => " +
          JSON.stringify(this.lookUpObject)
      );
    }

    this.query = this.autocompleteInput.nativeElement.value;

    // empty query is not allowed for autocomplete
    if (this.isQueryEmpty(this.query) && this.minChars !== 0) {
      this.autocompleteList = [];
      this.noSuggestions = false;
      return;
    }

    if (force || this.query.length >= this.minChars) {
      let params = new HttpParams();
      params = params.set('query', this.query);
      if (this.serviceParams) {
        params = this.serviceParams.set('query', this.query);
        if (this.serviceParams.has('searchString')) {
          params = this.serviceParams.set('searchString', this.query);
        }
      }

      this.requestsInQueue = this.requestsInQueue + 1;
      this.ref.markForCheck();

      this.service.fetch(params).then((result: any) => {
        this.requestsInQueue = this.requestsInQueue - 1;
        this.autocompleteList = this.transformResult(result);
        this.noSuggestions = this.autocompleteList.length === 0;
        this.saveReturnType(this.autocompleteList);
        if (callBack) {
          if (this.autocompleteList.length > 0) {
            let selectedRow = this.autocompleteList.filter(
              (item) =>
                this.viewItemCode(item)?.toString()?.toLowerCase() ==
                this.query?.toString()?.toLowerCase()
            );
            let selected = null;
            if (selectedRow.length > 0) {
              selected = { ...selectedRow[0] };
            }
            if (selected) {
              callBack(selected);
            } else {
              this.clearValue();
            }
          } else {
            this.clearValue();
          }
        }
        this.ref.markForCheck();
      });
    }
  }

  public filterStoredItems(force?: boolean) {
    if (!this.displayItem && !this.displayItemFn) {
      throw new Error(
        'You must provide displayItem or displayItemFn for local search.'
      );
    }

    this.query = this.autocompleteInput.nativeElement.value;
    // empty query is not allowed for autocomplete
    if (this.isQueryEmpty(this.query) && this.minChars !== 0) {
      this.autocompleteList = [];
      return;
    }

    if (force || this.query.length >= this.minChars) {
      this.noSuggestions = false;

      if (!this.storedItems) {
        return;
      }

      this.autocompleteList = this.storedItems.filter((item) => {
        if (!this.viewItem(item)) {
          throw new Error(
            'String to evaluate in displayItem was provided wrong. Better use displayItemFn'
          );
        }
        let formatedItem = this.viewItem(item)?.toString()?.toLowerCase();
        if (this.displayItemFn) {
          formatedItem = this.displayItemFn(item)?.toString()?.toLowerCase();
        }
        return (
          formatedItem.indexOf(this.query.toString()?.toLowerCase()?.trim()) >
          -1
        );
      });
      this.noSuggestions = this.autocompleteList.length === 0;
    }
  }

  public autocompleteSelected($event: any) {
    window['event']?.stopPropagation();
    this.query = this.autocompleteInput.nativeElement.value;
    const selected = $event.option.value;
    this.writeValue(selected);

    if (selected) {
      this.optionSelected.emit(selected);
    }

    if (this.clearAfterSearch) {
      this.clearValue();
    }
  }

  public autocompleteDisplayFn() {
    if (this.displayItemFn) {
      return this.displayItemFn;
    }

    return (item: any) => {
      return item ? this.viewItem(item) : item;
    };
  }

  public onKey($keyboardEvent: KeyboardEvent) {
    this.controlPristine = false;
    if (
      $keyboardEvent.code === ArrowLeft ||
      $keyboardEvent.code === ArrowRight ||
      $keyboardEvent.code === ArrowDown ||
      $keyboardEvent.code === ArrowUp
    ) {
      return;
    }

    if (this.overlayPanelAlwaysTop) {
      this.dispatchOvelayPanelOnTop();
    }
    // prevent filtering results if arrow were pressed
    if ($keyboardEvent.code === F9 && this.hasSearchButton) {
      this.toggleSidebarOpen(this.lookUpObject.sliderId);
      return;
    }
    if (!this.autocompleteInput.nativeElement.value) {
      this.clearValue();
    }
    this.onKeyCallback();
  }

  public onKeyCallback() {
    if (this.doSearchViaService) {
      this.fetch();
    } else {
      this.filterStoredItems();
    }
  }

  public onPaste($clipboardEvent: ClipboardEvent) {
    $clipboardEvent.preventDefault();
    $clipboardEvent.stopImmediatePropagation();
    const clipboardData = $clipboardEvent.clipboardData.getData('text/plain');
    this.query = this.autocompleteInput.nativeElement.value = clipboardData;
    this.setLookupValuesByCode(clipboardData);
  }

  public onBlur($mouseEvent: MouseEvent) {
    this.controlPristine = false;
    this.onTouched();
    this.autoCompleteOnBlur.emit(this.autocompleteInput.nativeElement.value);
    this.query = this.autocompleteInput.nativeElement.value;
    if (
      this.selectedOption &&
      this.returnType === typeof this.selectedOption &&
      this.viewItem(this.selectedOption) !== this.query
    ) {
      this.autocompleteInput.nativeElement.value = this.viewItem(
        this.selectedOption
      );
      return;
    }
    // if (this.selectedOption == null && this.query) {
    //   this.clearValue();
    //   return;
    // }
    // else {
    //   this.query = "";
    //   this.autocompleteInput.nativeElement.value = "";
    // }
  }

  public onFocus($event: any) {
    this.controlPristine = false;
    if (this.selectedOption) {
      this.noSuggestions = false;
      return;
    }

    if (this.isServerSidepagination()) {
      this.fetch();
    } else {
      this.filterStoredItems();
    }
  }

  public viewItem(item: any) {
    if (this.displayItemFn) {
      return this.displayItemFn(item);
    }
    return this.defaultDisplayItemFn(item);
    // using eval() can be dangerous, better use displayItemFn function
    //return this.displayItem ? eval(this.displayItem) : item.name;
  }

  public clearValue(isNeedToRefocus: boolean = false) {
    if (this.formControl) {
      this.formControl.reset();
    }
    this.selectedOption = null;
    this.autocompleteList = [];
    this.query = '';
    if (this.autocompleteInput?.nativeElement) {
      this.autocompleteInput.nativeElement.value = '';
      this.onChange(this.selectedOption);
      this.onClear.emit(this.selectedOption);
    }
    if (isNeedToRefocus) {
      setTimeout(() => {
        this.autocompleteInput.nativeElement.blur();
        setTimeout(() => {
          this.autocompleteInput.nativeElement.focus();
        }, 500);
      }, 1000);
    }
  }

  get doSearchViaService() {
    // check if search result returns from service or from local data
    // if prefetch is active only one request will be made on init
    return this.service && !this.doPrefetch;
  }

  public onCreateNew() {
    if (this.selectedOption) {
      const value =
        this.returnType === typeof this.selectedOption
          ? this.viewItem(this.selectedOption)
          : this.selectedOption;
      this.autocompleteInput.nativeElement.value = value;
    }

    this.createNew.emit(this.selectedOption);
  }

  private isQueryEmpty(query: string): boolean {
    return query.length <= 0;
  }

  private isAutocompleteService(
    object: any
  ): object is IAtlpAutocompleteService {
    return object && 'fetch' in object;
  }

  private saveReturnType(items: any[] | undefined | null) {
    if (items && items.length > 0) {
      this.returnType = typeof items[0];
    }
  }

  writeValue(val: any): void {
    this.valuechangeAttemptes++;
    if (this.valuechangeAttemptes > 300) {
      console.log('Error looup object: => ', this.lookUpObject);
      throw new Error(
        `Too many value changes. \n
         Please don't try to set value for this control from your component after user select it manuvally. \n
         Please find above log to find, which lookup object causes this issue`
      );
    }
    if (!val) {
      this.selectedOption = null;
      this.query = '';
      if (this.autocompleteInput?.nativeElement) {
        this.autocompleteInput.nativeElement.value = '';
      }
      return;
    }

    if (this.autocompleteInput) {
      if (AtlpCheckHelper.isObject(val)) {
        this.selectedOption = val;
        this.autocompleteInput.nativeElement.value = this.viewItem(
          this.selectedOption
        );
      } else {
        this.autocompleteInput.nativeElement.value = val;
        this.setLookupValuesByCode(val, true);
      }
    }

    this.onChange(val);
  }

  setValueToControlOnEditMode(selectedItem) {
    this.selectedOption = selectedItem;
    this.query = this.viewItemCode(selectedItem);
    this.autocompleteInput.nativeElement.value = this.viewItem(selectedItem);
    this.onChange(this.selectedOption);
    selectedItem.isEditMode = true;
    this.optionSelected.emit(selectedItem);
    this.noSuggestions = false;
  }

  private setLookupValuesByCode(val, isCallBackEnabled: boolean = false): void {
    if (this.isServerSidepagination()) {
      if (isCallBackEnabled) {
        this.fetch(false, this.setValueToControlOnEditMode.bind(this));
      } else {
        this.fetch();
      }
    } else {
      if (this.storedItems?.length === 0) {
        this.patchCodeVal = val;
      } else {
        this.patchCodeVal = '';
        this.PatchDataByCode(val);
      }
    }
  }

  private PatchDataByCode(val) {
    const selectedItemArray = this.storedItems.filter((item) => {
      return (
        this.viewItemCode(item)?.toString()?.toLowerCase() ==
        val?.toString()?.toLowerCase()
      );
    });
    if (selectedItemArray && selectedItemArray[0]) {
      this.selectedOption = selectedItemArray[0];
      this.query = this.viewItemCode(selectedItemArray[0]);
      this.autocompleteInput.nativeElement.value = this.viewItem(
        selectedItemArray[0]
      );
      this.onChange(this.selectedOption);
      this.optionSelected.emit(this.selectedOption);
      this.noSuggestions = false;
    } else {
      this.clearValue();
    }
    setTimeout(() => {
      this.onTouched();
      this.ref.markForCheck();
    }, 1000);
  }

  defaultDisplayItemFn(item: any) {
    let nameInEnglish = this.viewItemNameInEnglish(item);
    let nameInArabic = this.viewItemNameInArabic(item);
    let code = this.viewItemCode(item);
    let displayVal = code + ' - ';
    if (this.selectedLang == 'en') {
      displayVal += `${nameInEnglish} - ${nameInArabic} `;
    } else {
      displayVal += `${nameInArabic} - ${nameInEnglish} `;
    }
    return displayVal;
  }

  viewItemCode(item: any) {
    return this.displayItemCode ? eval(this.displayItemCode) : item.Code;
  }

  viewItemNameInEnglish(item: any) {
    return this.displayItemNameInEnglish
      ? eval(this.displayItemNameInEnglish)
      : item.NameEnglish;
  }

  viewItemNameInArabic(item: any) {
    return this.displayItemNameInArabic
      ? eval(this.displayItemNameInArabic)
      : item.NameArabic;
  }

  isServerSidepagination() {
    return this.service;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  lookUpValueFromSlider(selectedItem) {
    this.query = selectedItem.Code;
    const selected = selectedItem;
    this.writeValue(selected);

    if (selected) {
      this.optionSelected.emit(selected);
    }

    if (this.clearAfterSearch) {
      this.clearValue();
    }
    this.toggleSidebarOpen(this.keyToCloseSlider);
  }

  lookUpClose(isClose) {
    if (isClose) {
      this.optionSelected.emit(isClose);
    }
  }

  setStoredItemsFromLookUp(data) {
    if (data?.Data) {
      this.storedItems = data.Data.slice(0);
      if (this.patchCodeVal) {
        this.writeValue(this.patchCodeVal);
      }
    }
  }

  toggleSidebarOpen(key): void {
    setTimeout(() => {
      this._atplSidebarService.getSidebar(key).toggleOpen();
      this.ngxService.stop();
    }, 100);
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!this.controlPristine) {
      if (control.value && typeof control.value === 'object') {
        const keyVal = this.viewItemCode(control.value);
        if (this.isCustomValidatorFn) {
          return this.isCustomValidatorFn(control.value);
        }
        if (!keyVal) {
          return this.isRequiredValidation
            ? { autoCompleteIsRequired: true }
            : null;
        }
      } else {
        if (!control.value) {
          return this.isRequiredValidation
            ? { autoCompleteIsRequired: true }
            : null;
        } else if (control.value) {
          return this.isInvalidObjectValidation
            ? { autoCompleteInvalidObject: true }
            : null;
        }
      }
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  get icons(): Array<string> {
    return ['warning-circle-fill', 'icon-search'];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
