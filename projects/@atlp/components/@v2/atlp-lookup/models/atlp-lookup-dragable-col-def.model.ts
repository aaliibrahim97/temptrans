import {
  CellTemplate,
  ColumnTemplate,
  TableMode,
} from "projects/@atlp/components/table/models/table-enum";

export interface AtlpDragableColumnCustomDefinition<T = any> {
  /** Column name */
  columnDef: string;
  /** Header */
  header: string;
  /** Cell */
  cell: (element: T) => any;
  /** Column template */
  columnTemplate?: ColumnTemplate;
  /** Cell tempelate  */
  cellTemplate?: CellTemplate;
  /** extraClass */
  extraClass?: string;
  /** disable sorting */
  matSortHeader?: boolean;
}

/** Use for a table TableModeSelection */
export interface AtlpDragableColumnModeDefinition<T = any>
  extends AtlpDragableColumnCustomDefinition<T> {
  /** Column that is displayed on a specific tablemode */
  columnShowInMode: TableMode | TableMode[] | "all";

  rowNavigation?: boolean;

  /* Cell clicked boolean */
  cellClicked?: boolean;

  dragDisabled?: boolean;

  previewClass?: string;
}
