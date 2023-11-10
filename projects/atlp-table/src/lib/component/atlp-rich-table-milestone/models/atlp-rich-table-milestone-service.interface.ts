import { ComponentPortal } from '@angular/cdk/portal';
import { Graph } from 'projects/@atlp/components/atlp-graph-selection/models/graph';
import { Observable } from 'rxjs';

export interface AtlpGraphResponseModel {
  graph: Graph;
  percentageComplete: number;
}

export interface IAtlpRichTableMileStoneService {
  getGraphData(
    params?: any,
    selectedLanguage?: string
  ): Observable<AtlpGraphResponseModel>;
}

export interface IAtlpRichTableCellCreatorService {
  attachCellPortal(col: any, element: any, $event: any): ComponentPortal<any>;
}
