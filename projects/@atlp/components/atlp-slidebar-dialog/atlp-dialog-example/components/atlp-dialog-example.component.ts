import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { AtlpSlideBarDialogConfig } from '../../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpDialogRef } from '../../injectors/atlp-dialog-ref';
import { AtlpSlideBarDialogSidebarName } from '../../models/sidebar-name.enum';

@Component({
  selector: 'atlp-dialog-example',
  templateUrl: './atlp-dialog-example.component.html',
  styleUrls: ['./atlp-dialog-example.component.scss'],
})
export class AtlpDialogExampleComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  SidebarName = AtlpSlideBarDialogSidebarName;
  constructor(
    public config: AtlpSlideBarDialogConfig,
    public dialog: AtlpDialogRef,
    public atplSidebarService: AtlpSidebarService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.atplSidebarService
        .getSidebar(this.config.keyToCloseSlider)
        .toggleOpen();
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.dialog.close('some value');
  }

  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
  }
}
