import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { sortBy, orderBy } from 'lodash';
import * as _ from 'lodash';
import { Sort, SortDirection } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import { AtlpPaginationModel } from '../../../atlp-pagination-components/atlp-mat-pagination/models/atlp-pagination.model';
import { tableSymbol } from '../../decorators/atlp-view-table-column-decorator';
import { AtlpViewTableColumnModel } from '../../models/atlp-view-table-column.model';
import {
  AtlpViewTablePaginationModel,
  AtlpViewTablePaginationDefault,
} from '../../models/atlp-view-table-pagination.model';
import { AtlpViewTableModel } from '../../models/atlp-view-table.model';

@Component({
  selector: 'atlp-view-table',
  templateUrl: './atlp-view-table.component.html',
  styleUrls: ['./atlp-view-table.component.scss'],
})
export class AtlpViewTableComponent {
  private _data: any[] = [];
  private _unfilteredData: any[] = [];
  private _originalData: any[] = [];
  private _tableModel: AtlpViewTableModel;
  selection = new SelectionModel<any>(true, []);
  @Output() onSelectRows = new EventEmitter();
  pageNumber: number = 0;
  @Input() paginationData: AtlpViewTablePaginationModel = {
    ...AtlpViewTablePaginationDefault,
  };
  pageSize = 5;
  keyField: string;
  selectedRows: any[] = [];
  @Input() isSingleSelection: boolean;
  @Input() set setSelectedRows(data: any[]) {
    this.selectedRows = data || [];
    this.markSelectedRows(this._unfilteredData);
  }

  @Input() set data(values: any[]) {
    if (values && values.length > 0) {
      this.setColumPropsAndData(values);
      this.markSelectedRows(this._unfilteredData);
    }
  }
  columns: AtlpViewTableColumnModel[];
  displayedColumns: string[];
  dynamicSearchParamMap: Map<string, string> = new Map<string, string>();
  @ViewChildren('searchInputFields')
  searchInputFields: QueryList<ElementRef>;
  @Input() isViewMode: boolean = false;

  constructor() {}

  private setColumPropsAndData(values: any[]) {
    this._unfilteredData = _.cloneDeep(values);
    this._tableModel = this._unfilteredData[0][tableSymbol];
    this.buildColumns();
    this.setKeyField();
    const currentPage = this.pageNumber * this.pageSize;
    this._data = [...this._unfilteredData].slice(
      currentPage,
      currentPage + this.pageSize
    );
    this.paginationData.totalItemCount = this._unfilteredData.length;

    if (!this._originalData.length) {
      // Keep original order of data
      this._originalData = _.cloneDeep(this._data);
    }
  }

  get data(): any[] {
    // this.markSelectedRows(this._data);
    return this._data;
  }

  setKeyField() {
    this._tableModel.columns.forEach((column) => {
      if (column.keyField) {
        this.keyField = column.key;
      }
    });
  }

  markSelectedRows(data) {
    if (this.selectedRows && this.selectedRows.length > 0 && data.length > 0) {
      if (this.isSingleSelection) {
        data.forEach((item) => {
          const selectedRow = this.selectedRows.find((selectedRowItem) => {
            let searchItem = selectedRowItem;
            if (AtlpCheckHelper.isObject(selectedRowItem)) {
              searchItem = searchItem[this.keyField];
            }
            if (AtlpCheckHelper.isArray(selectedRowItem)) {
              searchItem = searchItem[0][this.keyField];
            }
            return item[this.keyField] == searchItem;
          });
          if (selectedRow) {
            item.selected = true;
          }
        });
      } else {
        data.forEach((item) => {
          const selectedRow = this.selectedRows.find((selectedRowItem) => {
            let searchItem = selectedRowItem;
            if (AtlpCheckHelper.isObject(selectedRowItem)) {
              searchItem = searchItem[this.keyField];
            }
            if (AtlpCheckHelper.isArray(selectedRowItem)) {
              searchItem = searchItem[0][this.keyField];
            }
            return item[this.keyField] == searchItem;
          });
          if (selectedRow) {
            this.selection.select(item);
          }
        });
      }
    }
  }

  sortData(params: Sort) {
    const direction: SortDirection = params.direction;
    this.data = direction
      ? orderBy(this.data, [params.active], [direction])
      : this._originalData;
  }

  private buildColumns() {
    this.columns = this._tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns
      .filter((column) => !column.isNotVisible)
      .map((col) => col.key);
  }

  private sortColumns() {
    this.columns = sortBy(this.columns, ['order']);
  }

  get allSelected(): boolean {
    return this.selection.selected.length === this._data.length;
  }

  toggleMasterSelection() {
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this._data);
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.allSelected ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  selectSingleRow(elem) {
    this.selectedRows = [elem[this.keyField]];
    this.onSelectRows.emit(elem);
  }

  emitSelectedRows() {
    const selectedRows = this.selection.selected;
    this.onSelectRows.emit(selectedRows);
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

    const currentPage = this.pageNumber * this.pageSize;
    this._data = [...this._unfilteredData].slice(
      currentPage,
      currentPage + this.pageSize
    );
  }

  columnSpecificSearch($event, columnObj) {
    const columnToSearch = columnObj.key;
    const searchWord = $event.target.value;
    if (searchWord) {
      this.dynamicSearchParamMap.set(columnToSearch, searchWord);
    } else {
      this.dynamicSearchParamMap.delete(columnToSearch);
    }
    this.pageNumber = 0;
    this.paginationData.pageNumber = 0;
    if (this.dynamicSearchParamMap.size == 0) {
      this._data = [...this._unfilteredData].slice(
        this.pageNumber,
        this.pageSize
      );
    }
    this.search();
    this.markSelectedRows(this._data);
  }

  search(): void {
    this.pageNumber = 0;
    this.paginationData.pageNumber = 0;
    let filteredData = [];

    filteredData = this._unfilteredData.filter((obj) => {
      let isMatching = true;
      this.dynamicSearchParamMap.forEach((value, key, map) => {
        if (obj[key] && value) {
          isMatching =
            isMatching &&
            obj[key]
              .toString()
              .toLocaleLowerCase()
              .includes(value?.toLocaleLowerCase() || '');
        } else {
          isMatching = false;
        }
      });
      return isMatching;
    });

    if (filteredData && filteredData.length > 0) {
      if (filteredData.length > this.pageSize) {
        const currentPage = this.pageNumber * this.pageSize;
        this._data = [...filteredData].slice(
          currentPage,
          currentPage + this.pageSize
        );
        this.paginationData.totalItemCount = filteredData.length;
      } else {
        this._data = [...filteredData];
        this.paginationData.totalItemCount = filteredData.length;
      }
    } else {
      this._data = [];
      this.paginationData.totalItemCount = 0;
    }
  }

  resetFilter() {
    this.dynamicSearchParamMap = new Map<string, string>();
    this.searchInputFields.map((inputField) => {
      inputField.nativeElement.value = '';
    });
  }
}
