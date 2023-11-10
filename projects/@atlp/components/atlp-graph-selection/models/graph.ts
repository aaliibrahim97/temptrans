export interface Graph {
  graphTitle?: string;
  data: GraphData[];
}

export interface GraphData {
  stepTitle?: string;
  stepIcon?: string;
  description?: string;
  metaData?: string;
  eventDate?: string;
  isCompleted?: boolean;
}
