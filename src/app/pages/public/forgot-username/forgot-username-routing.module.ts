import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotUsernamePage } from './forgot-username.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotUsernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotUsernamePageRoutingModule {}
