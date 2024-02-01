import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelListPage } from './parcel-list.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelListPageRoutingModule {}
