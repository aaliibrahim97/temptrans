import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as Chart from 'chart.js';
import * as data from '../../_files/areData.json';
import * as dataWorld from '../../_files/data.json';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { addChartResponsivenessAndLangSettings } from '../../utils/chartjs_utils';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss'],
})
export class MyChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartData;
  @Input() mapType;
  @Input() chartOptions;
  @Input() chartId = null;
  @Input() mapJson = null;
  c = 1049;
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
    this.generateMap();
  }

  ngAfterViewInit(): void {
    if (this.chartId && this.chartOptions && this.mapJson && this.chartData) {
      this.generateMap();
    }
  }

  generateMap() {
    let d;
    if (this.mapType == 'world') d = dataWorld;
    else d = data;
    var clientWidth;
    if (this.chartId == 'worldChartSmall' || this.chartId == 'regionChartSmall')
      clientWidth =
        document.getElementsByClassName('div-chart1')[0].clientWidth;
    else
      clientWidth =
        document.getElementsByClassName('div-chart1')[2].clientWidth;
    //console.log(document.getElementsByClassName("div-chart1").length);
    //console.log(clientWidth);
    // let radius = this.chartData.radius;
    let radius;
    if (this.mapType == 'world') radius = [40, 22, 46, 25, 55, 36, 26];
    else radius = [60, 60, 40, 35, 40, 45, 60];
    let radius1 = radius;
    for (let j = 0; j < radius.length; j++) {
      radius1[j] = (radius[j] / this.c) * clientWidth;
    }
    fetch(this.mapJson)
      .then((r) => r.json())
      .then((br) => {
        // var geoData = ChartGeo.topojson.feature(
        //   br,
        //   br.objects[this.chartData.are]
        // ).features;
        var geoData = null;
        for (let i in geoData) {
          geoData[i].properties.confirmed = Math.random();
          geoData[i].properties.deaths = Math.random();
        }
        let dts = {
          labels: geoData.map((i) => i.properties.name),
          datasets: [
            {
              mapColor: this.chartData.mapColor,
              outline: geoData,
              showOutline: this.chartData.show,
              radius: radius1,
              backgroundColor: this.chartData.bgc,
              data: d.map((d) =>
                Object.assign(d, {
                  value: 1,
                })
              ),
            },
          ],
        };
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
            type: 'bubbleMap',
            data: dts,
            options: this.chartOptions,
          });
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
