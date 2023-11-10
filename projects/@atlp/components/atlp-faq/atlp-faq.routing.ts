import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlpFaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: AtlpFaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ATLPFAQRoutingModule {}
