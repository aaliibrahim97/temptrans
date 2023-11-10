import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atlp-key-value-column',
  templateUrl: './key-value-column.component.html',
  styleUrls: ['./key-value-column.component.scss'],
})
export class KeyValueColumnComponent implements OnInit {
  constructor() {}
  @Input() key: string;
  @Input() value: string;
  ngOnInit(): void {}
}
