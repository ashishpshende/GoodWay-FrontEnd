import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLoaderListPageRoutingModule } from './view-loader-list-routing.module';

import { ViewLoaderListPage } from './view-loader-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLoaderListPageRoutingModule
  ],
  declarations: [ViewLoaderListPage]
})
export class ViewLoaderListPageModule {}
