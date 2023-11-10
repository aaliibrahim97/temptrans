import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TableModeSelectionDrag } from '../../models/table-constructor/table-mode-selection-drag';
import {
  ActionDropColumn,
  CellTemplate,
  ColumnTemplate,
} from '../../models/table-enum';
import { EmitElTable } from '../../models/table-interfaces';
import { AtlpTableService } from '../../models/table.service';
import { MatSort, Sort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'atlp-table-mode',
  templateUrl: './table-mode.component.html',
  styleUrls: ['./table-mode.component.scss'],
})
export class AtlpTableModeComponent implements OnInit, AfterViewInit {
  /** MatPaginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* Mat sort table */
  @ViewChild(MatSort) sort: MatSort;

  /** Table */
  @Input() table: TableModeSelectionDrag;

  /** Table name */
  @Input() name = '';

  /* On click enable row */
  @Input() clickedRow = false;

  /** Row click event */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClickedRow = new EventEmitter<EmitElTable>();

  /** Cell click event */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClickedCell = new EventEmitter<EmitElTable>();

  /** Available templates speakers */
  columnTemplate = ColumnTemplate;

  /** Available templates of cells */
  cellTemplate = CellTemplate;

  actionDropColumn = ActionDropColumn;

  constructor(
    public atlpTableService: AtlpTableService,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngAfterViewInit(): void {
    /** Add paginator */
    this.table.dataSource.paginator = this.paginator;
    /* sort */
    this.table.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // Registering a table in service
    this.atlpTableService.register(this.name, this.table);
  }

  /* Sort name of voyages */
  public changeSort(event: Event) {
    this.table.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': {
          return item.info.title;
        }
        default:
          return item[property];
      }
    };
  }

  ngAfterContentInit() {
    setInterval(() => {
      this.table.dataSource.data.forEach((elem) => {
        if (elem?.info?.new) {
          elem.info.new = false;
        }
      });
    }, 10000);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public method
  // -----------------------------------------------------------------------------------------------------

  emitClickedRow(rowData: any, { target }: any): void {
    const row: EmitElTable = {
      data: rowData,
      htmlEl: target.closest('.mat-row'),
    };

    this.onClickedRow.emit(row);
  }

  emitClickedCell(cellData: any, { target }: any): void {
    const cell: EmitElTable = {
      data: cellData,
      htmlEl: target.closest('.mat-cell'),
    };

    this.onClickedCell.emit(cell);
  }

  getVoyagesQuantity(): number {
    return this.table.dataSource.filteredData.length;
  }

  /** Indexing for *ngFor */
  trackByFn(index: number): number {
    return index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Methods for verifying the implementation of the condition
  // -----------------------------------------------------------------------------------------------------

  isCellClicked(
    { cellClicked }: any,
    cellData: any,
    event: { preventDefault?: any; target?: any }
  ): void {
    cellClicked
      ? this.emitClickedCell(cellData, event)
      : event.preventDefault();
  }

  isRowClicked(row: any, event: { preventDefault?: any; target?: any }): void {
    //console.log(row);
    this.clickedRow ? this.emitClickedRow(row, event) : event.preventDefault();
  }

  isRowSelected(table: TableModeSelectionDrag, row): boolean {
    return !table.modeIsRich && table.selection.isSelected(row);
  }

  isShowControls(table: TableModeSelectionDrag, row): boolean {
    return (
      !table.modeIsRich &&
      table.selection.isSelected(row) &&
      table.selection.selected.length === 1
    );
  }

  isMatSortAvailable(matSortHeader: boolean): boolean {
    return !this.table.customize || !matSortHeader;
  }

  /** Check that you need to select only the disclaim letters */
  firstLetterNameColStatus(name: ColumnTemplate): boolean {
    return (
      this.table &&
      !this.table.modeIsRich &&
      !this.table.modeIsCollapse &&
      name === ColumnTemplate.status
    );
  }

  private get icons(): Array<string> {
    return ['sort-ascending-fill'];
  }
}
