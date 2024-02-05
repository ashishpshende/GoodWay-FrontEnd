import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateParcelPage } from './create-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: CreateParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateParcelPageRoutingModule {}
