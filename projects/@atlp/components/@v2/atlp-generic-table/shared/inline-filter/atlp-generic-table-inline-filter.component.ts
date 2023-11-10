import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { ATLP_GENERIC_TABLE_TOKEN_DATA } from '../../model/atlp-generic-table.token.injector';
import { IAtlpGenericTableFilterLookupService } from '../../model/atlp-generic-table-lookup.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'atlp-generic-table-inline-filter',
  templateUrl: './atlp-generic-table-inline-filter.component.html',
  styleUrls: ['./atlp-generic-table-inline-filter.component.scss'],
})
export class AtlpGenericTableInlineFilter implements OnInit {
  @Output() onMenuFilterChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSort: EventEmitter<any> = new EventEmitter<any>();

  inlineFilterService: IAtlpGenericTableFilterLookupService;
  @Input() column = null;
  @Input() filterSourceData = [];
  @Input() _columnFilter = null;
  @Input() selectedLang = 'en';

  columnFilter = {
    sourceFilterDataList: {},
    filterDataList: [],
  };

  commonFilterData = {
    selectedFilterItems: [],
    selectedFilterValues: [],
    tempSelectedItems: [],
    filterPayload: null,
    lastfiltereditem: null,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    public router: Router,
    private _iconsService: IconsService,
    @Inject(ATLP_GENERIC_TABLE_TOKEN_DATA) public data
  ) {
    this.column = data.fiterData.column;
    this.filterSourceData = data.fiterData.filterSourceData;
    this.inlineFilterService = data.fiterData.inlineFilterService;
    this.columnFilter = data.fiterData.columnFilter;
    this.commonFilterData = data.fiterData.commonFilterData;
    this.selectedLang = data.fiterData.selectedLang;

    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    if (this.columnFilter.filterDataList?.length == 0) {
      this.getLookupData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.filterSourceData &&
      changes.filterSourceData.previousValue !=
        changes.filterSourceData.currentValue
    ) {
      this.updateData(this.column, this.filterSourceData);
    }
  }

  getLookupData() {
    let params = new HttpParams();
    params = params.set('isMasterData', this.column.isMasterData);
    params = params.set('colDef', this.column.columnDef);

    this.inlineFilterService.fetch(params).then((result: any) => {
      this.columnFilter.filterDataList = result.Data;
      this.columnFilter.sourceFilterDataList = _.cloneDeep(result.Data);
      console.log(result);
    });
  }

  public setFilter(column) {
    this.column = column;
    this.filterSourceData = [];
    this.columnFilter.filterDataList = [];
  }

  public applyColumnFilter(column) {
    if (this.commonFilterData.tempSelectedItems.length > 0) {
      this.commonFilterData.tempSelectedItems.forEach((obj) => {
        _.remove(this.commonFilterData.selectedFilterItems, (item) => {
          return item.dbField == obj.dbField && item.value == obj.value;
        });
        this.commonFilterData.selectedFilterItems.push(obj);
      });
    }

    this.commonFilterData.selectedFilterValues = [];
    this.commonFilterData.selectedFilterItems.forEach((item) => {
      this.commonFilterData.selectedFilterValues.push({
        [item.dbField]: item.value,
      });
    });

    this.commonFilterData.filterPayload = {
      active: true,
    };

    if (this.commonFilterData.selectedFilterValues.length > 0) {
      this.commonFilterData.filterPayload.$or =
        this.commonFilterData.selectedFilterValues;
      // binding metaobject to the api payload
      for (var k in column.metaObject) {
        this.commonFilterData.filterPayload[k] = column.metaObject[k];
      }
    }
    this.onMenuFilterChanges.emit(this.commonFilterData.filterPayload);
  }

  public extractFilterValue(filterData: any, type = 'value'): any {
    if (_.isObject(filterData)) {
      return filterData['description']
        ? filterData['description'][this.selectedLang]
        : filterData['value'];
    } else {
      return filterData;
    }
  }

  public onCheckboxChange(event, column, filteredItem) {
    let obj = {
      value: this.extractFilterValue(filteredItem),
      dbField: column.dbField,
      columnname: column.header,
      columnDef: column.columnDef,
      colField: column.colField,
    };

    if (event.checked) {
      filteredItem.selected = true;
      this.commonFilterData.tempSelectedItems.push(obj);
      this.commonFilterData.selectedFilterItems.push(obj);
    } else {
      filteredItem.selected = false;
      _.remove(this.commonFilterData.tempSelectedItems, (item) => {
        return item.dbField == obj.dbField && item.value == obj.value;
      });

      _.remove(this.commonFilterData.selectedFilterItems, (item) => {
        return item.dbField == obj.dbField && item.value == obj.value;
      });
    }
  }

  public clearColumnFilter(column) {
    this.commonFilterData.tempSelectedItems = [];
    _.remove(this.commonFilterData.selectedFilterItems, (item) => {
      return item.dbField == column.dbField;
    });
    this.columnFilter.filterDataList.forEach((item) => {
      item.selected = false;
    });
    this.cdr.detectChanges();
    this.applyColumnFilter(column);
  }

  public onFilterSearch() {
    let value = this.column.filterSearchValue;
    this.columnFilter.filterDataList = _.filter(
      this.columnFilter.sourceFilterDataList,
      (item: any) => {
        return (
          item.code.toLowerCase().includes(value.toLowerCase()) ||
          item.nameAr.toLowerCase().includes(value.toLowerCase()) ||
          item.nameEn.toLowerCase().includes(value.toLowerCase())
        );
      }
    );
    this.columnFilter.filterDataList = this.columnFilter.filterDataList;
  }

  sortDataSource(id: string, start: any, col: any) {
    const sortData = { ColumnName: id, Order: start };
    sortData.Order == '1' ? (col.sort = 'asc') : (col.sort = 'desc');
    this.onSort.emit(sortData);
  }

  updateData(column, data) {
    if (column.isMasterData) {
      this.columnFilter.sourceFilterDataList[column.colField] = data.items;
      this.columnFilter.filterDataList =
        this.columnFilter.sourceFilterDataList[column.colField];
      this.columnFilter.filterDataList = this.columnFilter.filterDataList;
      this.cdr.detectChanges();
    } else {
      data.forEach((item) => {
        let obj = {
          value: item,
          dbField: column.dbField,
          columnname: column.header,
          columnDef: column.columnDef,
          colField: column.colField,
        };
        if (this.columnFilter.sourceFilterDataList[column.colField]) {
          this.columnFilter.sourceFilterDataList[column.colField].push(obj);
          this.columnFilter.sourceFilterDataList[column.colField] = _.uniqBy(
            this.columnFilter.sourceFilterDataList[column.colField],
            'value'
          );
        } else {
          this.columnFilter.sourceFilterDataList[column.colField] = [];
          this.columnFilter.sourceFilterDataList[column.colField].push(obj);
        }
      });
      this.columnFilter.filterDataList =
        this.columnFilter.sourceFilterDataList[column.colField];
      this.columnFilter.filterDataList = this.columnFilter.filterDataList;
    }
  }

  private get icons(): Array<string> {
    return ['sort'];
  }
}
