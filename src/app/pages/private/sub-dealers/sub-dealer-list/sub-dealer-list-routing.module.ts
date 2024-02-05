import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubDealerListPage } from './sub-dealer-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubDealerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubDealerListPageRoutingModule {}
