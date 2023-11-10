import { AtlpViewTableColumnModel } from './atlp-view-table-column.model';

export class AtlpViewTableModel {
  columns: AtlpViewTableColumnModel[] = [];

  addColumn(column: AtlpViewTableColumnModel) {
    this.columns = [...this.columns, column];
  }
}
