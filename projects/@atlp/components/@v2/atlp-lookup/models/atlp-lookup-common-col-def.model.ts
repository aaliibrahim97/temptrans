export class AtlpCommonColumnDefinition {
  columnDef: string;
  header: string;
  cell: any;
  extraClass?: string = "";
  constructor(
    _columnDef: string,
    _header: string,
    _cell: any,
    _extraClass: string
  ) {
    this.columnDef = _columnDef;
    this.header = _header;
    this.cell = _cell;
    this.extraClass = _extraClass;
  }
}
