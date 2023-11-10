import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'app-cash-confirmation-dialog-v2',
  templateUrl: './cash-confirmation-dialog.component.html',
  styleUrls: ['./cash-confirmation-dialog.component.scss'],
})
export class CashConfirmationDialogComponent implements OnInit {
  @Input() dialogData: any;
  @Output() setClickDialogOK: EventEmitter<any> = new EventEmitter();
  SidebarName = SidebarName;
  constructor(private _atplSidebarV2Service: AtlpSidebarV2Service) {}

  ngOnInit(): void {}
  onClickDialogOK = () => {
    this.setClickDialogOK.emit(true);
  };

  toggleSidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }
}
