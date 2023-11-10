import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpProgressBarModule } from '../progress-bar/progress-bar.module';
import { AtlpGraphSelectionComponent } from './components/atlp-graph-selection.component';

@NgModule({
  declarations: [AtlpGraphSelectionComponent],
  imports: [CommonModule, MatIconModule, AtlpProgressBarModule],
  exports: [AtlpGraphSelectionComponent],
})
export class AtlpGraphSelectionModule {}
