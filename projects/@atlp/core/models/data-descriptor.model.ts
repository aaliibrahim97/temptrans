export interface DataDescriptor {
    order?: {
      orderBy: string;
      orderType: 'asc' | 'desc';
    };
    filter?: {
      filterBy: string;
      filterType: 'equal' | 'contain';
      value: any;
    }[];
    pagination?: {
      pageSize: number;
      pageIndex: number;
    };
  }
  