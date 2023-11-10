import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlpMatAutocompleteModule } from '../atlp-input-autocomplete.module';
import { AtlpAutoCompleteExampleComponent } from './components/atlp-auto-complete-example.component';

const routes: Routes = [
  {
    path: '',
    component: AtlpAutoCompleteExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtlpAutoCompleteExampleRoutingModule {}
