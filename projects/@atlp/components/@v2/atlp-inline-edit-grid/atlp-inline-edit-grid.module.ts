import { NgModule } from '@angular/core';
import { AtlpInlineEditGridComponent } from './components/atlp-inline-edit-grid.component';
import { CommonModule } from '@angular/common';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpDirectivesModule } from 'projects/@atlp/directives/directives';
import { AtlpMatAutocompleteModule } from '../atlp-input-autocomplete/atlp-input-autocomplete.module';
import { AtlpLookUpModule } from '../atlp-lookup/atlp-lookup.module';
import { AtlpFileUploadButtonModule } from '../file-upload/atlp-file-upload-button/atlp-file-upload-button.module';

@NgModule({
  declarations: [AtlpInlineEditGridComponent],
  imports: [
    CommonModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    AtlpDirectivesModule,
    AtlpMatAutocompleteModule,
    AtlpLookUpModule,
    AtlpFileUploadButtonModule,
  ],
  exports: [AtlpInlineEditGridComponent],
  providers: [],
})
export class AtlpInlineEditGridModule {}
