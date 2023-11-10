import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import Chart from 'chart.js';
// import "chartjs-chart-matrix";
// import "/node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels";
import 'chartjs-plugin-labels';
import $ from 'jquery';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { addChartResponsivenessAndLangSettings } from '../../utils/chartjs_utils';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartId = null;
  labelyColor = '#8F9AB3';
  labelxColor = '#8E9AAF';
  private _unsubscribeAll$ = new Subject<never>();
  lang: string = 'en';
  chartOptions: any = {
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        display: false,
      },
      labels: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'category',
          labels: [],
          // grid: {
          //   display: false,
          // },
          ticks: {
            fontColor: this.labelxColor,
            beginAtZero: false,
            max: 48, //number of 30 min slots
            min: 0,
            stepSize: 1,
          },
          gridLines: {
            offsetGridLines: true,
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            offsetGridLines: false,
            display: false,
          },
          ticks: {
            fontColor: this.labelyColor,
            display: false,
            beginAtZero: true,
            max: 13,
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
    spanGaps: true,
    responsive: true,
  };

  constructor(private _atlpTranslationService: AtlpTranslationService) {}

  ngOnInit(): void {
    this._atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.lang = lang;
      });
    this.generateChart();

    $(document).ready(function () {
      var widthOneItem = 160;
      $('.arrow-left').click(function () {
        $('.scroll').animate({ scrollLeft: '-=' + widthOneItem });
      });
      $('.arrow-right').click(function () {
        $('.scroll').animate({ scrollLeft: '+=' + widthOneItem });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.chartId) {
      setTimeout(() => {
        this.generateChart();
      }, 0);
    }
  }

  roundBar() {
    let x = (Chart['elements'].Rectangle.prototype.draw = function () {
      var ctx = this._chart.ctx;
      var vm = this._view;
      // console.log(vm);
      var left, right, top, bottom, signX, signY, borderSkipped, radius;
      var borderWidth = vm.borderWidth;
      var cornerRadius = 20;
      if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top ? 1 : -1;
        borderSkipped = vm.borderSkipped || 'bottom';
      } else {
        // horizontal bar
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
      }
      if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft =
          left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
        var borderRight =
          right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
        var borderTop =
          top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
        var borderBottom =
          bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }
      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;
      var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom],
      ];

      // Find first (starting) corner with fallback to 'bottom'
      var borders = ['bottom', 'left', 'top', 'right'];
      var startCorner = borders.indexOf(borderSkipped, 0);
      if (startCorner === -1) {
        startCorner = 0;
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4];
      }
      var corner = cornerAt(0);
      ctx.moveTo(corner[0], corner[1]);
      for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        var nextCornerId = i + 1;
        if (nextCornerId == 4) {
          nextCornerId = 0;
        }

        var nextCorner = cornerAt(nextCornerId);

        var width = corners[2][0] - corners[1][0];
        var height = corners[0][1] - corners[1][1];
        var x = corners[1][0];
        var y = corners[1][1];

        var radius: any = cornerRadius;

        // Fix radius being too large
        if (radius > height / 2) {
          radius = height / 2;
        }
        if (radius > width / 2) {
          radius = width / 2;
        }
        if ((vm.width && vm.width == 32) || (vm.width && vm.width == 60)) {
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width + radius, y); //bottom right
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius); //top right
          ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width + radius,
            y + height
          );
          ctx.lineTo(x - radius, y + height); //top left
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius); //bottom left
          ctx.quadraticCurveTo(x, y, x - radius, y);
        } else if (
          vm.datasetLabel == '1color' ||
          vm.datasetLabel[0] == '1color'
        ) {
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius,
            y + height
          );
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
        } else {
          if (vm.datasetLabel == 'Blue' || vm.datasetLabel[0] == 'Blue')
            ctx.lineTo(x + width, y);
          else ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          //bottom right
          if (vm.datasetLabel == 'Red' || vm.datasetLabel[0] == 'Red')
            ctx.lineTo(x + width, y + height);
          else ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius,
            y + height
          );
          //bottom left
          if (vm.datasetLabel == 'Red' || vm.datasetLabel[0] == 'Red')
            ctx.lineTo(x, y + height);
          else ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          //top left
          if (vm.datasetLabel == 'Blue' || vm.datasetLabel[0] == 'Blue')
            ctx.lineTo(x, y);
          else ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
        }
      }

      ctx.fill();
      if (borderWidth) {
        ctx.stroke();
      }
    });
  }

  generateChart() {
    this.roundBar();
    let configOptions = {};
    let dts = {};
    let loop = [];
    let start = '06:30';
    let labels = [];

    let labelstart = '06:00';
    let labelend = '06:30';
    for (let j = 0; j < 48; j++) {
      let s = labelstart.split(':');
      let h = Number(s[0]);
      let hh;
      let m = Number(s[1]);
      let mm;
      if (m == 30) h = (h + 1) % 24;
      if (h / 10 < 1) {
        hh = '0' + h;
      } else {
        hh = '' + h;
      }
      m = (m + 30) % 60;
      if (m / 10 < 1) {
        mm = '0' + m;
      } else {
        mm = '' + m;
      }
      labelstart = hh + ':' + mm;
      s = labelend.split(':');
      h = Number(s[0]);
      hh;
      m = Number(s[1]);
      mm;
      if (m == 30) h = (h + 1) % 24;
      if (h / 10 < 1) {
        hh = '0' + h;
      } else {
        hh = '' + h;
      }
      m = (m + 30) % 60;
      if (m / 10 < 1) {
        mm = '0' + m;
      } else {
        mm = '' + m;
      }
      labelend = hh + ':' + mm;
      labels.push(labelstart + ' - ' + labelend);
    }
    let mystart = '06:00';
    let myend = '06:30';
    for (let j = 0; j < 48; j++) {
      let s = mystart.split(':');
      let h = Number(s[0]);
      let hh;
      let m = Number(s[1]);
      let mm;
      if (m == 30) h = (h + 1) % 24;
      if (h / 10 < 1) {
        hh = '0' + h;
      } else {
        hh = '' + h;
      }
      m = (m + 30) % 60;
      if (m / 10 < 1) {
        mm = '0' + m;
      } else {
        mm = '' + m;
      }
      mystart = hh + ':' + mm;
      s = myend.split(':');
      h = Number(s[0]);
      hh;
      m = Number(s[1]);
      mm;
      if (m == 30) h = (h + 1) % 24;
      if (h / 10 < 1) {
        hh = '0' + h;
      } else {
        hh = '' + h;
      }
      m = (m + 30) % 60;
      if (m / 10 < 1) {
        mm = '0' + m;
      } else {
        mm = '' + m;
      }
      myend = hh + ':' + mm;
      for (let i = 0; i < 12; i++) {
        let e = myend.split(':');
        loop.push({ x: mystart + ' - ' + myend, y: i + 1 });
      }
    }
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
        type: 'matrix',
        data: {
          datasets: [
            {
              label: 'My Matrix',
              data: loop,

              backgroundColor: [
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                ,
                ,
                ,
                ,
                ,
                ,
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                '#D98E28',
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                '#353165',
                '#353165',
                '#353165',
                '#353165',
                '#353165',
                '#353165',
                ,
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                '#57A05A',
                ,
                ,
                ,
                ,
                ,
              ],
              // width: 60,
              // height: 6,
            },
          ],
        },
        options: this.chartOptions,
        plugins: [
          {
            beforeInit: function (chart) {
              chart.data.labels.forEach(function (label, index, labelsArr) {
                if (/\n/.test(label?.toString())) {
                  labelsArr[index] = label?.toString().split(/\n/);
                }
              });
            },
          },
        ],
      });
      this.roundBar();
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
