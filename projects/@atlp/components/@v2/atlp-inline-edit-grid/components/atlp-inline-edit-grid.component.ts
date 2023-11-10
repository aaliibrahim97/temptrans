import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnInit,
  Input,
  SimpleChanges,
  ComponentRef,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AtlpInlineGridEditColumnDefinition } from '../models/atlp-inline-grid-edit-col-def';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { TranslateService } from '@ngx-translate/core';
import { atlpCompareRexCustomPatternMatchValidator } from '../../validation-message/validators/atlp-rex-pattern-exact-match-validator';
import { atlpCompareCharacterExactMatchValidator } from '../../validation-message/validators/atlp-character-exact-match-validator';
import { AtlpTextValidator } from '../../validation-message/validators/atlp-no-space-validator';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';
import { DynamicLookupProps } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-form-input-lookup-props';
import { DynamicAutocompleteProps } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-form-auto-complete-input-props';
import { AtlpInlineEditGridBase } from '../shared/atlp-inline-edit-grid-base';
import { InlineGridEditFieldTypes } from '../models/inline-grid-edit-field-types';
import { AtlpFileUploadButtonInputModel } from '../../file-upload/atlp-file-upload-button/models/atlp-file-upload-button.model';

@Component({
  selector: 'atlp-inline-edit-grid',
  templateUrl: './atlp-inline-edit-grid.component.html',
  styleUrls: ['./atlp-inline-edit-grid.component.scss'],
})
export class AtlpInlineEditGridComponent
  extends AtlpInlineEditGridBase
  implements OnInit, OnDestroy
{
  subscriptions: Subscription[] = [];
  private _unsubscribeAll$ = new Subject<never>();
  public totalItemCount: number;
  searchText: string = '';
  paginationParameters = {
    pageNumber: 1,
    pageSize: 5,
  };
  gridDataList: any;
  disableActionsBtns = false;
  pageSizeOptions?: number[] = [5, 10, 20, 50, 100];
  selectedLanguage: string = 'en';
  displayedColumns: Array<string>;
  addFormRowEnable: boolean = false;
  columnsToDisplay: Array<string>;
  displayColumnDefs: AtlpInlineGridEditColumnDefinition[];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);
  selectedRowindex: any;
  currentRow: any;
  addForm: FormGroup;
  lookupObjects: { [key: string]: DynamicLookupProps } = {};
  lookupInputProps: { [key: string]: DynamicLookupProps } = {};
  autocompleteObjects: { [key: string]: DynamicAutocompleteProps } = {};
  autocompleteProps: { [key: string]: DynamicAutocompleteProps } = {};
  fileUploadProps: { [key: string]: AtlpFileUploadButtonInputModel } = {};
  inlineGridEditFieldTypes = InlineGridEditFieldTypes;

  @ViewChild('matPaginator') paginator: MatPaginator;

  @Input() isGlobalSearchEnabled: boolean = true;
  @Input() isActionSectionEnabled: boolean = true;
  @Input() isAddNewSectionEnabled: boolean = true;
  @Input() showCheckboxSelection: boolean = false;
  @Input() filterPredicate: any;
  @Input() gridHeader: AtlpInlineGridEditColumnDefinition[];
  @Input() formModel;
  @Input() deleteRequired;
  @Input() isServerSidePaginationEnabled;
  @Input() isViewMode: boolean;
  @Input() deleteRecordFlag;
  @Input() rowChanges;
  @Input() parentcomponentRef: ComponentRef<any>;
  @Input() actionTemplate: TemplateRef<any> = null;
  @Input() columnToInclude: string[] = ['checkboxselection', 'actions'];
  @Input() columnDisplayPriority: string[] = [];
  @Input() set gridData(value: number) {
    this.gridDataList = value;
    if (this.isServerSidePaginationEnabled) {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.gridDataList);
        this.dataSource.data = [...this.dataSource.data];
        this._changeDetectorRef.markForCheck();
      }, 1000);
    } else {
      setTimeout(() => {
        this.totalItemCount = this.gridDataList.totalItemCount;
        this.paginator.length = this.gridDataList.length;
        this.dataSource = new MatTableDataSource(this.gridDataList);
        this.dataSource.data = [...this.dataSource.data];
        this.dataSource.paginator = this.paginator;
        this._changeDetectorRef.markForCheck();
      }, 1000);
    }
  }
  @Input() set disableActions(val) {
    this.disableActionsBtns = val;
  }
  @Input() set setLookupObjects(val: { [key: string]: DynamicLookupProps }) {
    if (val) {
      this.lookupObjects = val;
      Object.keys(val).forEach((key) => {
        this.setLookupInputProps(
          this.parentcomponentRef,
          val[key],
          key,
          this.lookupInputProps
        );
      });
    }
  }
  @Input() set setAutoCompleteObjects(val: {
    [key: string]: DynamicAutocompleteProps;
  }) {
    if (val) {
      this.autocompleteObjects = val;
      Object.keys(val).forEach((key) => {
        this.setAutocompleteInputProps(
          this.parentcomponentRef,
          val[key],
          key,
          this.autocompleteProps
        );
      });
    }
  }
  @Input() set clearOrSearchGridData(val) {
    this.searchText = val;
    this.inputSearch();
  }
  @Input() set setFileUploadProps(val: {
    [key: string]: AtlpFileUploadButtonInputModel;
  }) {
    if (val) {
      this.fileUploadProps = val;
    }
  }

  @Output() edit = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() cancle = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() formChange = new EventEmitter<any>();

  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(['(max-width: 599.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isHandsetLandscape$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 600px) and (max-width: 767.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isTablet$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 768px) and (max-width: 1023.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isWeb$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 1024px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );

  constructor(
    private _iconsService: IconsService,
    private _breakpointObserver: BreakpointObserver,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fb: FormBuilder,
    public _translateService: TranslateService,
    public _matPaginatorIntl: MatPaginatorIntl,
    private _atlpTranslationService: AtlpTranslationService
  ) {
    super();
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    if (this.showCheckboxSelection) {
      this.gridHeader.unshift({
        columnDef: 'checkboxselection',
        header: 'checkboxselection',
        fieldType: InlineGridEditFieldTypes.checkboxSelection,
        sortOrder: -1,
      });
      this.columnDisplayPriority.unshift('checkboxselection');
    }
    this.displayColumnDefs = this.gridHeader;
    this.subscriptions.push(
      this._atlpTranslationService
        .getCurrentLanguage()
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe((lang) => {
          this.selectedLanguage = lang;
          this._atlpTranslationService.setDefaultLanguageSettings(
            this.selectedLanguage,
            navigationEnglish,
            navigationArabic
          );
        })
    );
    this.createForm();
    this.getDisplayColumns();

    this.isHandset$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isHandset) => {
        if (isHandset) {
          this.setDisplaycolumns(4);
        }
      });
    this.isHandsetLandscape$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isHandsetLandscape) => {
        if (isHandsetLandscape) {
          this.setDisplaycolumns(5);
        }
      });
    this.isTablet$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isTablet) => {
        if (isTablet) {
          this.setDisplaycolumns(6);
        }
      });
    this.isWeb$.pipe(takeUntil(this._unsubscribeAll$)).subscribe((isWeb) => {
      if (isWeb) {
        this.columnsToDisplay = this.displayedColumns;
      }
    });

    this.dataSource = new MatTableDataSource(this.gridDataList);
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.paginator = this.paginator;
    this.setValidation();

    this._atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.selectedLanguage = lang;
      });
    if (!this.isServerSidePaginationEnabled) {
      this._matPaginatorIntl.itemsPerPageLabel =
        this._translateService.instant('ITEMS_PER_PAGE');
      this._matPaginatorIntl.firstPageLabel =
        this._translateService.instant('FIRST_PAGE');
      this._matPaginatorIntl.lastPageLabel =
        this._translateService.instant('LAST_PAGE');
      this._matPaginatorIntl.nextPageLabel =
        this._translateService.instant('NEXT_PAGE');
      this._matPaginatorIntl.previousPageLabel =
        this._translateService.instant('PREVIOUS_PAGE');

      if (this.selectedLanguage != 'en') {
        this._matPaginatorIntl.getRangeLabel = this.arabicRangeLabel;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedRowindex = this.rowChanges.rowIndexfromParent;
    this.addFormRowEnable = this.rowChanges.addFormRowEnable;
    this.dataSource = new MatTableDataSource(this.gridDataList);
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.paginator = this.paginator;
    if (this.gridDataList && this.gridDataList.length > 0) {
      this.totalItemCount = this.gridDataList[0].TotalRecords;
      this.paginationParameters.pageSize = this.gridDataList[0].pageSize;
      this.paginationParameters.pageNumber = this.gridDataList[0].pageNumber;
    }
  }

  ngAfterViewInit(): void {
    this.resetPagination();
    this.addForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((val) => {
        this.formChange.emit(this.addForm);
      });
  }

  getDisplayColumns() {
    if (
      (this.showCheckboxSelection && this.columnDisplayPriority?.length > 1) ||
      (!this.showCheckboxSelection && this.columnDisplayPriority?.length > 0)
    ) {
      this.displayedColumns = this.columnDisplayPriority;
    } else {
      this.gridHeader.sort((a, b) =>
        a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0
      );
      this.displayedColumns = this.gridHeader
        ? this.gridHeader.map((c) => c.columnDef)
        : [];
      this.columnDisplayPriority = this.displayedColumns;
    }
  }

  setDisplaycolumns(numberOfColums: number) {
    if (this.columnDisplayPriority.length > 0) {
      let newDisplayColumns = this.columnDisplayPriority.slice(
        0,
        numberOfColums
      );
      if (this.displayedColumns.includes('actions')) {
        newDisplayColumns.push('actions');
      }
      this.columnsToDisplay = newDisplayColumns;
    } else {
      let newDisplayColumns = [];
      this.displayedColumns.forEach((columnName, index) => {
        if (this.columnToInclude.includes(columnName)) {
          newDisplayColumns.push(columnName);
        }
        if (index < numberOfColums) {
          newDisplayColumns.push(columnName);
        }
      });
      this.columnsToDisplay = this.displayedColumns.slice(0, numberOfColums);
    }
  }

  arabicRangeLabel(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) {
      return `0 من ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} من ${length}`;
  }

  createForm() {
    this.addForm = this._fb.group(this.formModel);
  }

  addNewRow() {
    this.addForm.reset();
    this.resetForm(this.addForm);
    this.gridDataList.unshift(this.addForm.value);
    this.dataSource = new MatTableDataSource(this.gridDataList);
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.paginator = this.paginator;
    this.addFormRowEnable = true;
    this.selectedRowindex = 0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  showValidationMsgsOnSaveButtonClick() {
    for (let i = 0; i < this.displayColumnDefs.length; i++) {
      this.getValidationMsges(this.displayColumnDefs[i]);
    }
  }

  setValidation() {
    this.gridHeader.forEach((obj) => {
      if (obj.columnDef !== 'actions' && obj.columnDef !== 'checkbox') {
        let formValidators = [];
        if (obj.validations && obj.validations) {
          obj.validations.forEach((validateItem) => {
            if (validateItem.validation === 'containerSpecialFormatCheck') {
              formValidators.push(
                atlpCompareRexCustomPatternMatchValidator(
                  obj.columnDef,
                  validateItem.validationPattern,
                  {
                    containerFormatError: true,
                  }
                )
              );
            }
            if (validateItem.validation === 'required') {
              formValidators.push(Validators.required);
            }
            if (validateItem.validation === 'maxLength') {
              formValidators.push(Validators.maxLength(validateItem.maxLength));
            }
            if (validateItem.validation === 'minLength') {
              formValidators.push(Validators.minLength(validateItem.minLength));
            }
            if (validateItem.validation === 'charExactMatch') {
              formValidators.push(
                atlpCompareCharacterExactMatchValidator(
                  obj.columnDef,
                  validateItem.charExactMatch
                )
              );
            }
            if (validateItem.validation === 'pattern') {
              formValidators.push(Validators.pattern(validateItem.pattern));
            }
            if (validateItem.validation === 'noSpaceAllowed') {
              formValidators.push(AtlpTextValidator.noSpaceAllowed);
            }
          });
        }
        if (formValidators?.length > 0) {
          this.addForm.get(obj.columnDef).setValidators(formValidators);
        }
      }
    });
  }

  getValidationMsges(col) {
    let validationMsg = '';
    const colInfo = this.addForm.get(col.columnDef);
    if (colInfo?.errors?.required) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'required';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.pattern) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'pattern';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.containerFormatError) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'containerSpecialFormatCheck';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.minlength) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'minLength';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.maxlength) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'maxLength';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.charExactMatch) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'charExactMatch';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }
    if (colInfo?.errors?.noSpaceAllowed) {
      validationMsg = col.validations.filter((validationItem) => {
        return validationItem.validation == 'noSpaceAllowed';
      })[0].validationMsg;
      return this._translateService.instant(validationMsg);
    }

    return this._translateService.instant(validationMsg);
  }

  addColumn(oldCol, currentCol): void {
    const temp = [];
    this.columnsToDisplay.map((x) => {
      if (x === oldCol) {
        x = currentCol;
      }
      temp.push(x);
    });
    this.columnsToDisplay = temp;
  }

  singleSelection(ele, obj, index) {
    if (ele.checked) {
      this.selectedRowindex = index;
      this.currentRow = obj;
      this.selection.selected.push(obj);
    } else {
      this.selectedRowindex = undefined;
      this.selection.clear();
    }
  }

  editHandler(ele, index) {
    this.selectedRowindex = index;
    setTimeout(() => {
      this.addForm.patchValue(ele);
      this.addForm.updateValueAndValidity();
      const editElement = {
        index: index,
        element: ele,
      };
      this.addForm.markAllAsTouched();
      this.addForm.markAsDirty();
      this.edit.emit(editElement);
    }, 10);
  }

  deleteHandler(ele, index) {
    const deleteElement = {
      index: index,
      element: ele,
    };
    this.delete.emit(deleteElement);
    if (!this.isServerSidePaginationEnabled) {
      this.inputSearch();
      setTimeout(() => {}, 2000);
    }
  }

  saveHandler(ele, index) {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      this.addForm.markAsDirty();
      this.showValidationMsgsOnSaveButtonClick();
      return;
    }
    this.selectedRowindex = index;
    const saveElement = {
      index: index,
      element: this.addForm,
      isAddNew: this.addFormRowEnable,
    };
    if (!this.isServerSidePaginationEnabled) {
      this.inputSearch();
    }
    this.save.emit(saveElement);
  }

  cancleHandler(ele, index) {
    this.selectedRowindex = index;
    const cancleElement = {
      index: index,
      element: ele,
    };
    this.addForm.reset();
    this.resetForm(this.addForm);
    this.selectedRowindex = undefined;
    if (this.addFormRowEnable) {
      this.gridDataList.shift();
      this.dataSource = new MatTableDataSource(this.gridDataList);
      this.dataSource.data = [...this.dataSource.data];
      this.dataSource.paginator = this.paginator;
    }
    this.addFormRowEnable = false;
    if (!this.isServerSidePaginationEnabled) {
      this.inputSearch();
    }
  }

  changePage(paginationResult) {
    this.changePageHandler(paginationResult);
  }

  changePageHandler(paginationResult) {
    this.paginationParameters.pageNumber =
      Number(paginationResult.PageNumber) + 1;
    this.paginationParameters.pageSize = paginationResult.PageSize;
    this.pageChange.emit({
      pageNumber: this.paginationParameters.pageNumber,
      pageSize: this.paginationParameters.pageSize,
    });
  }

  resetPagination() {
    this.paginationParameters.pageSize = 5;
    this.paginationParameters.pageNumber = 1;
    this.totalItemCount = 0;
  }

  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  inputSearch() {
    setTimeout(() => {
      this.searchText = this.searchText.trim();
      this.searchText = this.searchText.toLowerCase();
      this.dataSource.filterPredicate = this.filterPredicate;
      this.dataSource.filter = this.searchText;
      this.onSearch.emit(this.searchText);
    }, 300);
  }

  search() {
    this.onSearch.emit(this.searchText);
  }

  clearValue() {
    this.searchText = '';
    this.dataSource.filter = '';
    this.onSearch.emit(this.searchText);
  }

  resetForm(form: FormGroup) {
    Object.keys(form.controls).forEach((formctrl) => {
      form.get(formctrl).setErrors(null);
    });
    form.updateValueAndValidity();
  }

  private get icons(): Array<string> {
    return [
      'warning-circle-fill',
      'plus-white',
      'data-icon-white',
      'warning-circle-fill',
      'edit',
      'remove-table-btn',
      'save-icon',
      'close-white-icon',
      'attachment',
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
