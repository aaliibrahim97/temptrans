export interface AtlpViewTablePaginationModel {
  pageSize: number;
  pageNumber: number;
  totalItemCount: number;
}

export const AtlpViewTablePaginationDefault = {
  pageSize: 5,
  pageNumber: 0,
  totalItemCount: 0,
};
