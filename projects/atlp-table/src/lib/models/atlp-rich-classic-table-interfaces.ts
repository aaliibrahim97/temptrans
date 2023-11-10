export interface AtlpRichClassicTableEmitElTable<T = any> {
  col?: T;
  data: T;
  htmlEl: HTMLElement;
  event?: any;
  rowData?: any;
}

export interface AtlpRichClassicTableEmitElInfoTable<T = any> {
  col?: T;
  data: T;
  htmlEl: HTMLElement;
  event?: any;
  index: number;
  isSelected: boolean;
}
