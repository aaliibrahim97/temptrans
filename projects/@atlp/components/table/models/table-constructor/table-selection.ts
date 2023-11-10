import { SelectionModel } from '@angular/cdk/collections';
import { Table } from './table';

/**
 * Constructor to create a table using SelectionModel
 */
export class TableSelection<T = any> extends Table<T> {
  /** Controlling selected cells */
  selection = new SelectionModel(true, []);

  // -----------------------------------------------------------------------------------------------------
  // @ Methods for working with SelectionModel
  // -----------------------------------------------------------------------------------------------------

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const selected: number = this.selection.selected.length;
    const rows: number = this.dataSource.data.length;
    return selected === rows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T & { id: string | number }): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      +row.id + 1
    }`;
  }

  deselect(row: T): void {
    this.selection.toggle(row);
  }
}
