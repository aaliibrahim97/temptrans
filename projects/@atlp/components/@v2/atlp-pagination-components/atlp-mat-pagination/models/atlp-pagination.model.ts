export interface AtlpPaginationModel {
  PageNumber: number;
  PageSize: number;
}

export interface IAtlpMatPaginationInputModel {
  pageSize: number;
  pageNumber: number;
  totalItemCount: number;
  itemperpageList?: Array<number>;
}
