import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUnloaderPage } from './create-unloader.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUnloaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUnloaderPageRoutingModule {}
