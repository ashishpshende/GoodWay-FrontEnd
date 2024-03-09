import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDealerPage } from './update-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDealerPageRoutingModule {}
