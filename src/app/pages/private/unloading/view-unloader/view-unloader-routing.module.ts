import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUnloaderPage } from './view-unloader.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUnloaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUnloaderPageRoutingModule {}
