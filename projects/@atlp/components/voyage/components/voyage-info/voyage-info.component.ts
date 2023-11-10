import { Component, Inject, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { ATLP_PORTAL_TABLE_DATA } from 'projects/atlp-table/src/lib/injectors/atlp-table-portal.injector';
import { IVoyageInfoData } from '../../interfaces';

@Component({
  selector: 'voyage-info',
  templateUrl: './voyage-info.component.html',
  styleUrls: ['./voyage-info.component.scss'],
})
export class VoyageInfoComponent implements OnInit {
  @Input() voyageInfoData: IVoyageInfoData;

  constructor(
    private _iconsService: IconsService,
    @Inject(ATLP_PORTAL_TABLE_DATA) public data
  ) {
    if (data) {
      this.voyageInfoData = data.voyageInfoData.info;
    }
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

  public srcCompany(name: string): string {
    return `assets/images/${name}.png`;
  }

  private get icons(): Array<string> {
    return [
      'data-icon',
      'message-icon',
      'message-active-icon',
      'triangle-icon',
    ];
  }
}
