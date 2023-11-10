import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

// usage example (use with directive)
// <div
// atlpCustomToolTip="My tool tip text"
// [contentTemplate]="myToolTip"
// >
// Hover to open tool tip
// <ng-template #myToolTip>
//   <table class="toot-tip-table" cellspacing="15">
//     <thead>
//       <tr>
//         <th>Title</th>
//         <th>Description</th>
//         <th>events</th>
//         <th>Date</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td class="tool-tip-text">tool tip text</td>
//         <td class="tool-tip-text">tool tip Description</td>
//         <td class="tool-tip-text">tool tip Event</td>
//         <td class="tool-tip-text">{{ currentDate }}</td>
//       </tr>
//     </tbody>
//   </table>
// </ng-template>
// </div>
@UntilDestroy({ checkProperties: true, arrayName: 'subscriptions' })
@Component({
  selector: 'atlp-custom-tool-tip',
  templateUrl: './atlp-custom-tool-tip.component.html',
  styleUrls: ['./atlp-custom-tool-tip.component.scss'],
})
export class AtlpCustomToolTipComponent implements OnInit {
  /**
   * This is simple text which is to be shown in the tooltip
   */
  @Input() text: string;
  @Input() contentTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
