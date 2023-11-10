import { BaseResponse } from 'projects/@atlp/core/models/baseResponse.model';
import { AtlpGraphData } from '../models/atlp-milestone-models';

export const atlp_milestone_static_data: BaseResponse<AtlpGraphData> = {
  data: {
    GraphTitle: '',
    GraphData: [
      {
        StepTitle: 'Draft Date',
        StepIcon: 'document-icon',
        Description: 'Draft Date',
        DescriptionArb: 'Draft Date',
        MetaData: '',
        EventDate: '10/26/2021 12:59:10 PM',
        CompletedStatus: 'COMPLETED',
        StepTitleArb: 'Draft Date',
      },
      {
        StepTitle: 'Draft Submission',
        StepIcon: 'save-animation-icon',
        Description: 'Draft Submission',
        DescriptionArb: 'Draft Submission',
        MetaData: '',
        EventDate: '10/26/2021 1:01:10 PM',
        CompletedStatus: 'COMPLETED',
        StepTitleArb: 'Draft Submission',
      },
      {
        StepTitle: 'DO Date',
        StepTitleArb: 'DO Date',
        StepIcon: 'edit-icon',
        Description: 'DO Date',
        DescriptionArb: 'DO Date',
        MetaData: '',
        EventDate: '11/22/2020 20:00:00',
        CompletedStatus: 'COMPLETED',
      },
      {
        StepTitle: 'Vessel Arrival',
        StepTitleArb: 'Vessel Arrival',
        StepIcon: 'voyage-icon-two',
        Description: 'Vessel Arrival',
        DescriptionArb: 'DO Date',
        MetaData: '',
        EventDate: '01/13/2021 20:00:00',
        CompletedStatus: 'COMPLETED',
      },
      {
        StepTitle: 'OGA Approval',
        StepTitleArb: 'OGA Approval',
        StepIcon: 'approval-icon',
        Description: 'OGA Approval',
        DescriptionArb: 'OGA Approval',
        MetaData: '',
        EventDate: '',
        CompletedStatus: 'COMPLETED',
      },
    ],
    PercentageComplete: 20,
  },
  msg: '',
  success: true,
  Errorlst: null,
};
