import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LookupListPage } from './lookup-list.page';

const routes: Routes = [
  {
    path: '',
    component: LookupListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupListPageRoutingModule {}
