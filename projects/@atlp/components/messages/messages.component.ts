import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'atlp-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() button1Text: string;
  @Input() button2Text: string;
  @Input() button1Function: () => void;
  @Input() button2Function: () => void;


  /**
     * Constructor
     * @param {IconsService} _iconsService
     */
  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }

  dangerFunction = (): void => {
    this.button2Function();
  }

  function = (): void => {
    this.button1Function();
  }
  ngOnInit(): void {

  }
  private get icons(): Array<string> {
    return ['messages-exclamation'];
  }

}
