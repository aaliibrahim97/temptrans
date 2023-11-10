import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AtlpLookupService } from '../../services/atlp-lookup.service';
import {
  defaultLookUpData,
  IAtlpLookupConstant,
} from '../../models/atlp-lookup-constants.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AtlpLookUpColumnDefinition } from '../../models/atlp-lookup-column-definition';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSearchBarComponent } from 'projects/@atlp/components/search-bar/search-bar.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpParams } from '@angular/common/http';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  AtlpPaginationModel,
  IAtlpMatPaginationInputModel,
} from '../../../atlp-pagination-components/atlp-mat-pagination/models/atlp-pagination.model';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IAtlpInputLookUpService } from '../../models/atlp-input-lookup.interface';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpIndexDBService } from 'projects/@atlp/services/atlp-index-db.service';
import { AtlpNoTotalCountPaginationModel } from '../../../atlp-pagination-components/atlp-pagination-no-total-count/models/atlp-no-total-count-pagination.model';
import { AtlpSidebarV2Service } from '../../../atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'atlp-lookup-component',
  templateUrl: './atlp-lookup-slider.component.html',
  styleUrls: ['./atlp-lookup-slider.component.scss'],
})
export class AtlpLookupSliderComponent implements OnInit, OnChanges, OnDestroy {
  private _unsubscribeAll$ = new Subject<never>();
  @Input()
  lookUpObject: IAtlpLookupConstant;
  @Output()
  lookUpValue: EventEmitter<any> = new EventEmitter();
  @Output()
  lookUpClose: EventEmitter<any> = new EventEmitter();
  @Output()
  setStoredItems: EventEmitter<any> = new EventEmitter<any>();
  public SidebarNameAtlp = SidebarName;
  displayedColumns: Array<string>;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel(true, []);
  public keyToCloseSlider: SidebarName | string;
  defaultColumnNames = ['Code', 'NameEnglish', 'NameArabic'];
  isChecked = true;
  pageSize = 5;
  totalPageSize = 0;
  displayColumnDefs: AtlpLookUpColumnDefinition[] = [];
  displaySelectColumnDefs: AtlpLookUpColumnDefinition[] = [
    { columnDef: 'select', header: 'select', cell: (element) => element },
  ];
  columnsToDisplay: Array<string>;
  private sort: MatSort;
  private service?: IAtlpInputLookUpService;
  @ViewChild(AtlpSearchBarComponent)
  searchBar: AtlpSearchBarComponent;

  @Input() serviceParams?: HttpParams;
  public requestsInQueue = 0;

  @ViewChild('lookupInputCode') lookupInputCode: ElementRef;
  query: string;
  minChars: number = 1;
  @Input() transformResult: any = (x: any[]) => x;
  noSuggestions: boolean;
  returnType: string;
  pageNumber: number = 0;
  paginationData: IAtlpMatPaginationInputModel = {
    pageSize: 5,
    pageNumber: 0,
    totalItemCount: 0,
  };
  matTableData: any[] = [];
  dynamicSearchParamMap: Map<string, string> = new Map<string, string>();
  isDynamicHttpParamsEnabled: boolean;

  @Input() set source(value: IAtlpInputLookUpService | any[]) {
    if (this.isAutocompleteService(value)) {
      this.service = value as IAtlpInputLookUpService;
    }
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  public nextArrowColor: string = 'white';
  public nextClickNoTotalCount: boolean;
  filteredData: any = [];
  @ViewChildren('searchInputFields')
  searchInputFields: QueryList<ElementRef>;

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

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

  selectedLanguage: string = 'en';

  constructor(
    private atplSidebarService: AtlpSidebarV2Service,
    private atlpLookupService: AtlpLookupService,
    private indexService: AtlpIndexDBService,
    private _breakpointObserver: BreakpointObserver,
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconsService: IconsService,
    private ngxService: NgxUiLoaderService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngOnInit(): void {
    this.isHandset$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isHandset) => {
        if (isHandset) {
          this.columnsToDisplay = this.displayedColumns.slice(0, 3);
        }
      });
    this.isHandsetLandscape$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isHandsetLandscape) => {
        if (isHandsetLandscape) {
          this.columnsToDisplay = this.displayedColumns.slice(0, 5);
        }
      });
    this.isTablet$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isTablet) => {
        if (isTablet) {
          this.columnsToDisplay = this.displayedColumns.slice(0, 6);
        }
      });
    this.isWeb$.pipe(takeUntil(this._unsubscribeAll$)).subscribe((isWeb) => {
      if (isWeb) {
        this.columnsToDisplay = this.displayedColumns;
      }
    });
  }

  private isAutocompleteService(
    object: any
  ): object is IAtlpInputLookUpService {
    return object && 'fetch' in object;
  }

  isServerSidepagination() {
    return this.service && this.lookUpObject.isServerSidePaginationEnabled;
  }

  ngOnChanges(): void {
    //set slider ID
    if (this.lookUpObject) {
      this.keyToCloseSlider = this.lookUpObject?.sliderId;
    } else {
      this.lookUpObject = defaultLookUpData;
    }
    if (
      this.lookUpObject.dynamicFieldsProperty?.fieldsToDispalyInUI?.length > 0
    ) {
      this.displayedColumns = this.columnsToDisplay =
        this.lookUpObject.dynamicFieldsProperty.fieldsToDispalyInUI;
    } else {
      //this.columnsToDisplay = Object.keys(names);
      this.displayedColumns = this.columnsToDisplay = [
        ...this.defaultColumnNames,
      ];
    }
    if (this.isServerSidepagination()) {
      this.fetch();
    } else {
      if (
        this.lookUpObject?.data?.Data &&
        AtlpCheckHelper.isArray(this.lookUpObject?.data?.Data)
      ) {
        this.ngxService.start();
        this.lookUpObject.data.Data = this.reOrderData(
          this.lookUpObject.data.Data
        );
        this.displayColumnAndRows(this.lookUpObject.data);
        this.setStoredItems.emit(this.lookUpObject.data);
        this.ngxService.stop();
      } else {
        if (this.lookUpObject?.lookupId) {
          this.ngxService.start();
          this.loadLookUpData().subscribe((data) => {
            if (data?.Data && AtlpCheckHelper.isArray(data?.Data)) {
              data.Data = this.reOrderData(data.Data);
              this.setStoredItems.emit(data);
              this.displayColumnAndRows(data);
            }
            this.ngxService.stop();
          });
        } else {
          const defaultData = { data: { Data: [] } };
          this.setStoredItems.emit(defaultData);
          this.displayColumnAndRows(defaultData);
        }
      }
    }
  }

  public loadLookUpData(): Observable<any> {
    const afterDataLoadSubject = new Subject<any>();
    this.indexService.get(this.lookUpObject?.lookupId).then((res) => {
      if (res?.Data) {
        afterDataLoadSubject.next(res);
      } else {
        this.atlpLookupService
          .getLookupDataGeneric(this.lookUpObject)
          .subscribe(
            (responseData) => {
              afterDataLoadSubject.next(responseData);
              //insert value after fetching from server
              if (responseData?.Data?.length > 0) {
                this.indexService
                  .add(this.lookUpObject.lookupId, responseData)
                  .then((res) => {
                    if (res) {
                      //console.log("lookup value inserted");
                    }
                  });
              }
            },
            (error) => {
              afterDataLoadSubject.next({ data: { Data: [] } });
            }
          );
      }
    });
    return afterDataLoadSubject;
  }

  displayColumnAndRows(data) {
    if (this.isServerSidepagination()) {
      this.paginationData.totalItemCount = data.totalItems
        ? data.totalItems
        : 0;
    } else {
      this.paginationData.totalItemCount = data?.Data?.length
        ? data.Data.length
        : 0;
    }

    this.generateColumnDefenition();
    this.displayedColumns = this.displayColumnDefs.map((c) => c.columnDef);
    if (AtlpCheckHelper.isArray(data.Data)) {
      this.SetMatTableData(data.Data);
    }
  }

  private SetMatTableData(data: any[]) {
    this.matTableData = [...data];
    if (this.lookUpObject?.excludeItemsFromList) {
      this.matTableData = this.matTableData.filter(
        (item) =>
          !this.lookUpObject?.excludeItemsFromList?.values.includes(
            item[this.lookUpObject?.excludeItemsFromList?.columnName]
          )
      );
    }
    if (this.isServerSidepagination()) {
      this.dataSource.data = [...this.matTableData];
    } else {
      const currentPage = this.pageNumber * this.pageSize;
      this.dataSource.data = [...this.matTableData].slice(
        currentPage,
        currentPage + this.pageSize
      );
    }
    this.isDynamicHttpParamsEnabled = this.lookUpObject.isDynamicHttpParams;
    this.dataSource.sort = this.sort;
    this.columnsToDisplay = this.displayedColumns;
  }

  private isQueryEmpty(query: string): boolean {
    return query.length <= 0;
  }

  private saveReturnType(items: any[] | undefined | null) {
    if (items && items.length > 0) {
      this.returnType = typeof items[0];
    }
  }

  private reOrderData(data) {
    const formattedData = [];
    if (data) {
      data.forEach((item) => {
        //let obj = { ...item, isVisible: false };
        if (item) {
          let obj = {};
          this.columnsToDisplay.forEach((column) => {
            obj[column] = item[column];
            // obj = { ...obj, isVisible: true };
          });
          obj = { ...obj, ...item };
          formattedData.push(obj);
        }
      });
    }
    return formattedData;
  }

  public fetch(force?: boolean) {
    if (!this.service) {
      throw new Error("Service for fetch is not defined in 'Source'");
    }
    this.ngxService.start();
    if (this.searchBar) {
      this.query = this.searchBar.searchValue?.toString()?.toLowerCase().trim();
    } else {
      this.query = '';
    }

    let params = new HttpParams();
    params = params.set('query', this.query);
    let skip = this.pageNumber * this.pageSize;
    params = params.set('pageNumber', this.pageNumber.toString());
    params = params.set('skip', skip.toString());
    params = params.set('pageSize', this.pageSize.toString());

    if (this.serviceParams?.keys()?.length > 0) {
      this.serviceParams.keys().forEach((key, index) => {
        params = params.set(key, this.serviceParams.get(key).toString());
      });
      if (this.serviceParams?.has('searchString')) {
        params = params.set('searchString', this.query);
      }
    }

    if (
      this.lookUpObject.isDynamicHttpParams &&
      this.lookUpObject.dynamicHttpParams?.length > 0
    ) {
      this.lookUpObject.dynamicHttpParams.forEach((dynamicParamsKey) => {
        const searchVal =
          this.dynamicSearchParamMap.get(dynamicParamsKey) || '';
        params = params.set(dynamicParamsKey, searchVal);
      });
    }

    this.requestsInQueue = this.requestsInQueue + 1;
    this._changeDetectorRef.detectChanges();

    this.service.fetch(params).then((result: any) => {
      this.ngxService.stop();
      this.requestsInQueue = this.requestsInQueue - 1;
      let resultData = this.transformResult(result);
      resultData.Data = this.reOrderData(resultData.Data);
      //return on clicking of next button if no data
      if (this.nextClickNoTotalCount && result.Data.length == 0) {
        this.nextArrowColor = 'black';
        return;
      } else {
        this.nextArrowColor = 'white';
      }

      this.setStoredItems.emit(resultData);
      this.displayColumnAndRows(resultData);

      this.noSuggestions = resultData.length === 0;

      this.saveReturnType(resultData);
      this._changeDetectorRef.detectChanges();
    });
  }

  pageChange(pageModel: AtlpPaginationModel): void {
    if (this.pageSize != pageModel.PageSize) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = pageModel.PageNumber;
    }
    this.pageSize = pageModel.PageSize;

    this.paginationData.pageSize = this.pageSize;
    this.paginationData.pageNumber = this.pageNumber;
    if (this.isServerSidepagination()) {
      this.fetch();
    } else {
      const currentPage = this.pageNumber * this.pageSize;
      if (this.searchBar.searchValue?.toString()?.toLowerCase().trim() !== '') {
        this.dataSource.data = [...this.filteredData].slice(
          currentPage,
          currentPage + this.pageSize
        );
      } else {
        this.dataSource.data = [...this.matTableData].slice(
          currentPage,
          currentPage + this.pageSize
        );
      }
    }
  }

  isDynamicSearchInputVisible(columnObj) {
    const columnToSearch = columnObj.columnDef;
    return (
      this.lookUpObject.isDynamicHttpParams &&
      this.lookUpObject.dynamicHttpParams.includes(columnToSearch)
    );
  }

  changePageNoTotalCount(pageModel: AtlpNoTotalCountPaginationModel) {
    this.nextClickNoTotalCount = pageModel.whichButtonClicked === 'next';
    this.pageNumber = pageModel.pageNumber;
    this.pageSize = pageModel.pageSize;
    if (this.isServerSidepagination()) {
      this.fetch();
    }
  }

  generateColumnDefenition() {
    if (this.displayColumnDefs.length == 0) {
      this.displayColumnDefs = this.displaySelectColumnDefs;

      this.columnsToDisplay.forEach((colName) => {
        // extraClass: 'custom-code',
        let colDef: AtlpLookUpColumnDefinition = {
          columnDef: colName,
          header: colName,
          cell: (element) => element[colName],
        };
        this.displayColumnDefs.push(colDef);
      });
    }
  }

  toggleSidebarOpen(key, isClose): void {
    this.resetLookup();
    if (isClose) {
      this.lookUpClose.emit(isClose);
    }
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  columnSpecificSearch($event, columnObj) {
    const columnToSearch = columnObj.columnDef;
    const searchWord = $event.target.value;
    if (searchWord) {
      this.dynamicSearchParamMap.set(columnToSearch, searchWord);
    } else {
      this.dynamicSearchParamMap.delete(columnToSearch);
    }
    this.pageNumber = 0;
    this.paginationData.pageNumber = 0;
    if (this.isServerSidepagination()) {
      this.fetch();
    } else {
      this.search(searchWord);
    }
  }

  search(searchWord, columnToSearch = null): void {
    this.pageNumber = 0;
    this.paginationData.pageNumber = 0;
    if (this.isServerSidepagination()) {
      this.fetch();
    } else {
      const searchWordInLower = searchWord?.toString()?.toLowerCase().trim();
      if (!searchWordInLower) {
        const currentPage = this.pageNumber * this.pageSize;
        this.dataSource.data = [...this.matTableData].slice(
          currentPage,
          currentPage + this.pageSize
        );
        this.paginationData.totalItemCount = this.matTableData.length;
        return;
      }
      if (columnToSearch) {
        this.filteredData = this.matTableData.filter((obj) => {
          let isMatching = false;
          this.dynamicSearchParamMap.forEach((value, key, map) => {
            if (obj[key] && value) {
              isMatching =
                isMatching ||
                obj[key]
                  .toString()
                  .toLocaleLowerCase()
                  .includes(value?.toLocaleLowerCase() || '');
            }
          });
          return isMatching;
        });
      } else {
        this.filteredData = this.matTableData.filter((obj) => {
          let isMatching = false;
          for (let i = 1; i < this.columnsToDisplay.length; i++) {
            if (obj[this.columnsToDisplay[i]]) {
              isMatching =
                isMatching ||
                obj[this.columnsToDisplay[i]]
                  .toString()
                  .toLocaleLowerCase()
                  .includes(searchWordInLower);
            }
          }
          return isMatching;
        });
      }

      if (this.filteredData && this.filteredData.length > 0) {
        if (this.filteredData.length > this.pageSize) {
          const currentPage = this.pageNumber * this.pageSize;
          this.dataSource.data = [...this.filteredData].slice(
            currentPage,
            currentPage + this.pageSize
          );
          this.paginationData.totalItemCount = this.filteredData.length;
        } else {
          this.dataSource.data = [...this.filteredData];
          this.paginationData.totalItemCount = this.filteredData.length;
        }
      } else {
        this.dataSource.data = [];
        this.paginationData.totalItemCount = 0;
      }

      // this.dataSource.filter = searchWord
      //   ? searchWord.trim().toLowerCase()
      //   : "";
    }
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

  checkCol(col): boolean {
    const temp = this.columnsToDisplay.find((x) => x === col);
    if (temp && temp.length > 0) {
      return true;
    }
    return false;
  }

  resetLookup() {
    this.resetFilter();
    this.paginationData.pageNumber = 0;
    this.paginationData.pageSize = this.pageSize;
    this.dataSource.filter = '';
  }

  emitData(element): void {
    this.resetLookup();
    this.lookUpValue.emit(element);
  }

  resetFilter() {
    if (this.lookUpObject.isDynamicHttpParams) {
      this.dynamicSearchParamMap = new Map<string, string>();
      this.searchInputFields.map((inputField) => {
        inputField.nativeElement.value = '';
      });
    } else {
      this.searchBar.reset();
    }
    this.search('');
    this.filteredData = [];
  }

  submitSelectedRows(key) {
    this.resetLookup();
    this.lookUpValue.emit(this.selection.selected);
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  private get icons(): Array<string> {
    return [
      'next-table',
      'prev-table',
      'done-icon',
      'close-white-icon',
      'filter-icon',
      'soc-icon',
      'plus-white',
      'open-table-icon',
      'copy-icon',
      'print-icon',
      'download-icon',
      'delete-button',
      'info-icon',
      'piker-icon',
      'data-icon-white',
      'delete-grey',
      'time-icon',
    ];
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
