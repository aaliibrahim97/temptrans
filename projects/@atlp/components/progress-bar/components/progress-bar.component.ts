import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AtlpProgressBarService } from '../service/progress-bar.service';

@Component({
  selector: 'atlp-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtlpProgressBarComponent implements OnInit, OnDestroy {
  @Input() bufferValue: number;
  @Input() mode; //: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  progressValue: number = 0;
  @Input() set value(value: number) {
    this.progressValue = value;
    if (value > 3) {
      if (value == 100) {
        this.title_width = this.progressValue - 5 + '%';
      } else {
        this.title_width = this.progressValue - 3 + '%';
      }
    } else {
      this.title_width = this.progressValue + '%';
    }
  }
  @Input() visible: boolean = true;
  @Input() showTitleTop: boolean = false;
  @Input() showTitleBottom: boolean = false;
  @Input() title: string = '';
  private _unsubscribeAll: Subject<any>;
  title_width: string = '0%';

  constructor(private _atlpProgressBarService: AtlpProgressBarService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    //this.title_width = this.value - 3 + '%';
    // Subscribe to the progress bar service properties
    // Titlw value
    // this._atlpProgressBarService.titleValue
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((titleValue) => {
    //         this.title = titleValue;
    //     });
    // Buffer value
    // this._atlpProgressBarService.bufferValue
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((bufferValue) => {
    //     this.bufferValue = bufferValue;
    //   });
    // // Mode
    // // this._atlpProgressBarService.mode
    // //   .pipe(takeUntil(this._unsubscribeAll))
    // //   .subscribe((mode) => {
    // //     this.mode = mode;
    // //   });
    // // Value
    // this._atlpProgressBarService.value
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((value) => {
    //     this.value = value;
    //   });
    // // Visible
    // this._atlpProgressBarService.visible
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((visible) => {
    //     this.visible = visible;
    //   });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
