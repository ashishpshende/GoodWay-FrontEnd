import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerListPage } from './dealer-list.page';

const routes: Routes = [
  {
    path: '',
    component: DealerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerListPageRoutingModule {}
