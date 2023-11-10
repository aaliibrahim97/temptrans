import { Component } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'dynamic-snakbar-feedback',
  template: `<span
    class="feedback fxLayoutGap-row-1vw"
    fxFlex
    fxLayout="row"
    fxLayoutAlign="space-around center"
  >
    <mat-icon
      class="icon"
      svgIcon="status-icon-completed"
      aria-hidden="false"
    ></mat-icon>
    {{ 'FEEDBACK_SUCCESS' | translate }}
  </span>`,
  styles: [
    `
      .feedback {
        font: normal normal normal 18px/22px Museo Sans;
        letter-spacing: 0px;
        color: #0f1930;
        opacity: 1;
      }
    `,
  ],
})
export class DynamicSnakbarFeedbackComponent {
  /**
   * Constructor
   * @param {IconsService} _iconsService
   */
  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }
  private get icons(): Array<string> {
    return ['status-icon-completed'];
  }
}
