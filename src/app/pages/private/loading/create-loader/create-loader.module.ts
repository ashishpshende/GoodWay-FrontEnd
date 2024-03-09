import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLoaderPageRoutingModule } from './create-loader-routing.module';

import { CreateLoaderPage } from './create-loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLoaderPageRoutingModule
  ],
  declarations: [CreateLoaderPage]
})
export class CreateLoaderPageModule {}
