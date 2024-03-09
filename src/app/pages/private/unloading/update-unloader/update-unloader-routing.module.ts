import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUnloaderPage } from './update-unloader.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUnloaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUnloaderPageRoutingModule {}
