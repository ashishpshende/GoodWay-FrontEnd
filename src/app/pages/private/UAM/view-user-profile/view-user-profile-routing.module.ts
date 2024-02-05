import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserProfilePage } from './view-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserProfilePageRoutingModule {}
