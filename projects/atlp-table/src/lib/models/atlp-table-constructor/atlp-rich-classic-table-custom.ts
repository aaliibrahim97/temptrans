import { AtlpRichClassicTableColumnTemplate } from '../atlp-rich-classic-table-enum';
import { AtlpRichClassicTable } from './atlp-rich-classic-table';

// -----------------------------------------------------------------------------------------------------
// @ Classes and interfaces for building table data
// -----------------------------------------------------------------------------------------------------

/** Column table */
export class AtlpRichClassicTableColumn {
  /** Name */
  caption: string;

  /** Dataset property */
  field: string;

  /** Column type */
  columnTemplate: AtlpRichClassicTableColumnTemplate;

  /** Cells */
  cells?: { [propName: string]: AtlpRichClassicTableCell } = {};

  constructor(
    caption: string,
    field: string,
    columnTemplate: AtlpRichClassicTableColumnTemplate
  ) {
    this.caption = caption;
    this.field = field;
    this.columnTemplate = columnTemplate;
  }
}

/** Table cell */
export class AtlpRichClassicTableCell<T = any> {
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
export class AtlpRichClassicTableRow {
  /** id */
  readonly id: string | number;

  /** Cells */
  cells: { [propName: string]: AtlpRichClassicTableCell } = {};

  constructor(id: string | number) {
    this.id = id;
  }
}

/**
 * Constructor for creating a table with the construction of Column, Cell, Row data
 */
export class AtlpRichClassicTableCustom<
  T = any
> extends AtlpRichClassicTable<T> {
  /** Rows */
  rows: AtlpRichClassicTableRow[] = [];

  /** Columns */
  columns: AtlpRichClassicTableColumn[] = [];

  // -----------------------------------------------------------------------------------------------------
  // @ Table construction methods
  // -----------------------------------------------------------------------------------------------------

  /** Building columns */
  buildColumns(): AtlpRichClassicTableCustom<T> {
    const columns: AtlpRichClassicTableColumn[] = [];
    this.columnDefs.forEach((column) => {
      const { header: caption, columnDef: field, columnTemplate } = column;
      return columns.push(
        new AtlpRichClassicTableColumn(caption, field, columnTemplate)
      );
    });
    this.columns = columns;

    return this;
  }

  /** Building rows */
  buildRows(): AtlpRichClassicTableCustom<T> {
    const rows: AtlpRichClassicTableRow[] = [];

    this.dataSource.data.forEach((row: T & { id: number }) => {
      const { id } = row;
      return rows.push(new AtlpRichClassicTableRow(id));
    });

    this.rows = rows;

    return this;
  }

  /** Building cells */
  buildCells(
    from: 'row' | 'column' | 'all' = 'row'
  ): AtlpRichClassicTableCustom<T> {
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
  private _getCell(
    row: AtlpRichClassicTableRow,
    col: AtlpRichClassicTableColumn
  ): AtlpRichClassicTableCell<T> {
    const findRow = this.dataSource.data.find(
      (rowDef: T & { id: number }) => rowDef.id === row.id
    );
    return new AtlpRichClassicTableCell<T>(row.id, findRow[col.field]);
  }
}
