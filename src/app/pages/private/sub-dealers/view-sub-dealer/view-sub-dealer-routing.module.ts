import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSubDealerPage } from './view-sub-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSubDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSubDealerPageRoutingModule {}
