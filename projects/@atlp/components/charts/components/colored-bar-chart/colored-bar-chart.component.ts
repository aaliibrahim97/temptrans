import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as Chart from 'chart.js';
// import "/node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels";
// import "chartjs-plugin-labels";
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { addChartResponsivenessAndLangSettings } from '../../utils/chartjs_utils';

@Component({
  selector: 'app-colored-bar-chart',
  templateUrl: './colored-bar-chart.component.html',
  styleUrls: ['./colored-bar-chart.component.scss'],
})
export class ColoredBarChartComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
      // coloredBarChartBig
      if (this.chartId == 'coloredBarChartBig') {
        document.getElementById('coloredBarChartBig').style.minHeight = '313px';
        document.getElementById('coloredBarChartBig').style.paddingBottom =
          '30px';
      }
      if (this.chartId == 'coloredBarChart') {
        document.getElementById('coloredBarChart').style.minHeight = '313px';
        document.getElementById('coloredBarChart').style.paddingBottom = '30px';
      }
      if (this.chartId == 'coloredBarChartBigAir') {
        document.getElementById('coloredBarChartBigAir').style.minHeight =
          '250px';
        // document.getElementById("coloredBarChartBigAir").style.paddingBottom="30px";
      }
    }
  }

  roundBar() {
    Chart['elements'].Rectangle.prototype.draw = function () {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var left, right, top, bottom, signX, signY, borderSkipped, radius;
      var borderWidth = vm.borderWidth;
      var cornerRadius = 10;

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

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
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

      // Corner points, from bottom-left to bottom-right clockwise
      // | 1 2 |
      // | 0 3 |
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
        return corners[(startCorner + index) % 2];
      }

      // Draw rectangle from 'startCorner'
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

        ctx.moveTo(x + radius, y);
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
    };
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
        type: 'bar',

        data: this.chartData,
        options: this.chartOptions,
      });
    }
    this.roundBar();
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
