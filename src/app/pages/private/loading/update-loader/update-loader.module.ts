import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLoaderPageRoutingModule } from './update-loader-routing.module';

import { UpdateLoaderPage } from './update-loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLoaderPageRoutingModule
  ],
  declarations: [UpdateLoaderPage]
})
export class UpdateLoaderPageModule {}
