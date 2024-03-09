import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLoaderPage } from './create-loader.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLoaderPageRoutingModule {}
