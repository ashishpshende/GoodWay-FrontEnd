import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDealerPage } from './create-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDealerPageRoutingModule {}
