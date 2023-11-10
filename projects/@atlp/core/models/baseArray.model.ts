export interface BaseResponseArray<T> {
  data: {
    data: T[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    isFirstPage: boolean,
    isLastPage: boolean,
    itemEnd: number,
    itemStart: number,
    pageCount: number,
    pageIndex: number,
    pageNumber: number,
    pageSize: number,
    totalItemCount: number
  };
  errorlst: string;
  msg: string;
  success: boolean;
}

