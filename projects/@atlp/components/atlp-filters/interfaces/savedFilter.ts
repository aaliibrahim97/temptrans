export interface SavedFilter {
  id: string,
  name: string;
  searchDate?:string,
  filters: {
    filterBy: string;
    filterType: string;
    value: string;
  }[];
}
