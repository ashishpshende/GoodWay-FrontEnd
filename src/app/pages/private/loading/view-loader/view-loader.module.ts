import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLoaderPageRoutingModule } from './view-loader-routing.module';

import { ViewLoaderPage } from './view-loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLoaderPageRoutingModule
  ],
  declarations: [ViewLoaderPage]
})
export class ViewLoaderPageModule {}
