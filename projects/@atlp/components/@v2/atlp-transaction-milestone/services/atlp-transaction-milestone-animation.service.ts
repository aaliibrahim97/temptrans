import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GraphData } from 'projects/@atlp/components/atlp-graph-selection/models/graph';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {
  AtlpGraphResponseModel,
  AtlpGraphData,
} from '../models/atlp-transaction-milestone-graph-response.model';
import { BaseResponse } from 'projects/@atlp/core/models/baseResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AtlpTransAnimationService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getGraphData(
    apiUrl: any,
    selectedLanguage: string
  ): Observable<AtlpGraphResponseModel> {
    return this.http.get<BaseResponse<AtlpGraphData>>(apiUrl, {}).pipe(
      map((graphData) => {
        return this.getMappedGraphData(graphData, selectedLanguage);
      })
    );
  }

  getMappedGraphData(
    graphResponseData: BaseResponse<AtlpGraphData>,
    selectedLanguage: string
  ): AtlpGraphResponseModel {
    const graphList: GraphData[] =
      graphResponseData?.data?.GraphData?.map((grapItem) => {
        return {
          stepTitle:
            selectedLanguage.toLocaleLowerCase() === 'en'
              ? grapItem.StepTitle
              : grapItem.StepTitleArb,
          stepIcon: this.getGraphStepIcons(grapItem.StepIcon),
          description:
            selectedLanguage.toLocaleLowerCase() === 'en'
              ? grapItem.Description
              : grapItem.DescriptionArb,
          metaData: grapItem.MetaData,
          eventDate: this.datePipe.transform(
            grapItem.EventDate,
            'dd/MM/yyyy hh:mm a'
          ),
          isCompleted: grapItem.CompletedStatus.toUpperCase() === 'COMPLETED',
        };
      }) || [];
    return {
      graph: {
        graphTitle: graphResponseData.data.GraphTitle,
        data: graphList,
      },
      percentageComplete: graphResponseData.data.PercentageComplete,
    };
  }

  getGraphStepIcons(stepIcon): string {
    switch (stepIcon?.toLowerCase()) {
      case 'draftdate': {
        return 'document-icon';
      }
      case 'draftsubmission': {
        return 'save-animation-icon';
      }
      case 'dodate': {
        return 'edit-icon';
      }
      case 'vesselarrival': {
        return 'voyage-icon-two';
      }
      case 'ogaapproval': {
        return 'approval-icon';
      }
      case 'payment': {
        return 'graph-payment-icon';
      }
      case 'modification': {
        return 'graph-amend-icon';
      }
      case 'cancellation': {
        return 'graph-cancel-icon';
      }
      default: {
        return 'schedule-icon';
      }
    }
  }
}
