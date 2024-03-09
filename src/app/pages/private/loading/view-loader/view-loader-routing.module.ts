import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLoaderPage } from './view-loader.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLoaderPageRoutingModule {}
