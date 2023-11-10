import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'atlp-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements OnInit {
  @Input() label: string;
  @Input() Inputid: string;
  constructor() {}

  ngOnInit(): void {}

  UpdateInputNumber(id: string, operation: string) {
    let value;
    //console.log(id , operation, document.getElementById(id))
    if ((<HTMLInputElement>document.getElementById(id)).value == '') {
      value = 0;
    } else {
      value = parseInt((<HTMLInputElement>document.getElementById(id)).value);
    }
    if ((operation === 'decrement' && value === 0) || value == null) return;

    if (operation === 'increment') {
      value += 1;
    } else if (operation === 'decrement') {
      value -= 1;
    }
    var inputElement = <HTMLInputElement>document.getElementById(id);
    inputElement.value = value.toString();
  }
}
