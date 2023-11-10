import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atlp-lookup-empty-table',
  templateUrl: './atlp-lookup-empty-table.component.html',
  styleUrls: ['./atlp-lookup-empty-table.component.scss'],
})
export class AtlpLookUpEmptyTableComponent implements OnInit {
  @Input() invert: boolean;
  @Input() colHeader: any[];

  constructor() {}

  ngOnInit(): void {}
}
