import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSubDealerPage } from './update-sub-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSubDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSubDealerPageRoutingModule {}
