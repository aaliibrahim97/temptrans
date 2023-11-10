import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPreferenceComponent } from './user-preference.component';

const routes: Routes = [
  {
    path: '',
    component: UserPreferenceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPreferenceRoutingModule {}
