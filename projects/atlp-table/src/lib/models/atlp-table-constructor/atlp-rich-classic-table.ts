import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { AtlpRichClassicTableColumnCustomDefinition } from './atlp-rich-classic-table-column-custom-definitions';

/**
 * Constructor for creating tables
 */

export class AtlpRichClassicTable<T = any> {
  /** All columns in the table */
  allColumns: string[] = [];
  /** Columns displayed on the screen */
  columnsShowDisplay: string[] = [];
  /** Column definition */
  columnDefs: AtlpRichClassicTableColumnCustomDefinition[] = [];

  /** Table dataSource */
  protected _dataSource$ = new BehaviorSubject<MatTableDataSource<T>>(
    new MatTableDataSource([])
  );

  /** Get dataSource */
  get dataSource(): MatTableDataSource<T> {
    return this._dataSource$.value;
  }

  /** Set dataSource */
  set dataSource(dataSource: MatTableDataSource<T>) {
    this._dataSource$.next(dataSource);
  }

  /** Get dataSource */
  get dataSource$(): BehaviorSubject<MatTableDataSource<T>> {
    return this._dataSource$;
  }

  /**
   * @param data - T = any
   * @param columnDefs - ColumnDefinition[]
   */
  constructor(
    dataSource: MatTableDataSource<T>,
    columnDefs: AtlpRichClassicTableColumnCustomDefinition[]
  ) {
    this._dataSource$.next(dataSource);

    this.columnDefs = columnDefs;

    this.buildColumns();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Column display sorting methods
  // -----------------------------------------------------------------------------------------------------

  /** overwrites the old column with the required */
  overwriteColumns(prevColumn: string, nextColumn: string): void {
    const columns: string[] = [];
    this.columnsShowDisplay.map((column) =>
      columns.push(column === prevColumn ? (column = nextColumn) : column)
    );
    this.columnsShowDisplay = columns;
  }

  /** checks the column is displayed or not */
  isColumnShowed(checkedColumn): boolean {
    return !this.columnsShowDisplay.find(
      (currentCol) => currentCol === checkedColumn
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Builder method
  // -----------------------------------------------------------------------------------------------------

  /** build an array of columns to display the table and control the display of the number of columns */
  protected buildColumns(): void {
    const columns: string[] = this.columnDefs.map((col) => col.columnDef);
    this.allColumns = columns;
    this.columnsShowDisplay = columns;
  }
}
