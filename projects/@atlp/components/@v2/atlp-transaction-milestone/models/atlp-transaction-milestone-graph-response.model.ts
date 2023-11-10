import { Graph } from 'projects/@atlp/components/atlp-graph-selection/models/graph';

export interface AtlpGraphResponseModel {
  graph: Graph;
  percentageComplete: number;
}

export interface AtlpGraphCollection {
  StepTitle: string;
  StepTitleArb: string;
  StepIcon: string;
  Description: string;
  DescriptionArb: string;
  MetaData: string;
  EventDate: string;
  CompletedStatus: string;
}

export interface AtlpGraphData {
  GraphTitle?: any;
  GraphData: AtlpGraphCollection[];
  PercentageComplete: number;
}
