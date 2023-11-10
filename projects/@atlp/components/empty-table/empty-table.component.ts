import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'empty-table',
  templateUrl: './empty-table.component.html',
  styleUrls: ['./empty-table.component.scss']
})
export class EmptyTableComponent implements OnInit {
  @Input() invert: boolean;
  @Input() colHeader: any[];

  constructor() { }

  ngOnInit(): void {

  }
  
}
