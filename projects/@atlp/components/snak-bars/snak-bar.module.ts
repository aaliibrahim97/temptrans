import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AtlpCustomSnakBarComponent } from './custom-snak-bar/custom-snak-bar.component';
import { SnakBarService } from './service/snak-bar-default.component';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSnakBarMatIconSelectorPipe } from './pipes/atlp-mat-snakbar-icon-selector.pipe';
import { AtlpPipesModule } from 'projects/@atlp/pipes/pipes.module';

@NgModule({
  declarations: [
    AtlpCustomSnakBarComponent,
    AtlpSnakBarMatIconSelectorPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule,
    AtlpPipesModule
  ],
  exports: [
    AtlpCustomSnakBarComponent,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    AtlpSnakBarMatIconSelectorPipe,
  ],
  entryComponents: [AtlpCustomSnakBarComponent],
  providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }, SnakBarService],
})
export class AtlpSnakBarModule {}
