import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpCommonDialogEnum } from '../../models/enums/common-dialog.enum';
@Component({
  selector: 'atlp-common-messages',
  templateUrl: './atlp-messages.component.html',
  styleUrls: ['./atlp-messages.component.scss'],
})
export class AtlpCommonMessagesComponent implements OnInit {
  atlpCommonDialogEnum = AtlpCommonDialogEnum;
  //reason: string = "";
  @Input() dialogType: AtlpCommonDialogEnum;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() okButtonText: string;
  @Input() inputReason :string;
  @Input() reasonError :string;
  @Input() cancelButtonText: string;
  @Input() rejectAbortButtonText: string;
  @Input() okClick: () => void;
  @Input() confirmWithReason: (reason: string, aptId: string) => void;
  @Input() cancelClick: () => void;
  @Input() messageData: any;
  @Input() confirmWithdata: (messageData: any) => void;
  model: any = {};
  submitted: boolean = false;
  ngOnInit(): void {}

  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }

  cancelButtonClick = (): void => {
    this.cancelClick();
  };

  okButtonClick = (): void => {
    this.okClick();
  };

  confirmWithReasonClick(form) {
    this.submitted = true;
    if (form.valid) {
      this.confirmWithReason(form.value.reason, this.messageData);
      form.resetForm();
      this.submitted = false;
    }
  }
  confirmWithdataClick() {
    this.confirmWithdata(this.messageData);
  }

  isNotRejectReason(): boolean {
    return this.dialogType != AtlpCommonDialogEnum.rejectWithReason;
  }
  dataWithId(): boolean {
    return this.dialogType == AtlpCommonDialogEnum.dataWithId;
  }
  private get icons(): Array<string> {
    return [
      'messages-exclamation',
      'success-icon',
      'error-icon',
      'error-circle',
      'info-icon',
    ];
  }
}
