import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUnloaderPageRoutingModule } from './update-unloader-routing.module';

import { UpdateUnloaderPage } from './update-unloader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUnloaderPageRoutingModule
  ],
  declarations: [UpdateUnloaderPage]
})
export class UpdateUnloaderPageModule {}
