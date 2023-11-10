import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlpLookupExampleComponent } from './components/atlp-lookup-example.component';

const routes: Routes = [
  {
    path: '',
    component: AtlpLookupExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtlpInputLookupExampleRoutingModule {}
