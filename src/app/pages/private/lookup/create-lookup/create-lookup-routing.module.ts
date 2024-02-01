import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLookupPage } from './create-lookup.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLookupPageRoutingModule {}
