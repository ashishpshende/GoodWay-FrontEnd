import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelDetailsPage } from './parcel-details.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelDetailsPageRoutingModule {}
