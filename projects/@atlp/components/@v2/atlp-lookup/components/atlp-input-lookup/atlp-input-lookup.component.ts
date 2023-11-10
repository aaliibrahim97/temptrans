import {
  AfterViewInit,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  forwardRef,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import {
  defaultLookUpData,
  IAtlpLookupConstant,
} from '../../models/atlp-lookup-constants.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as _ from 'lodash';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IAtlpInputLookUpService } from '../../models/atlp-input-lookup.interface';
import { Backspace, F9 } from 'projects/@atlp/utils/atlp-key-code-map';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { AtlpSidebarV2Service } from '../../../atlp-sidebar/atlp-sidebar.service';

@UntilDestroy({ checkProperties: true, arrayName: 'subscriptions' })
@Component({
  selector: 'atlp-input-lookup',
  templateUrl: './atlp-input-lookup.component.html',
  styleUrls: ['./atlp-input-lookup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpInputLookUpComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AtlpInputLookUpComponent),
      multi: true,
    },
  ],
})
export class AtlpInputLookUpComponent
  implements AfterViewInit, OnInit, ControlValueAccessor, OnChanges, Validator
{
  /**
   *  How to use this component:
   *
   *  <atlp-input-lookup
   *    placeholder="Search"
   *    [floatLabel]="auto"                          // changes label floating behavior, can be 'always' | 'never' | 'auto'
   *    [clearAfterSearch] = "false"                 // clears input after item select
   *    [hasSearchButton] = "false"                  // adds search button near input
   *    [validationErrors]="errors"                  // string[] every sting in array displays as mat-error
   *
   *    displayItemCode = "item.Code"                // text will be evaluated and executed, better use displayItemFn for function
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
   *  ></atlp-input-lookup>
   */

  @Input() set source(value: IAtlpInputLookUpService | any[]) {
    if (this.isAutocompleteService(value)) {
      this.service = value as IAtlpInputLookUpService;
    } else if (value instanceof Array) {
      this.storedItems = value.slice(0);
      this.saveReturnType(this.storedItems);
    } else {
      this.storedItems = [];
    }
  }

  @Input() lookUpObject: IAtlpLookupConstant;
  @Input() name = '';
  @Input() placeholder = '';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() formControl?: FormControl;
  @Input() doPrefetch = false;
  @Input() displayItemCode? = 'item.Code';
  @Input() displayItemNameInEnglish? = 'item.NameEnglish';
  @Input() displayItemNameInArabic? = 'item.NameArabic';
  @Input() hasSearchButton = true;
  @Input() hasProgressBar = false;
  @Input() minChars: number = 1;
  @Input() clearAfterSearch = false;
  @Input() showAddNew = false;
  @Input() addNewText = 'Add new';
  @Input() isFocused = false;
  @Input() validationErrors: string[] = [];
  @Input() serviceParams?: HttpParams;
  @Input() displayItemFn?: (item: any) => string;
  @Input() mapCustomData?: (userInput: any, uniqueId: any) => void;
  @Input() transformResult: any = (x: any[]) => x;
  @Input() isDisabled: boolean = false;
  @Input() fxFlexValue: string;
  fxFlexDefaultValue: string = '22%';
  @Input() tabindex = 0;
  defaultFlexParentGap = '0%';
  @Input() flexParentGap: string;
  @Input() isDetailsDisabled: boolean = true;
  @Input() isFlexEnabled: boolean = false;
  @Input() marginRightBetweenControls: string;
  defaultMarginRightBetweenControls: string = '40px';
  @Input() marginLeftBetweenControls: string;
  defaultMarginLeftBetweenControls: string = '40px';
  @Input() isRequiredValidation: boolean = false;
  @Input() isInvalidObjectValidation: boolean = false;
  controlPristine: boolean = true;
  @Input() isCustomValidatorFn?: (
    selectedItem: any
  ) => { [key: string]: any } | null;
  private _onValidatorChange: () => void;

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter();
  @Output() createNew = new EventEmitter();

  @ViewChild('lookupInputCode', { static: false }) lookupInputCode: ElementRef;
  @ViewChild('lookupInputEnglish') lookupInputEnglish: ElementRef;
  @ViewChild('lookupInputArabic') lookupInputArabic: ElementRef;
  public keyToCloseSlider: SidebarName | string;
  isLookUpRendered: boolean = false;
  @Input() minlength: number = 1;
  @Input() maxlength: number = 10;
  @Input() customData?: any[] = [];
  @Input() skipValidation?: boolean = false;
  englishPlaceHolder: string = 'NameInEnglish';
  arabicPlaceHolder: string = 'NameInArabic';

  public selectedOption: any;
  public query = '';
  public userSearchList: any[] | null;
  public request = false;
  public noSuggestions: boolean = true;
  public requestsInQueue = 0;
  private storedItems?: any[] = [];
  public service?: IAtlpInputLookUpService;
  private returnType: string;
  onChange: any = () => {};
  onTouched: any = () => {};
  atlpSidebarName: SidebarName;
  disabled: boolean;
  arabicFieldVisible: boolean = true;
  englishFieldVisible: boolean = true;
  @Output() setSideBarProperties = new EventEmitter();
  patchCodeVal: any;
  selectedLanguage: string;
  valuechangeAttemptes: number = 0;
  @Input() inputTextType: string = 'text';
  public clearButtonMouseClick: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private _atplSidebarService: AtlpSidebarV2Service,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this._onValidatorChange) {
      this._onValidatorChange();
    }
    if (changes.isFlexEnabled) {
      this.fxFlexValue = this.fxFlexValue ? this.fxFlexValue : '30%';
      this.flexParentGap = this.flexParentGap ? this.flexParentGap : '5%';
    }
    if (this.lookUpObject) {
      this.keyToCloseSlider = this.lookUpObject?.sliderId;
      if (this.lookUpObject?.visibleInputFileds?.length > 0) {
        if (!this.lookUpObject?.visibleInputFileds[0]?.english) {
          this.englishFieldVisible = false;
        }
        if (!this.lookUpObject?.visibleInputFileds[0]?.arabic) {
          this.arabicFieldVisible = false;
        }
        if (!this.lookUpObject?.visibleInputFileds[0]?.englishPlaceHolder) {
          this.englishPlaceHolder =
            this.lookUpObject?.visibleInputFileds[0].englishPlaceHolder;
        }
        if (!this.lookUpObject?.visibleInputFileds[0]?.arabicPlaceHolder) {
          this.arabicPlaceHolder =
            this.lookUpObject?.visibleInputFileds[0].arabicPlaceHolder;
        }
      }
    } else {
      this.lookUpObject = defaultLookUpData;
    }
  }

  getMarginProperty() {
    if (this.isFlexEnabled) {
      return {
        'margin-left': '0px',
        'margin-right': '0px',
      };
    } else {
      if (this.marginLeftBetweenControls || this.marginRightBetweenControls) {
        if (this.marginLeftBetweenControls && this.marginRightBetweenControls) {
          return {
            'margin-left': this.marginLeftBetweenControls,
            'margin-right': this.marginRightBetweenControls,
          };
        }
        if (this.marginLeftBetweenControls) {
          return {
            'margin-left': this.marginLeftBetweenControls,
            'margin-right': this.defaultMarginRightBetweenControls,
          };
        }
        if (this.marginRightBetweenControls) {
          return {
            'margin-left': this.defaultMarginLeftBetweenControls,
            'margin-right': this.marginRightBetweenControls,
          };
        }
        return {
          'margin-left': this.defaultMarginLeftBetweenControls,
          'margin-right': this.defaultMarginRightBetweenControls,
        };
      } else {
        return {
          'margin-left': this.defaultMarginLeftBetweenControls,
          'margin-right': this.defaultMarginRightBetweenControls,
        };
      }
    }
  }

  private isAutocompleteService(
    object: any
  ): object is IAtlpInputLookUpService {
    return object && 'fetch' in object;
  }

  setStoredItemsFromLookUp(data) {
    if (data?.Data) {
      this.storedItems = data.Data.slice(0);
      if (this.customData?.length > 0 && this.storedItems?.length > 0) {
        this.storedItems = _.cloneDeep(
          data.Data.concat(_.cloneDeep(this.customData))
        );
      }
      if (this.patchCodeVal) {
        this.setLookupValuesByCode(this.patchCodeVal);
      }
    }
  }

  setCustomData(userInput: any) {
    // const userInput = $event.target.value;
    // if (this.lookupInputCode.nativeElement.value) {
    //   this.mapCustomData(userInput, this.lookupInputCode.nativeElement.value);
    // } else {
    //   console.log(
    //     "Please provide code before entering the English Name or Arabic Name...!"
    //   );
    // }
    this.modelChange.emit(userInput);
  }

  ngAfterViewInit() {
    if (this.isFocused) {
      setTimeout(() => {
        this.lookupInputCode.nativeElement.focus();
      });
    }
  }

  public search() {
    this.filterStoredItems(true);
  }

  public filterStoredItems(force?: boolean) {
    if (!this.displayItemCode && !this.displayItemFn) {
      throw new Error(
        'You must provide displayItem or displayItemFn for local search.'
      );
    }

    this.query = this.lookupInputCode.nativeElement.value;

    // empty query is not allowed for autocomplete
    if (this.isQueryEmpty(this.query) && this.minChars !== 0) {
      this.userSearchList = [];
      return;
    }

    if (force || this.query.length >= this.minChars) {
      this.noSuggestions = false;

      if (!this.storedItems) {
        return;
      }

      this.userSearchList = this.storedItems.filter((item) => {
        if (!this.viewItemCode(item)) {
          throw new Error(
            'String to evaluate in displayItem was provided wrong. Better use displayItemFn'
          );
        }

        let formatedItem = this.viewItemCode(item)?.toString().toLowerCase();
        if (this.displayItemFn) {
          formatedItem = this.displayItemFn(item)?.toString().toLowerCase();
        }
        return formatedItem.indexOf(this.query?.toString().toLowerCase()) > -1;
      });
      this.noSuggestions = this.userSearchList.length === 0;
    }
  }

  public autocompleteDisplayFn() {
    if (this.displayItemFn) {
      return this.displayItemFn;
    }

    return (item: any) => {
      return item ? this.viewItemCode(item) : item;
    };
  }

  public onKey($event: KeyboardEvent): boolean {
    if ($event.code === F9) {
      this.toggleSidebarOpen(this.keyToCloseSlider);
    }
    if ($event.code === Backspace) {
      if (this.lookupInputCode.nativeElement.value === '') {
        this.clearValue();
      }
      this.onTouched();
    }
    return true;
  }

  public onKeyCallback() {
    this.filterStoredItems();
  }

  clearButtonMouseDownClick() {
    this.clearButtonMouseClick = true;
    setTimeout(() => {
      this.clearButtonMouseClick = false;
    }, 500);
  }

  // public onBlurEnglishDesc($event:any){
  //   this.modelChange.emit($event);
  // }
  public onBlur($event: MouseEvent) {
    if (this.clearButtonMouseClick) {
      this.clearValue();
      this.clearButtonMouseClick = false;
      return;
    }
    this.query = this.lookupInputCode.nativeElement.value;
    if (this.lookupInputCode.nativeElement.value === '') {
      if (this.formControl?.invalid) {
        this.onTouched();
      }
      return;
    } else {
      if (this.formControl) {
        this.formControl?.setErrors({ required: false });
      }
    }
    if (this.isServerSidepagination()) {
      //do server side searchString
      this.fetch();
    } else {
      this.filterStoredItemsWithExactMatch(true);
    }
  }

  isServerSidepagination() {
    return this.service && this.lookUpObject.isServerSidePaginationEnabled;
  }

  public fetch(force: boolean = false, keyVal: string = '') {
    if (!this.service) {
      throw new Error("Service for fetch is not defined in 'Source'");
    }

    this.query = this.lookupInputCode.nativeElement.value || keyVal;

    // empty query is not allowed for autocomplete
    if (this.isQueryEmpty(this.query) && this.minChars !== 0) {
      this.userSearchList = [];
      this.noSuggestions = false;
      this.clearValue();
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

      if (this.serviceParams?.keys()?.length > 0) {
        this.serviceParams.keys().forEach((key, index) => {
          params = params.set(key, this.serviceParams.get(key).toString());
        });
        if (this.serviceParams?.has('searchString')) {
          params = params.set('searchString', this.query);
        }
      }

      this.requestsInQueue = this.requestsInQueue + 1;
      this.ref.markForCheck();

      this.service.fetch(params).then((result: any) => {
        this.requestsInQueue = this.requestsInQueue - 1;
        this.userSearchList = this.transformResult(result.Data);
        this.noSuggestions = this.userSearchList.length === 0;
        this.saveReturnType(this.userSearchList);
        if (this.userSearchList.length > 0) {
          let selectedRow = this.userSearchList.filter(
            (item) =>
              this.viewItemCode(item).toString()?.toLowerCase() ==
              this.query?.toString()?.toLowerCase()
          );
          let selected = null;
          if (selectedRow.length > 0) {
            selected = selectedRow[0];
          }
          if (selected) {
            this.writeValue(selected);
            this.optionSelected.emit(selected);
          } else {
            if (!this.skipValidation) {
              this.clearValue();
            }
          }
        } else {
          if (!this.skipValidation) {
            this.clearValue();
          }
        }
        this.ref.markForCheck();
      });
    }
  }

  public filterStoredItemsWithExactMatch(force?: boolean) {
    if (!this.displayItemCode && !this.displayItemFn) {
      throw new Error(
        'You must provide displayItem or displayItemFn for local search.'
      );
    }

    this.query = this.lookupInputCode.nativeElement.value;

    // empty query is not allowed for autocomplete
    if (this.isQueryEmpty(this.query) && this.minChars !== 0) {
      this.userSearchList = [];
      return;
    }

    if (force || this.query.length >= this.minChars) {
      this.noSuggestions = false;

      if (!this.storedItems) {
        return;
      }

      this.userSearchList = this.storedItems.filter((item) => {
        const uniquecode = this.viewItemCode(item);
        if (
          uniquecode === null ||
          uniquecode === undefined ||
          uniquecode === ''
        ) {
          throw new Error(
            'String to evaluate in displayItem was provided wrong. Better use displayItemFn'
          );
        }

        let formatedItem = this.viewItemCode(item)?.toString().toLowerCase();
        if (this.displayItemFn) {
          formatedItem = this.displayItemFn(item)?.toString().toLowerCase();
        }
        return formatedItem === this.query?.toString().toLowerCase();
        //return formatedItem.indexOf(this.query.toLowerCase()) > -1;
      });
      this.noSuggestions = this.userSearchList.length === 0;

      if (this.userSearchList.length > 0) {
        const selected = this.userSearchList[0];
        this.writeValue(selected);

        if (selected) {
          this.optionSelected.emit(selected);
        }
      } else {
        if (!this.skipValidation) {
          this.clearValue();
        } else {
          this.optionSelected.emit(this.query);
        }
      }
    }
  }

  public onFocus($event: any) {
    if (this.selectedOption) {
      return;
    }
    this.filterStoredItems();
  }

  public viewItemCode(item: any) {
    if (this.displayItemFn) {
      return this.displayItemFn(item);
    }
    // using eval() can be dangerous, better use displayItemFn function
    return this.displayItemCode ? eval(this.displayItemCode) : item.Code;
  }

  public viewItemNameInEnglish(item: any) {
    return this.displayItemNameInEnglish
      ? eval(this.displayItemNameInEnglish)
      : item.NameEnglish;
  }

  public viewItemNameInArabic(item: any) {
    return this.displayItemNameInArabic
      ? eval(this.displayItemNameInArabic)
      : item.NameArabic;
  }

  public clearValue() {
    if (this.formControl) {
      this.formControl?.reset();
      this.formControl?.markAllAsTouched();
    }
    this.selectedOption = null;
    this.lookupInputCode.nativeElement.value = '';
    this.lookupInputEnglish.nativeElement.value = '';
    this.lookupInputArabic.nativeElement.value = '';
    this.query = '';
    this.onChange(this.selectedOption);
    this.optionSelected.emit('');
    this.onTouched();
  }

  private isQueryEmpty(query: string): boolean {
    return query.length <= 0;
  }

  private saveReturnType(items: any[] | undefined | null) {
    if (items && items.length > 0) {
      this.returnType = typeof items[0];
    }
  }

  writeValue(val: any): void {
    // if (!val)
    //   return;

    this.valuechangeAttemptes++;
    if (this.valuechangeAttemptes > 300) {
      console.log('Error lookup object: => ', this.lookUpObject);
      throw new Error(
        `Too many value changes. \n
         Please don't try to set value for this control from your component after user select it manuvally. \n
         Please find above log to find, which lookup object causes this issue`
      );
    }
    this.patchCodeVal = '';
    if (!val) {
      this.selectedOption = null;
      this.query = '';
      if (this.lookupInputCode?.nativeElement) {
        this.lookupInputCode.nativeElement.value = '';
      }
      if (this.lookupInputEnglish?.nativeElement) {
        this.lookupInputEnglish.nativeElement.value = '';
      }
      if (this.lookupInputArabic?.nativeElement) {
        this.lookupInputArabic.nativeElement.value = '';
      }
      return;
    }
    this.selectedOption = val;
    if (this.showAddNew && AtlpCheckHelper.isObject(val) && val.isNew) {
      this.storedItems.push(val);
    }

    if (this.lookupInputCode) {
      if (AtlpCheckHelper.isObject(val)) {
        this.lookupInputCode.nativeElement.value = this.viewItemCode(
          this.selectedOption
        );

        this.lookupInputEnglish.nativeElement.value =
          this.viewItemNameInEnglish(this.selectedOption);

        this.lookupInputArabic.nativeElement.value = this.viewItemNameInArabic(
          this.selectedOption
        );
      } else {
        //this.lookupInputCode.nativeElement.value = val;
      }

      let skip = false;

      if (
        this.lookUpObject?.dynamicFieldsProperty?.fieldsToDispalyInUI?.length ==
        1
      ) {
        if (
          this.lookUpObject.dynamicFieldsProperty.fieldsToDispalyInUI[0] ==
          'Code'
        ) {
          skip = true;
        }
      }

      if (!skip) {
        if (
          !this.lookupInputEnglish.nativeElement.value &&
          !this.lookupInputArabic.nativeElement.value
        ) {
          if (AtlpCheckHelper.isObject(val)) {
            const keyValue = this.viewItemCode(val);
            if (keyValue && !this.lookUpObject.isAnonymousDataBindingEnable) {
              this.setLookupValuesByCode(keyValue);
            }
          } else {
            this.setLookupValuesByCode(val);
          }
        }
      }
    } else {
      setTimeout(() => {
        this.writeValue(val);
      }, 2000);
    }
    this.onChange(val);
  }

  private setLookupValuesByCode(val) {
    if (this.isServerSidepagination()) {
      this.fetch(false, val);
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
      this.onTouched();
      this.query = this.viewItemCode(selectedItemArray[0]);
      this.writeValue(selectedItemArray[0]);
      this.optionSelected.emit(selectedItemArray[0]);
    } else {
      if (!this.skipValidation) {
        this.clearValue();
      }
    }
    setTimeout(() => {
      this.ref.markForCheck();
      this.ref.detectChanges();
    }, 1000);
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

  toggleSidebarOpen(key): void {
    this.ngxService.start();
    this.setSideBarProperties.emit({ lookUpObject: this.lookUpObject });
    setTimeout(() => {
      this._atplSidebarService.getSidebar(key).toggleOpen();
      this.ngxService.stop();
    }, 100);
  }

  lookUpClose(isClose) {
    if (isClose) {
      this.optionSelected.emit(isClose);
    }
  }

  lookUpValueFromSlider(selectedItem) {
    this.onTouched();
    this.query = this.viewItemCode(selectedItem);
    this.writeValue(selectedItem);

    if (selectedItem) {
      this.optionSelected.emit(selectedItem);
    }

    if (this.clearAfterSearch) {
      this.clearValue();
    }
    this.toggleSidebarOpen(this.keyToCloseSlider);
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
            ? { inputLookUpIsRequired: true }
            : null;
        }
      } else {
        if (!control.value) {
          return this.isRequiredValidation
            ? { inputLookUpIsRequired: true }
            : null;
        } else if (control.value) {
          return this.isInvalidObjectValidation
            ? { inputLookUpInvalidObject: true }
            : null;
        }
      }
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }
}
