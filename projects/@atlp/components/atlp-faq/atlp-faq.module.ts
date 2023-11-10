import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Export module's public API
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ATLPFAQRoutingModule } from './atlp-faq.routing';
import { AtlpFaqComponent } from './components/faq/faq.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatExpansionModule,
    TranslateModule,
    ATLPFAQRoutingModule,
    MatButtonModule,
  ],
  declarations: [AtlpFaqComponent],
})
export class AtlpFaqModule {}
