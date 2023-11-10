import {
  AtlpCommonSliderDialogData,
  AtlpConfirmationSliderDialogData,
  AtlpDialogRole,
  AtlpRejectReasonSliderDialogData,
} from "../models/atlp-slidebar-dialog.models";
import { AtlpSlideBarDialogSidebarName } from "../models/sidebar-name.enum";

export class AtlpSlideBarDialogConfig<D = any> {
  data?: D;
  atlpDialogRole: AtlpDialogRole;
  keyToCloseSlider: AtlpSlideBarDialogSidebarName;
  atlpConfirmationSliderDialogData?: AtlpConfirmationSliderDialogData;
  atlpRejectReasonSliderDialogData?: AtlpRejectReasonSliderDialogData;
  atlpCommonSliderDialogData?: AtlpCommonSliderDialogData;
}
