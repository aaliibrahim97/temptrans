import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AtlpAutoCompleteDataService } from '../../services/atlp-auto-complete.service';

@Component({
  selector: 'atlp-auto-complete-example',
  templateUrl: './atlp-auto-complete-example.component.html',
  styleUrls: ['./atlp-auto-complete-example.component.scss'],
})
export class AtlpAutoCompleteExampleComponent implements OnInit {
  title = 'app';
  model: any;
  @ViewChild('itemTemplate') linkTemplate: TemplateRef<any>;

  items = [
    { code: '0', name: 'Red' },
    { code: '1', name: 'Blue' },
    { code: '2', name: 'Green' },
    { code: '3', name: 'Yellow' },
    { code: '4', name: 'Black' },
    { code: '5', name: 'Purple' },
    { code: '6', name: 'White' },
    { code: '7', name: 'Grey' },
    { code: '8', name: 'Orange' },
  ];

  //items2 = ['1', '2', '3', '4'];
  displayItem = (x: any) =>
    'code: 0' + x.code + ' || name: ' + x.name.toUpperCase();

  constructor(public dataService: AtlpAutoCompleteDataService) {}

  ngOnInit() {}

  public showSelected() {
    console.log('Current model: ', this.model);
  }

  public createNew(value: string) {
    const newName = prompt('Enter new name for an item', value);
    this.items.push({ code: '99', name: newName });
    this.items = this.items.slice(0);
  }
}
