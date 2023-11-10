import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { CardStatus } from '../../enums/card-status.enum';
import { IVoyageCardData } from '../../interfaces';

@Component({
  selector: 'app-voyage-status',
  templateUrl: './voyage-status.component.html',
  styleUrls: ['./voyage-status.component.scss'],
})
export class VoyageStatusComponent implements OnInit {
  @Input() voyageCardData: IVoyageCardData;
  @Input() tableType: 'rolled' | 'collapse';
  CardStatus = CardStatus;

  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

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
