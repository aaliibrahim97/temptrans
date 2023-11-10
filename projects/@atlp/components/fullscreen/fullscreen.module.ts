import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { AtlpFullscreenComponent } from './components/fullscreen.component';

@NgModule({
  declarations: [AtlpFullscreenComponent],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  exports: [AtlpFullscreenComponent],
})
export class AtlpFullscreenModule {}
