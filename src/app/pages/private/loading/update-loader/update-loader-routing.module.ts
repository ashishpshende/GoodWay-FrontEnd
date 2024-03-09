import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLoaderPage } from './update-loader.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLoaderPageRoutingModule {}
