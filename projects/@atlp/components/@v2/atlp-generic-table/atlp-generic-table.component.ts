import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import _ from 'lodash';
import { Subject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentPortal } from '@angular/cdk/portal';
import { ATLP_GENERIC_TABLE_TOKEN_DATA } from './model/atlp-generic-table.token.injector';
import { IAtlpInlineFiltersPortalInstance } from './model/atlp-inline-filters-portal-instances';
import { IAtlpGenericTableFilterLookupService } from './model/atlp-generic-table-lookup.interface';
import {
  ATLP_INLINE_COMMON_FILTER_DATA,
  ATLP_INLINE_FILTER_DATA_COL_FILTER,
} from './model/atlp-inline-filter-data.model';
import { IAtlpGenericTableGridConfigObj } from './model/atlp-generic-table-col-def.model';
import {
  AtlpPaginationModel,
  IAtlpMatPaginationInputModel,
} from '../atlp-pagination-components/atlp-mat-pagination/models/atlp-pagination.model';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpGenericTableInlineFilter } from './shared/inline-filter/atlp-generic-table-inline-filter.component';
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationArabic } from './i18n/ae';
import { takeUntil } from 'rxjs/operators';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Component({
  selector: 'atlp-generic-table',
  templateUrl: './atlp-generic-table.component.html',
  styleUrls: ['./atlp-generic-table.component.scss'],
})
export class AtlpGenericTableComponent implements OnInit, OnDestroy {
  @ViewChild('genericInlineFilter') inlineFilter!: AtlpGenericTableInlineFilter;
  @ViewChild('table') table: MatTable<any>;

  @Input() isAddNewSectionEnabled: boolean = true;
  @Input() gridConfig: IAtlpGenericTableGridConfigObj = null;
  @Input() rowTemplate: TemplateRef<any> = null;
  @Input() headerTemplate: TemplateRef<any> = null;
  @Input() selectedLang = 'en';
  @Input() showGlobalSearch = false;
  @Input() gridDataList: any[] = [];
  @Input() set dataList(value: any[]) {
    if (value) {
      console.log('updated data list => ', value);
      this.gridDataList = value;
      this.paginationData.totalItemCount = this.gridDataList.length;
      this.updateGrid();
    }
  }
  @Input() multiSelect: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() isSelectAllEnabled: boolean = false;
  @Input() isClientSidePaginationEnabled: boolean = true;
  @Input() isAddFormRowEnable: boolean = false;
  @Input() set inlineFilterServiceSource(
    value: IAtlpGenericTableFilterLookupService | any[]
  ) {
    if (this.isInlineFilterService(value)) {
      this.inlineFilterService = value as IAtlpGenericTableFilterLookupService;
    }
  }
  @Input() set disableActions(val) {
    if (val) {
      this.disableActionsBtns = val;
    } else {
      this.disableActionsBtns = false;
    }
  }

  @Output() onSelectItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUnSelectItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPageChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMenuFilterChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDoubleClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSort: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHeaderDragStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHeaderDropped: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddNewRow: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribeAll$ = new Subject<never>();
  tableColumns = [];
  dataSource = new MatTableDataSource<any>(this.gridDataList);
  displayedColumns: string[] = _.map(this.tableColumns, 'columnDef');
  tableMetaObject = this.gridConfig?.metaData;
  showFilter = false;
  columnFilter = {
    sourceFilterDataList: {},
    filterDataList: [],
    selectedFilterItems: [],
    selectedFilterValues: [],
    tempSelectedItems: [],
    filrerDisplayValues: [],
    lastfiltereditem: null,
    filterPayload: null,
  };

