import { CellTemplate, ColumnTemplate, TableMode } from '../table-enum';

export interface ColumnCustomDefinition<T = any> {
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
export interface ColumnModeDefinition<T = any>
  extends ColumnCustomDefinition<T> {
  /** Column that is displayed on a specific tablemode */
  columnShowInMode: TableMode | TableMode[] | 'all';

  rowNavigation?: boolean;

  /* Cell clicked boolean */
  cellClicked?: boolean;

  dragDisabled?: boolean;

  previewClass?: string;
}
