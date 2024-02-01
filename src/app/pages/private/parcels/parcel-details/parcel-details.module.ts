import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelDetailsPageRoutingModule } from './parcel-details-routing.module';

import { ParcelDetailsPage } from './parcel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelDetailsPageRoutingModule
  ],
  declarations: [ParcelDetailsPage]
})
export class ParcelDetailsPageModule {}
