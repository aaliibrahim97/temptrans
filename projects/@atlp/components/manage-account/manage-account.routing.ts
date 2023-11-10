import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountComponent } from './manage-account.component';
import { ViewAllNotificationsComponent } from 'projects/@atlp/lib/atlp-layout/components/header/header-user/view-all-notifications/view-all-notifications.component';

const routes: Routes = [
  {
    path: 'view',
    component: ManageAccountComponent,
  },
  {
    path: 'view-all-notifications',
    component: ViewAllNotificationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAccountRoutingModule {}
