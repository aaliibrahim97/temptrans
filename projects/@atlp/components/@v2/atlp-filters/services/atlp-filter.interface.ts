export interface IAtlpFilterService {
  getUniqueFilterId?(): string;
  saveFilter(name: string, filters: any);
  deleteFilter(id: any);
  getFiltersList(formatApiResponse?: any);
}
