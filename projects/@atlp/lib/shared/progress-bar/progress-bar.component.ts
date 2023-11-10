import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  diameter = 50;
  // isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading$;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private loaderService: ProgressBarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.loaderService.isLoading$.subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
