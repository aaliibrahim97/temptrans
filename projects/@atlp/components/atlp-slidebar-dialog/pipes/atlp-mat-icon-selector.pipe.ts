import { Pipe, PipeTransform } from "@angular/core";
import { AtlpDialogRole } from "../models/atlp-slidebar-dialog.models";

@Pipe({
  name: "matIconSelector",
})
export class MatIconSelectorPipe implements PipeTransform {
  transform(atlpDialogRole: AtlpDialogRole, ...args: any[]): string {
    switch (atlpDialogRole) {
      case "success":
        return "success-icon";
      case "error":
        return "error-icon";
      case "warning":
        return "messages-exclamation";
      case "confirm":
        return "messages-exclamation";
      case "rejectWithReason":
        return "rejected-icon";
      default:
        break;
    }
    return null;
  }
}
