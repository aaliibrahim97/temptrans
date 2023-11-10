import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AtlpProgressBarComponent } from './components/progress-bar.component';

@NgModule({
  declarations: [AtlpProgressBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [AtlpProgressBarComponent],
})
export class AtlpProgressBarModule {}
