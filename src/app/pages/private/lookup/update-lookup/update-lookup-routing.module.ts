import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLookupPage } from './update-lookup.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLookupPageRoutingModule {}
