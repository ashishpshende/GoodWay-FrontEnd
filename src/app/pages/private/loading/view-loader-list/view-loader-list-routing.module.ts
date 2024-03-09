import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLoaderListPage } from './view-loader-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLoaderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLoaderListPageRoutingModule {}
