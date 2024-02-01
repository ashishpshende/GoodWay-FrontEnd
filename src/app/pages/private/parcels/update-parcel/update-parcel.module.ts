import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateParcelPageRoutingModule } from './update-parcel-routing.module';

import { UpdateParcelPage } from './update-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateParcelPageRoutingModule
  ],
  declarations: [UpdateParcelPage]
})
export class UpdateParcelPageModule {}