  lastfilteredColumn = null;
  globalSearchedVal = null;
  subscriptions: Subscription[] = [];
  slectedItem = null;
  id: string;
  activeFilterColumn = null;
  dragEnabled = false;
  pageNumber: number = 0;
  pageSize = 5;
  paginationData: IAtlpMatPaginationInputModel = {
    pageSize: 5,
    pageNumber: 0,
    totalItemCount: 0,
    itemperpageList: [5, 10, 15],
  };
  disableActionsBtns = false;
  public selection = new SelectionModel<any>(this.multiSelect, []);
  atlpInlineFilterComponents: IAtlpInlineFiltersPortalInstance[] = [];
  selectedFilter: ComponentPortal<AtlpGenericTableInlineFilter>;
  inlineFilterService: IAtlpGenericTableFilterLookupService;
  selectedRowindex: number;
  rowToUpdate: number = -1;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _iconsService: IconsService,
    private _atlpTranslationService: AtlpTranslationService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit() {
    this._atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.selectedLang = lang;
        this._atlpTranslationService.setDefaultLanguageSettings(
          this.selectedLang,
          navigationEnglish,
          navigationArabic
        );
      });

    this.applyGridConfig();
  }

  updateGridRows(rowToUpdate: number = null) {
    if (this.isClientSidePaginationEnabled) {
      const currentPage = this.pageNumber * this.pageSize;
      this.dataSource.data = [...this.gridDataList].slice(
        currentPage,
        currentPage + this.pageSize
      );
    } else {
      this.dataSource.data = this.gridDataList.slice(
        0,
        this.paginationData.pageSize
      );
    }
    this.paginationData.totalItemCount = this.gridDataList.length;
    if (rowToUpdate != null || rowToUpdate != undefined) {
      this.rowToUpdate = rowToUpdate;
      setTimeout(() => {
        this.rowToUpdate = -1;
      }, 0);
    }
    setTimeout(() => {
      _.forEach(this.dataSource.data, (row) => {
        if (row.select) {
          this.selection.select(row);
        } else {
          this.selection.deselect(row);
        }
      });
      this.changeDetector.markForCheck();
    }, 1000);
  }

  private isInlineFilterService(
    object: any
  ): object is IAtlpGenericTableFilterLookupService {
    return object && 'fetch' in object;
  }

  private updateGrid(autoSelect = true) {
    this.paginationData.totalItemCount = this.gridDataList.length;
    this.dataSource.data = this.gridDataList.slice(
      0,
      this.paginationData.pageSize
    );
    if (autoSelect) {
      setTimeout(() => {
        _.forEach(this.dataSource.data, (row) => {
          if (row.select) {
            this.selection.select(row);
          } else {
            this.selection.deselect(row);
          }
        });
        this.changeDetector.markForCheck();
      }, 1000);
    }
  }

  public pageChange(pageModel: AtlpPaginationModel) {
    if (this.pageSize != pageModel.PageSize) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = pageModel.PageNumber;
    }
    this.pageSize = pageModel.PageSize;

    this.paginationData.pageSize = this.pageSize;
    this.paginationData.pageNumber = this.pageNumber;
    if (this.isClientSidePaginationEnabled) {
      const currentPage = this.pageNumber * this.pageSize;
      this.dataSource.data = [...this.gridDataList].slice(
        currentPage,
        currentPage + this.pageSize
      );
    }
    let pagintion = {
      pageSize: this.paginationData.pageSize,
      pageNumber: this.paginationData.pageNumber,
    };
    this.onPageChanges.emit(pagintion);
  }

  //For future implimentation
  private updateDisplayedColumns() {
    this.displayedColumns = _.map(
      _.filter(this.tableColumns, { show: true }),
      'columnDef'
    );
  }

  private applyGridConfig() {
    if (this.gridConfig) {
      this.tableColumns = this.gridConfig.tableColumns;
      this.paginationData.itemperpageList = this.gridConfig.itemPerPage;
      this.displayedColumns = _.map(
        _.filter(this.tableColumns, { show: true }),
        'columnDef'
      );
      this.paginationData.pageNumber = this.gridConfig.pageNumber;
      this.paginationData.pageSize = this.gridConfig.pageSize;
      this.dragEnabled = this.gridConfig.dragEnabled || false;
    }
  }

  getImgPath(imgName: string) {
    return 'assets/images/' + imgName;
  }

  addNewRow() {
    this.selectedRowindex = 0;
    this.onAddNewRow.emit();
  }

  public search(searchData: string) {
    this.globalSearchedVal = searchData;
  }

  public viewClick(element) {
    this.onDoubleClick.emit(element);
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelectAll.emit({
        gridid: this.gridConfig.gridId,
        selectAll: false,
        selectedList: this.selection.selected,
      });
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
      this.onSelectAll.emit({
        gridid: this.gridConfig.gridId,
        selectAll: true,
        selectedList: this.selection.selected,
      });
    }
  }

  public selectHandler(event: any, row: any) {
    this.selection.toggle(row);
    row.select = event.checked;
    if (event.checked == true) {
      this.onSelectItem.emit({
        gridid: this.gridConfig.gridId,
        selectedItem: row,
        selectedList: this.selection.selected,
      });
    } else {
      this.onUnSelectItem.emit({
        gridid: this.gridConfig.gridId,
        selectedItem: row,
        selectedList: this.selection.selected,
      });
    }
  }

  public unSelectitem(item) {
    this.slectedItem = item.selectedItem ? item?.selectedItem : item;
    this.slectedItem.select = false;
    this.selection.deselect(this.slectedItem);
    this.changeDetector.detectChanges();
  }

  public isSticky(column: any): boolean {
    return column.sticky ? true : false;
  }

  // INLINE FILTER _______________________________
  public initFilter(column) {
    const filterInstance = this.atlpInlineFilterComponents.filter(
      (c) => c.filterName == column.columnDef
    );
    if (filterInstance && filterInstance[0]) {
      this.selectedFilter = filterInstance[0].filterInstance;
      return;
    }
    this.activeFilterColumn = column;
    this.showFilter = true;
    const filterSourceData = {};
    const atlpInlineFilterComponent = this.attachFilterPortal(
      column,
      filterSourceData
    );
    this.atlpInlineFilterComponents.push({
      filterName: column.columnDef,
      filterInstance: atlpInlineFilterComponent,
    });
    this.selectedFilter = atlpInlineFilterComponent;
  }

  attachFilterPortal(column: any, filterSourceData: any) {
    const componentPortal = new ComponentPortal(
      AtlpGenericTableInlineFilter,
      null,
      this.createInjector({
        fiterData: {
          column,
          filterSourceData,
          inlineFilterService: this.inlineFilterService,
          columnFilter: _.cloneDeep(ATLP_INLINE_FILTER_DATA_COL_FILTER),
          commonFilterData: ATLP_INLINE_COMMON_FILTER_DATA,
          selectedLang: this.selectedLang,
        },
      })
    );
    return componentPortal;
  }

  recieveInlineFilterInstance(selectedFilterInstance) {
    const atlpInlineFilterComponent: AtlpGenericTableInlineFilter =
      selectedFilterInstance.instance;
    this.subscriptions.push(
      atlpInlineFilterComponent.onMenuFilterChanges.subscribe((data) => {
        this.onMenuFilterChanges.emit(data);
      })
    );
    this.subscriptions.push(
      atlpInlineFilterComponent.onSort.subscribe((data) => {
        this.onSort.emit(data);
      })
    );
  }

  private createInjector(data: any): Injector {
    return Injector.create({
      providers: [{ provide: ATLP_GENERIC_TABLE_TOKEN_DATA, useValue: data }],
    });
  }

  updateFilterData(column, gridConfig) {
    this.activeFilterColumn = column;
    this.gridConfig.filterData = gridConfig.filterData;
  }

  drop(event: CdkDragDrop<any[]>) {
    const previousIndex = this.dataSource.data.findIndex(
      (row) => row === event.item.data
    );
    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);

    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );

    moveItemInArray(this.tableColumns, event.previousIndex, event.currentIndex);

    this.table.renderRows();
    this.onHeaderDropped.emit({
      event: event,
      displayedColumns: this.displayedColumns,
      tableColumns: this.tableColumns,
    });
    this.changeDetector.detectChanges();
  }

  dragStarted(event, i, column) {
    this.onHeaderDropped.emit({ event: event, index: 1, column: column });
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
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
