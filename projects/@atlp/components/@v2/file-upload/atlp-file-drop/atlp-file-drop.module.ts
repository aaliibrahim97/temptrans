import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSnakBarModule } from 'projects/@atlp/components/snak-bars/snak-bar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtlpFileDropComponent } from './components/atlp-file-drop.component';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [AtlpFileDropComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    TranslateModule.forChild(),
    AtlpSnakBarModule,
    FlexLayoutModule,
  ],
  exports: [AtlpFileDropComponent],
  providers: [],
})
export class AtlpFileDropModule {}
