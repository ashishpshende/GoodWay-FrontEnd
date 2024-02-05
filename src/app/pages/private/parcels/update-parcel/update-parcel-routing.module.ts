import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateParcelPage } from './update-parcel.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateParcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateParcelPageRoutingModule {}
