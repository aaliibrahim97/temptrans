import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})
export class TestComponentComponent implements OnInit {
  form: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  search() {
    //console.log('search called!');
  }
}
