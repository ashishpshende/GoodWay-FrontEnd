import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintbleParcelListPage } from './printble-parcel-list.page';

const routes: Routes = [
  {
    path: '',
    component: PrintbleParcelListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintbleParcelListPageRoutingModule {}
