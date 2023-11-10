import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createColumnListenerByBreakpoints } from './breakpoint-builder';
import { BreakpointListener } from './breakpoint.model';
import {
  ColumnCustomDefinition,
  ColumnModeDefinition,
} from './table-constructor/column-custom-definitions';
import { Table } from './table-constructor/table';
import { TableCustom } from './table-constructor/table-custom';
import { TableModeSelection } from './table-constructor/table-mode-selection';
import { TableModeSelectionDrag } from './table-constructor/table-mode-selection-drag';
import { TableSelection } from './table-constructor/table-selection';
import { TableMode } from './table-enum';

/** Extends MatTableDataSource */
export class Data<T = any> extends MatTableDataSource<T> {}

// -----------------------------------------------------------------------------------------------------
// @ Create listener column
// -----------------------------------------------------------------------------------------------------

/**
 * Adds a listener for the columns, how much to show at certain resolutions
 * @param table - Table
 * @param breakpointsListener - BreakpointListener[]
 * @param breakpointObserver - BreakpointObserver
 * @param unsubscribe - Subject<never>
 * @returns - BehaviorSubject<string[]>
 */
export function addColumnsListener<T>(
  table: Table<T>,
  breakpointsListener: BreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribe: Subject<never>
): BehaviorSubject<string[]> {
  return createColumnListenerByBreakpoints(
    breakpointsListener,
    breakpointObserver,
    table.allColumns,
    unsubscribe
  ).columnsDisplay$;
}

/**
 * @param table - TableModeSelection
 * @param breakpointsListener - BreakpointListener[]
 * @param breakpointObserver - BreakpointObserver
 * @param unsubscribeMode$ - Subject<never>
 * @param unsubscribeListenerColumns$ - Subject<never>
 */
export function addColumnsListenerTableMode<T>(
  table: TableModeSelection<T>,
  breakpointsListener: BreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribeMode$: Subject<never>,
  unsubscribeListenerColumns$: Subject<never>
): void {
  const listen = () =>
    addColumnsListener(
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

export function addColumnsListenerTableModeDrag<T>(
  table: TableModeSelectionDrag<T>,
  breakpointsListener: BreakpointListener[],
  breakpointObserver: BreakpointObserver,
  unsubscribeMode$: Subject<never>,
  unsubscribeListenerColumns$: Subject<never>
): void {
  const listen = () =>
    addColumnsListener(
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
export function createTableModeSelectionDrag<T>(
  data: MatTableDataSource<T>,
  columnDefinition: ColumnModeDefinition[],
  mode: TableMode
): TableModeSelectionDrag<T> {
  return new TableModeSelectionDrag<T>(data, columnDefinition, mode);
}

/**
 * Creates a table using a SelectionModel and selecting a data view
 * @param data - T[]
 * @param columnDefinition - ColumnCustomDefinition[]
 * @param mode - TableMode
 * @returns TableModeSelection
 */
export function createTableModeSelection<T>(
  data: MatTableDataSource<T>,
  columnDefinition: ColumnModeDefinition[],
  mode: TableMode
): TableModeSelection<T> {
  return new TableModeSelection<T>(data, columnDefinition, mode);
}

/**
 * Creates a table using SelectionModel
 * @param data - T[]
 * @param columnDefinition -  ColumnCustomDefinition[]
 * @returns TableSelection
 */
export function createTableSelection<T>(
  data: MatTableDataSource<T>,
  columnDefinition: ColumnCustomDefinition[]
): TableSelection<T> {
  return new TableSelection<T>(data, columnDefinition);
}

/**
 * Creates a table based on input parameters
 * Table Custom creates an abstraction of rows and cells
 * @param data - T[]
 * @param columnDefinition -  ColumnCustomDefinition[]
 * @returns TableCustom
 */
export function createTableCustom<T>(
  data: MatTableDataSource<T>,
  columnDefinition: ColumnCustomDefinition[]
): TableCustom<T> {
  return new TableCustom<T>(data, columnDefinition);
}

/**
 * Creates a table based on input parameters
 * @param data - T[]
 * @param columnDefinition - ColumnCustomDefinition[]
 * @returns Table
 */
export function createTable<T>(
  data: MatTableDataSource<T>,
  columnDefinition: ColumnCustomDefinition[]
): Table<T> {
  return new Table<T>(data, columnDefinition);
}
