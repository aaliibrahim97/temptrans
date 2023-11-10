import {
  Component, OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AtlpAnimations } from 'projects/@atlp/animations';

@Component({
  selector: 'floating-action',
  templateUrl: './floating-action.component.html',
  styleUrls: ['./floating-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: AtlpAnimations,
  providers: [],
})
export class FloatingActionComponent implements OnInit, OnDestroy {


  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
}
