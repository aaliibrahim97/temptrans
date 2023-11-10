import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AtlpAutocompleteComponent } from './components/atlp-input-autocomplete.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { AtlpAutoCompleteDataService } from './services/atlp-auto-complete.service';
import { CommonModule } from '@angular/common';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpLookUpModule } from '../atlp-lookup/atlp-lookup.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    AtlpSharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    AtlpLookUpModule,
    TranslateModule,
  ],
  declarations: [AtlpAutocompleteComponent],
  exports: [AtlpAutocompleteComponent],
  providers: [AtlpAutoCompleteDataService],
})
export class AtlpMatAutocompleteModule {}
