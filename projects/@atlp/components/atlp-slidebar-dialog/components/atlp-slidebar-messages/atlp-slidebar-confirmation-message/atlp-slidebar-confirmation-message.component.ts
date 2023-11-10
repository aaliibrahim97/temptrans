import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSlideBarDialogConfig } from '../../../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpDialogRef } from '../../../injectors/atlp-dialog-ref';
import { AtlpSlideBarDialogSidebarName } from '../../../models/sidebar-name.enum';

@Component({
  selector: 'atlp-slidebar-confirmation-message',
  templateUrl: './atlp-slidebar-confirmation-message.component.html',
  styleUrls: ['./atlp-slidebar-confirmation-message.component.scss'],
})
export class AtlpSlideBarConfirmationComponent implements OnInit {
  SidebarName = AtlpSlideBarDialogSidebarName;
  constructor(
    public config: AtlpSlideBarDialogConfig,
    public dialog: AtlpDialogRef,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

  cancelButtonClick = (): void => {
    this.onClose('cancel');
  };

  okButtonClick = (): void => {
    this.onClose('ok');
  };

  onClose(msg: string): void {
    this.dialog.close(msg);
  }

  private get icons(): Array<string> {
    return [
      'success-icon',
      'error-icon',
      'messages-exclamation',
      'rejected-icon',
    ];
  }
}
