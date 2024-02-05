import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserProfilePage } from './update-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserProfilePageRoutingModule {}
