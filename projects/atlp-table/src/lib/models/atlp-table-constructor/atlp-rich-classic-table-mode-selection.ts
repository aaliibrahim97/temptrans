import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { AtlpRichClassicTableMode } from '../atlp-rich-classic-table-enum';
import { AtlpRichClassicTableColumnModeDefinition } from './atlp-rich-classic-table-column-custom-definitions';
import { AtlpRichClassicTableSelection } from './atlp-rich-classic-table-selection';

/**
 * Constructor to create a table using SelectionModel and data view selection
 */
export class AtlpRichClassicTableModeSelection<
  T = any
> extends AtlpRichClassicTableSelection<T> {
  /** Column mode definition */
  columnDefs: AtlpRichClassicTableColumnModeDefinition[] = [];

  /** BehaviorSubject data presentation mode */
  tableMode$ = new BehaviorSubject<AtlpRichClassicTableMode>(
    AtlpRichClassicTableMode.rich
  );

  /** Indicator that changed mode */
  modeChanged$ = new Subject<never>();

  /** Data mode */
  get tableMode(): AtlpRichClassicTableMode {
    return this.tableMode$ && this.tableMode$.value;
  }

  /** True if tableMode === 'rich' */
  get modeIsRich(): boolean {
    return this.tableMode === AtlpRichClassicTableMode.rich;
  }

  /** True if tableMode === 'collapse' */
  get modeIsCollapse(): boolean {
    return this.tableMode === AtlpRichClassicTableMode.collapse;
  }

  /** True if tableMode === 'rolled' */
  get modeIsRolled(): boolean {
    return this.tableMode === AtlpRichClassicTableMode.rolled;
  }
  /**
   * @param data - T = any
   * @param columnDefs - ColumnDefinition[]
   * @param mode - TableMode
   */
  constructor(
    data: MatTableDataSource<T>,
    columnDefs: AtlpRichClassicTableColumnModeDefinition[],
    mode: AtlpRichClassicTableMode
  ) {
    super(data, columnDefs);
    this.columnDefs = columnDefs;
    this.tableMode$.next(mode);
    this.buildColumns();
  }

  /** Change the presentation of data */
  changeTableMode(mode: AtlpRichClassicTableMode): void {
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
      .filter((col: AtlpRichClassicTableColumnModeDefinition) => {
        if (Array.isArray(col.columnShowInMode)) {
          return col.columnShowInMode.includes(this.tableMode);
        } else {
          return (
            col.columnShowInMode === this.tableMode ||
            col.columnShowInMode === 'all'
          );
        }
      })
      .map((col: AtlpRichClassicTableColumnModeDefinition) => col.columnDef);

    this.allColumns = columns;
    this.columnsShowDisplay = columns;
  }
}
