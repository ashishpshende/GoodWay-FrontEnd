import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUnloaderListPageRoutingModule } from './view-unloader-list-routing.module';

import { ViewUnloaderListPage } from './view-unloader-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUnloaderListPageRoutingModule
  ],
  declarations: [ViewUnloaderListPage]
})
export class ViewUnloaderListPageModule {}
