import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelListPageRoutingModule } from './parcel-list-routing.module';

import { ParcelListPage } from './parcel-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelListPageRoutingModule
  ],
  declarations: [ParcelListPage]
})
export class ParcelListPageModule {}
