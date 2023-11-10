export interface IAtlpInputPaginator {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export interface IAtlpPageResponseModel {
  currentPage: number;
  pageSize: number;
}

export interface IAtlpPaginatorModel {
  currentPage: number;
  pageSize: number;
  pageStartIndex: number;
  pageEndIndex: number;
  pageIndex: number;
  totalCount: number;
}

export const atlpPaginatorModelDefaultData: IAtlpPaginatorModel = {
  currentPage: 0,
  pageSize: 10,
  pageStartIndex: 1,
  pageEndIndex: 1,
  pageIndex: 1,
  totalCount: 0,
};

export const atlpDefaultPaginatorData: IAtlpInputPaginator = {
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
};
