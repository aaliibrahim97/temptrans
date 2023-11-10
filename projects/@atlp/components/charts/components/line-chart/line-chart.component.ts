import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as Chart from 'chart.js';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { addChartResponsivenessAndLangSettings } from '../../utils/chartjs_utils';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartData;
  @Input() chartOptions;
  @Input() chartId = null;
  private _unsubscribeAll$ = new Subject<never>();
  lang: string = 'en';

  constructor(private _atlpTranslationService: AtlpTranslationService) {}

  ngOnInit(): void {
    this._atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.lang = lang;
      });
    this.generateChart();
  }

  ngAfterViewInit(): void {
    if (this.chartId) {
      this.generateChart();
    }
  }

  generateChart() {
    const canvas: any = document.getElementById(this.chartId);
    const ctx = canvas && canvas.getContext('2d');

    if (this.chartOptions) {
      this.chartOptions = addChartResponsivenessAndLangSettings(
        this.chartOptions,
        this.lang
      );
    }

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
