import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@Component({
  selector: 'app-drawer-dialog-v2',
  templateUrl: './drawer-dialog.component.html',
  styleUrls: ['./drawer-dialog.component.scss'],
})
export class DrawerDialogComponent implements OnInit {
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
