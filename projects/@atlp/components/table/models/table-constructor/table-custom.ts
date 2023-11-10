import { ColumnTemplate } from '../table-enum';
import { Table } from './table';

// -----------------------------------------------------------------------------------------------------
// @ Classes and interfaces for building table data
// -----------------------------------------------------------------------------------------------------

/** Column table */
export class Column {
  /** Name */
  caption: string;

  /** Dataset property */
  field: string;

  /** Column type */
  columnTemplate: ColumnTemplate;

  /** Cells */
  cells?: { [propName: string]: Cell } = {};

  constructor(caption: string, field: string, columnTemplate: ColumnTemplate) {
    this.caption = caption;
    this.field = field;
    this.columnTemplate = columnTemplate;
  }
}

/** Table cell */
export class Cell<T = any> {
  /** String id */
  rowId: string | number;

  /** Cell value */
  value?: T;

  constructor(rowId: string | number, value: T) {
    this.rowId = rowId;
    this.value = value;
  }
}

/** Table row */
export class Row {
  /** id */
  readonly id: string | number;

  /** Cells */
  cells: { [propName: string]: Cell } = {};

  constructor(id: string | number) {
    this.id = id;
  }
}

/**
 * Constructor for creating a table with the construction of Column, Cell, Row data
 */
export class TableCustom<T = any> extends Table<T> {
  /** Rows */
  rows: Row[] = [];

  /** Columns */
  columns: Column[] = [];

  // -----------------------------------------------------------------------------------------------------
  // @ Table construction methods
  // -----------------------------------------------------------------------------------------------------

  /** Building columns */
  buildColumns(): TableCustom<T> {
    const columns: Column[] = [];
    this.columnDefs.forEach((column) => {
      const { header: caption, columnDef: field, columnTemplate } = column;
      return columns.push(new Column(caption, field, columnTemplate));
    });
    this.columns = columns;

    return this;
  }

  /** Building rows */
  buildRows(): TableCustom<T> {
    const rows: Row[] = [];

    this.dataSource.data.forEach((row: T & { id: number }) => {
      const { id } = row;
      return rows.push(new Row(id));
    });

    this.rows = rows;

    return this;
  }

  /** Building cells */
  buildCells(from: 'row' | 'column' | 'all' = 'row'): TableCustom<T> {
    if (from === 'row' || from === 'all') {
      this.rows.forEach((row) => {
        this.columns.forEach((col) => {
          const cell = this._getCell(row, col);
          row.cells[col.field] = cell;
        });
      });
    }
    if (from === 'column' || from === 'all') {
      this.columns.forEach((col) => {
        this.rows.forEach((row, idx) => {
          const cell = this._getCell(row, col);
          col.cells[idx] = cell;
        });
      });
    }

    return this;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private method
  // -----------------------------------------------------------------------------------------------------

  /** Return the cell with the necessary data */
  private _getCell(row: Row, col: Column): Cell<T> {
    const findRow = this.dataSource.data.find(
      (rowDef: T & { id: number }) => rowDef.id === row.id
    );
    return new Cell<T>(row.id, findRow[col.field]);
  }
}
