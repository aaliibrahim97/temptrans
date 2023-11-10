import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyChartComponent } from './components/my-chart/my-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ColoredBarChartComponent } from './components/colored-bar-chart/colored-bar-chart.component';
import { BorderDashComponent } from './components/border-dash/border-dash.component';
import { BorderLineComponent } from './components/border-line/border-line.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import { MatrixSmallComponent } from './components/matrix-small/matrix-small.component';

const importsAndExports = [
  BarChartComponent,
  BorderDashComponent,
  HorizontalBarComponent,
  LineChartComponent,
  ColoredBarChartComponent,
  DoughnutChartComponent,
  MyChartComponent,
  BorderLineComponent,
  MatrixComponent,
  MatrixSmallComponent,
];

@NgModule({
  declarations: [...importsAndExports],
  imports: [CommonModule],
  exports: [...importsAndExports],
  providers: [],
  bootstrap: [],
})
export class ChartModule {}
