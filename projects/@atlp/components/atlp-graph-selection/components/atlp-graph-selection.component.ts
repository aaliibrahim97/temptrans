import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Graph } from '../models/graph';

@UntilDestroy()
@Component({
  selector: '[graph-selection]',
  templateUrl: './atlp-graph-selection.component.html',
  styleUrls: ['./atlp-graph-selection.component.scss'],
  animations: [
    trigger('graphProgressbar', [
      state(
        'done',
        style({
          width: '{{width}}%',
        }),
        { params: { width: 0 } }
      ),
      transition(':enter', [animate('2s ease')]),
    ]),
  ],
})
export class AtlpGraphSelectionComponent implements OnInit {
  @Input() graphData: Graph;
  @Input() majorSteps: number[] = [];
  @Input() selection: any;
  @Input() showTitleBottom: boolean = false;
  @Input() showTitleTop: boolean = false;
  @Input() data;
  @Input() percentageValue: number = 0;
  state = '';

  constructor() {
    this.state = 'done';
  }

  ngOnInit(): void {}

  onDone(event) {
    this.state = 'done';
  }

  activation() {}

  close() {
    this.selection.toggle(this.data);
  }
}
