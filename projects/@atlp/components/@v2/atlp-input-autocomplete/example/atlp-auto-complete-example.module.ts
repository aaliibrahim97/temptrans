import { NgModule } from '@angular/core';
import { AtlpMatAutocompleteModule } from '../atlp-input-autocomplete.module';
import { AtlpAutoCompleteExampleRoutingModule } from './atlp-auto-complete-example-route.module';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpAutoCompleteExampleComponent } from './components/atlp-auto-complete-example.component';

@NgModule({
  imports: [
    AtlpMatAutocompleteModule,
    AtlpAutoCompleteExampleRoutingModule,
    AtlpSharedModule,
    AtlpCoreSharedModule
  ],
  declarations: [AtlpAutoCompleteExampleComponent],
  exports: [],
  providers: [],
})
export class AtlpMatAutocompleteExampleModule {}
