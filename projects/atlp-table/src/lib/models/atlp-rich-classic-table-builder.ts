import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { atlpRichClassicTableCreateColumnListenerByBreakpoints } from './atlp-rich-classic-table-breakpoint-builder';
import {
  AtlpRichClassicTableColumnCustomDefinition,
  AtlpRichClassicTableColumnModeDefinition,
} from './atlp-table-constructor/atlp-rich-classic-table-column-custom-definitions';
import { AtlpRichClassicTable } from './atlp-table-constructor/atlp-rich-classic-table';
import { AtlpRichClassicTableCustom } from './atlp-table-constructor/atlp-rich-classic-table-custom';
import { AtlpRichClassicTableModeSelection } from './atlp-table-constructor/atlp-rich-classic-table-mode-selection';
import { AtlpRichClassicTableModeSelectionDrag } from './atlp-table-constructor/atlp-rich-classic-table-mode-selection-drag';
import { AtlpRichClassicTableSelection } from './atlp-table-constructor/atlp-rich-classic-table-selection';
import { AtlpRichClassicTableMode } from './atlp-rich-classic-table-enum';
import { AtlpRichClassicTableBreakpointListener } from './atlp-rich-classic-table-breakpoint.model';

/** Extends MatTableDataSource */
export class AtlpRichClassicTableData<T = any> extends MatTableDataSource<T> {}

export function atlpRichClassicTableAddColumnsListener<T>(
  table: AtlpRichClassicTable<T>,
  breakpointsListener: AtlpRichClassicTableBreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribe: Subject<never>
): BehaviorSubject<string[]> {
  return atlpRichClassicTableCreateColumnListenerByBreakpoints(
    breakpointsListener,
    breakpointObserver,
    table.allColumns,
    unsubscribe
  ).columnsDisplay$;
}

export function atlpRichClassicTableAddColumnsListenerTableMode<T>(
  table: AtlpRichClassicTableModeSelection<T>,
  breakpointsListener: AtlpRichClassicTableBreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribeMode$: Subject<never>,
  unsubscribeListenerColumns$: Subject<never>
): void {
  const listen = () =>
    atlpRichClassicTableAddColumnsListener(
      table,
      breakpointsListener,
      breakpointObserver,
      unsubscribeListenerColumns$
    )
      .pipe(takeUntil(unsubscribeListenerColumns$))
      .subscribe((columns) => (table.columnsShowDisplay = columns));

  listen();

  table.modeChanged$.pipe(takeUntil(unsubscribeMode$)).subscribe(() => {
    unsubscribeListenerColumns$.next();
    listen();
  });
}

export function atlpRichClassicTableAddColumnsListenerTableModeDrag<T>(
  table: AtlpRichClassicTableModeSelectionDrag<T>,
  breakpointsListener: AtlpRichClassicTableBreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribeMode$: Subject<never>,
  unsubscribeListenerColumns$: Subject<never>
): void {
  const listen = () =>
    atlpRichClassicTableAddColumnsListener(
      table,
      breakpointsListener,
      breakpointObserver,
      unsubscribeListenerColumns$
    )
      .pipe(takeUntil(unsubscribeListenerColumns$))
      .subscribe((columns) => (table.columnsShowDisplay = columns));

  listen();

  table.modeChanged$.pipe(takeUntil(unsubscribeMode$)).subscribe(() => {
    unsubscribeListenerColumns$.next();
    listen();
  });
}

// -----------------------------------------------------------------------------------------------------
// @ Create Table
// -----------------------------------------------------------------------------------------------------

/**
 *
 * @param data - T[]
 * @param columnDefinition - ColumnCustomDefinition[]
 * @param mode - TableMode
 * @returns TableModeSelectionDrag
 */
export function atlpRichClassicTableCreateTableModeSelectionDrag<T>(
  data: MatTableDataSource<T>,
  columnDefinition: AtlpRichClassicTableColumnModeDefinition[],
  mode: AtlpRichClassicTableMode
): AtlpRichClassicTableModeSelectionDrag<T> {
  return new AtlpRichClassicTableModeSelectionDrag<T>(data, columnDefinition, mode);
}

/**
 * Creates a table using a SelectionModel and selecting a data view
 * @param data - T[]
 * @param columnDefinition - ColumnCustomDefinition[]
 * @param mode - TableMode
 * @returns TableModeSelection
 */
export function atlpRichClassicTableCreateTableModeSelection<T>(
  data: MatTableDataSource<T>,
  columnDefinition: AtlpRichClassicTableColumnModeDefinition[],
  mode: AtlpRichClassicTableMode
): AtlpRichClassicTableModeSelection<T> {
  return new AtlpRichClassicTableModeSelection<T>(data, columnDefinition, mode);
}

/**
 * Creates a table using SelectionModel
 * @param data - T[]
 * @param columnDefinition -  ColumnCustomDefinition[]
 * @returns TableSelection
 */
export function atlpRichClassicTableCreateTableSelection<T>(
  data: MatTableDataSource<T>,
  columnDefinition: AtlpRichClassicTableColumnCustomDefinition[]
): AtlpRichClassicTableSelection<T> {
  return new AtlpRichClassicTableSelection<T>(data, columnDefinition);
}

/**
 * Creates a table based on input parameters
 * Table Custom creates an abstraction of rows and cells
 * @param data - T[]
 * @param columnDefinition -  ColumnCustomDefinition[]
 * @returns TableCustom
 */
export function atlpRichClassicTableCreateTableCustom<T>(
  data: MatTableDataSource<T>,
  columnDefinition: AtlpRichClassicTableColumnCustomDefinition[]
): AtlpRichClassicTableCustom<T> {
  return new AtlpRichClassicTableCustom<T>(data, columnDefinition);
}

/**
 * Creates a table based on input parameters
 * @param data - T[]
 * @param columnDefinition - ColumnCustomDefinition[]
 * @returns Table
 */
export function atlpRichClassicTableCreateTable<T>(
  data: MatTableDataSource<T>,
  columnDefinition: AtlpRichClassicTableColumnCustomDefinition[]
): AtlpRichClassicTable<T> {
  return new AtlpRichClassicTable<T>(data, columnDefinition);
}
