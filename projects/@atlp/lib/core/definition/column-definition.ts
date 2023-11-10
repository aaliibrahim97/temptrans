export class ColumnDefinition {
  columnDef: string;
  header: string;
  cell: any;
  constructor(
    _columnDef: string,
    _header: string,
    _cell: any
  ) {
    this.columnDef = _columnDef;
    this.header = _header;
    this.cell = _cell;
  }
}
