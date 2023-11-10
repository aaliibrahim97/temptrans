import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { TableMode } from '../table-enum';
import { ColumnModeDefinition } from './column-custom-definitions';
import { TableSelection } from './table-selection';

/**
 * Constructor to create a table using SelectionModel and data view selection
 */
export class TableModeSelection<T = any> extends TableSelection<T> {
  /** Column mode definition */
  columnDefs: ColumnModeDefinition[] = [];

  /** BehaviorSubject data presentation mode */
  tableMode$ = new BehaviorSubject<TableMode>(TableMode.rich);

  /** Indicator that changed mode */
  modeChanged$ = new Subject<never>();

  /** Data mode */
  get tableMode(): TableMode {
    return this.tableMode$ && this.tableMode$.value;
  }

  /** True if tableMode === 'rich' */
  get modeIsRich(): boolean {
    return this.tableMode === TableMode.rich;
  }

  /** True if tableMode === 'collapse' */
  get modeIsCollapse(): boolean {
    return this.tableMode === TableMode.collapse;
  }

  /** True if tableMode === 'rolled' */
  get modeIsRolled(): boolean {
    return this.tableMode === TableMode.rolled;
  }
  /**
   * @param data - T = any
   * @param columnDefs - ColumnDefinition[]
   * @param mode - TableMode
   */
  constructor(
    data: MatTableDataSource<T>,
    columnDefs: ColumnModeDefinition[],
    mode: TableMode
  ) {
    super(data, columnDefs);
    this.columnDefs = columnDefs;
    this.tableMode$.next(mode);
    this.buildColumns();
  }

  /** Change the presentation of data */
  changeTableMode(mode: TableMode): void {
    if (this.tableMode$.value === mode) {
      return null;
    }
    this.tableMode$.next(mode);
    this.buildColumns();
    this.modeChanged$.next();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Builder method
  // -----------------------------------------------------------------------------------------------------

  protected buildColumns(): void {
    super.buildColumns();

    if (!this.tableMode) {
      return;
    }

    const columns = this.columnDefs
      .filter((col: ColumnModeDefinition) => {
        if (Array.isArray(col.columnShowInMode)) {
          return col.columnShowInMode.includes(this.tableMode);
        } else {
          return (
            col.columnShowInMode === this.tableMode ||
            col.columnShowInMode === 'all'
          );
        }
      })
      .map((col: ColumnModeDefinition) => col.columnDef);

    this.allColumns = columns;
    this.columnsShowDisplay = columns;
  }
}
