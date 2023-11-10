import { Component, Inject, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { ATLP_PORTAL_TABLE_DATA } from 'projects/atlp-table/src/lib/injectors/atlp-table-portal.injector';
import { CardStatus } from '../../enums/card-status.enum';
import { IVoyageCardData } from '../../interfaces';

@Component({
  selector: 'voyage-card',
  templateUrl: './voyage-card.component.html',
  styleUrls: ['./voyage-card.component.scss'],
})
export class VoyageCardComponent implements OnInit {
  @Input() voyageCardData: IVoyageCardData;
  CardStatus = CardStatus;

  constructor(
    private _iconsService: IconsService,
    @Inject(ATLP_PORTAL_TABLE_DATA) public data
  ) {
    if (data?.voyageCardData) {
      this.data = data.voyageCardData;
    }
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    // this.voyageCardData = {
    //   status: CardStatus.approved,
    //   statusText: 'abcd',
    //   id: 101,
    //   time: 'abcd',
    //   date: 'abcd',
    //   textInfo: 'abcd',
    //   textDescr: 'abcd',
    //   update: 'abcd',
    //   addition: 'abcd',
    //   duration: 100,
    // };
  }

  getDuration(value: number): string {
    if (value) {
      const hours = Math.floor(value / 60 / 60);
      const minutes = Math.floor(value / 60) % 60;
      // tslint:disable-next-line:max-line-length
      return `${hours > 0 ? `<span>${hours}h</span>` : null}${
        minutes > 0 ? `<span>${minutes}m</span>` : null
      }`;
    }
    return null;
  }

  private get icons(): Array<string> {
    return [
      'data-icon',
      'message-icon',
      'added-icon',
      'default-icon',
      'message-active-icon',
      'triangle-icon',
      'approved-icon',
      'rejected-icon',
      'pending-icon',
      'addDL-icon',
      'addLL-icon',
      'minus-icon',
    ];
  }
}
