import {
  AtlpLookupId,
  AtlpLookUpMethods,
} from '../models/atlp-lookup-enum.model';
import { IAtlpLookupConstant } from '../models/atlp-lookup-constants.model';
import { AtlpLookupService } from '../services/atlp-lookup.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

const genericColorLookup: IAtlpLookupConstant = {
  lookupId: AtlpLookupId.genericColorLookup,
  sliderId: SidebarName.genericColorLookup,
  lookupTitle: 'COLOR',
  isServerSidePaginationEnabled: false,
  itemsPerPage: 7,
  serviceEndPoint: 'Customs/Lookup/GenericLookup',
  lookupServicePayload: {
    skip: '',
    take: '',
    searchString: '',
    lookupType: 'VEHICLECOLOR',
  },
  method: AtlpLookUpMethods.GET,
  visibleInputFileds: [{ english: true, arabic: true }],
};

export const AtlpGenericLookup: { [name: string]: IAtlpLookupConstant } = {
  genericColorLookup,
};

export function configureAtlpLookUpService(
  AtlpLookUpService: AtlpLookupService
): () => Promise<any> {
  return () => AtlpLookUpService.withAtlpLookUpConfig(AtlpGenericLookup);
}
