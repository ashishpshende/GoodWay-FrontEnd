import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUnloaderListPage } from './view-unloader-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUnloaderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUnloaderListPageRoutingModule {}
