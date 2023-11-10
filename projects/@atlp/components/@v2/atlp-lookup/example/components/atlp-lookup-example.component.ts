import { Component, OnInit } from '@angular/core';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSidebarV2Service } from '../../../atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'atlp-lookup-example',
  templateUrl: './atlp-lookup-example.component.html',
  styleUrls: ['./atlp-lookup-example.component.scss'],
})
export class AtlpLookupExampleComponent implements OnInit {
  SidebarNameAtlp = SidebarName;

  constructor(
    public _atplSidebarService: AtlpSidebarV2Service,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit() {}

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  private get icons(): Array<string> {
    return ['close-white-icon', 'soc-icon', 'mob-open-menu', 'plus-white'];
  }
}
