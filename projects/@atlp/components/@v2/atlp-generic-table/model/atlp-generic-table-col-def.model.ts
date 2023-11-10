export interface IAtlpGenericTableGridColumnDefinition<T = any> {
  columnDef: string;
  // colField: string;
  header: string;
  cell?: (element: T) => any;
  show: boolean;
  filter?: boolean;
  // filterEnabled: boolean;
  sort?: string;
  metaObject?: any;
  isDefault?: boolean;
  isCustomizable?: boolean;
  filterSearchValue?: any;
  dbField?: string;
  isMasterData?: boolean;
  width?: string;
  disabled?: boolean;
  sticky?: boolean;
  headerBg?: boolean;
  cellBg?: boolean;
  headerClassList?: string;
  classList?: string;
  textAlign?: string;
  hideColHeader?: boolean;
  columnType?: string;
  controlType?: string;
  metaData?: string;
  isRowModifyEnabled?: boolean;
}

export interface IAtlpGenericTableGridConfigObj {
  gridId: string;
  tableColumns: Array<any>;
  dataSource: Array<any>;
  multiSelect?: boolean;
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  itemPerPage: Array<number>;
  metaData?: object;
  selectedItem: object;
  selectedList: Array<any>;
  validations?: any;
  width?: string;
  height?: string;
  sortData?: any;
  filterValue?: any;
  filterData?: any;
  dragEnabled?: boolean;
}
