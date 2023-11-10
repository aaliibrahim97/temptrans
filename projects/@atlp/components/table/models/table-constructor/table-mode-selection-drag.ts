import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ActionDropColumn, TableMode } from '../table-enum';
import { ColumnModeDefinition } from './column-custom-definitions';
import { TableModeSelection } from './table-mode-selection';

export class TableModeSelectionDrag<T = any> extends TableModeSelection<T> {
  modeCustomize$ = new BehaviorSubject<boolean>(false);

  hideColumns: { [key: string]: string[] } = {};

  get hideColumnsInMode(): string[] {
    return this.hideColumns && this.hideColumns[this.tableMode]
      ? this.hideColumns[this.tableMode]
      : [];
  }

  set customize(value: boolean) {
    this.modeCustomize$.next(value);
  }

  get customize(): boolean {
    return this.modeCustomize$.value;
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
    super(data, columnDefs, mode);
    this.columnDefs = columnDefs;
    this.tableMode$.next(mode);
    this.buildColumns();
  }

  /** Toggle modeCustomize  */
  toggleModeCustomize(): void {
    this.customize = !this.customize;
  }

  drop(event: CdkDragDrop<string[]>, action: ActionDropColumn): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      action === ActionDropColumn.hide
        ? this._hideColumnsWidthTableMode(event.container.data)
        : this._hideColumnsWidthTableMode(event.previousContainer.data);
    }
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
          return (
            col.columnShowInMode.includes(this.tableMode) &&
            !this.hideColumnsInMode.includes(col.columnDef)
          );
        } else {
          return (
            !this.hideColumnsInMode.includes(col.columnDef) &&
            (col.columnShowInMode === this.tableMode ||
              col.columnShowInMode === 'all')
          );
        }
      })
      .map((col: ColumnModeDefinition) => col.columnDef);

    this.allColumns = columns;
    this.columnsShowDisplay = columns;
  }

  private _hideColumnsWidthTableMode(hideColumn: string[]): void {
    this.hideColumns[this.tableMode] = hideColumn;
  }
}
