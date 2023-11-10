import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// select interface
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, AfterViewInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
