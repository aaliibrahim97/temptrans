import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarInterceptor } from './progress-bar.interceptor';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [ProgressBarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressBarInterceptor,
      multi: true,
    },
  ],
})
export class ProgressBarInterceptorModule {}
