import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import * as Chart from 'chart.js';
import '../../../../../../node_modules/chartjs-plugin-labels/src/chartjs-plugin-labels.js';
// import 'chartjs-plugin-labels';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { addChartResponsivenessAndLangSettings } from '../../utils/chartjs_utils';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() chartData;
  @Input() chartOptions;
  @Input() chartId = null;
  @Input() stopClick: boolean = false;
  @Input() firstActiveByDefault: boolean = true;
  @Input() firstActiveDelay: number = 1;
  public myChart: Chart;
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
    this.generateDonateChart();
  }

  ngAfterViewInit(): void {
    if (this.chartId) {
      this.generateDonateChart();
    }
  }

  generateDonateChart() {
    const canvas: any = document.getElementById(this.chartId);
    const ctx = canvas && canvas.getContext('2d');

    if (this.chartOptions) {
      this.chartOptions = addChartResponsivenessAndLangSettings(
        this.chartOptions,
        this.lang
      );
    }

    if (ctx) {
      this.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
    var addRadiusMargin = 7;
    let chart = null;
    const setStyle = (active) => {
      if (this.stopClick) return;

      var activePoints = active;
      if (activePoints.length > 0) {
        if (
          document.getElementById('value') !== null &&
          document.getElementById('value') !== undefined
        ) {
          document.getElementById('value').style.backgroundColor =
            activePoints[0]['_model'].backgroundColor;
        }
        if (
          document.getElementById('b') !== null &&
          document.getElementById('b') !== undefined
        ) {
          document.getElementById('b').style.backgroundColor =
            activePoints[0]['_model'].backgroundColor;
          document.getElementById('b').style.display = '';
        }
        if (
          document.getElementById('graphInfo') !== null &&
          document.getElementById('graphInfo') !== undefined
        ) {
          document.getElementById('graphInfo').style.display = '';
        }
      } else {
        if (
          document.getElementById('graphInfo') !== null &&
          document.getElementById('graphInfo') !== undefined
        ) {
          document.getElementById('graphInfo').style.display = 'none';
        }
        if (
          document.getElementById('b') !== null &&
          document.getElementById('b') !== undefined
        ) {
          document.getElementById('b').style.display = 'none';
        }
      }
      if (chart != null) {
        chart[0]['_model'].innerRadius =
          chart[0]['_model'].innerRadius + addRadiusMargin;
        chart[0]['_model'].outerRadius =
          chart[0]['_model'].outerRadius - addRadiusMargin;
        chart = null;
      }
      if (activePoints.length > 0) {
        chart = activePoints;
        // update the newly selected piece
        activePoints[0]['_model'].innerRadius =
          activePoints[0]['_model'].innerRadius - addRadiusMargin;
        activePoints[0]['_model'].outerRadius =
          activePoints[0]['_model'].outerRadius + addRadiusMargin;
      } else {
      }
      let delay: any = 300;
      this.myChart.render(delay);
    };
    if (canvas) {
      if (this.firstActiveByDefault) {
        setTimeout(() => {
          const firstActivePoint =
            this.myChart && this.myChart.getDatasetMeta(0).data[0];
          if (firstActivePoint) {
            setStyle([firstActivePoint]);
          }
        }, this.firstActiveDelay);
      }

      canvas.onclick = (event) => {
        const activePoint = this.myChart.getElementsAtEvent(event);
        setStyle(activePoint);
      };
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
