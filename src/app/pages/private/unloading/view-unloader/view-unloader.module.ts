import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUnloaderPageRoutingModule } from './view-unloader-routing.module';

import { ViewUnloaderPage } from './view-unloader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUnloaderPageRoutingModule
  ],
  declarations: [ViewUnloaderPage]
})
export class ViewUnloaderPageModule {}
