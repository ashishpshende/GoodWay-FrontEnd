import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateParcelPageRoutingModule } from './create-parcel-routing.module';

import { CreateParcelPage } from './create-parcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateParcelPageRoutingModule
  ],
  declarations: [CreateParcelPage]
})
export class CreateParcelPageModule {}
