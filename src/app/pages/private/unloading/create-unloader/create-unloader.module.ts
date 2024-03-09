import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUnloaderPageRoutingModule } from './create-unloader-routing.module';

import { CreateUnloaderPage } from './create-unloader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUnloaderPageRoutingModule
  ],
  declarations: [CreateUnloaderPage]
})
export class CreateUnloaderPageModule {}
