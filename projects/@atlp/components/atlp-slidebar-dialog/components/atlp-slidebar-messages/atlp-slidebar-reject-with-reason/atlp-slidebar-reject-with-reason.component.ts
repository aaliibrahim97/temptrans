import { Component, Input, OnInit } from "@angular/core";
import { IconsService } from "projects/@atlp/services/icons.service";
import { AtlpSlideBarDialogConfig } from "../../../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config";
import { AtlpDialogRef } from "../../../injectors/atlp-dialog-ref";
import { AtlpSlideBarDialogSidebarName } from "../../../models/sidebar-name.enum";
@Component({
  selector: "atlp-slidebar-reject-with-reason",
  templateUrl: "./atlp-slidebar-reject-with-reason.component.html",
  styleUrls: ["./atlp-slidebar-reject-with-reason.component.scss"],
})
export class AtlpSlideBarRejectWithReasonComponent implements OnInit {
  SidebarName = AtlpSlideBarDialogSidebarName;
  model: any = {};
  submitted: boolean;

  constructor(
    public config: AtlpSlideBarDialogConfig,
    public dialog: AtlpDialogRef,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

  cancelButtonClick = (): void => {
    this.onClose({
      action: "cancel",
      data: null,
    });
  };

  confirmWithReasonClick(form) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      this.onClose({
        action: "ok",
        data: this.model.reason,
      });
      form.resetForm();
    }
  }

  onClose(msg: any): void {
    this.dialog.close(msg);
  }

  private get icons(): Array<string> {
    return [
      "messages-exclamation",
      "success-icon",
      "error-icon",
      "error-circle",
      "info-icon",
    ];
  }
}
