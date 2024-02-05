import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelDetailsPageRoutingModule } from './parcel-details-routing.module';

import { ParcelDetailsPage } from './parcel-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelDetailsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ParcelDetailsPage]
})
export class ParcelDetailsPageModule {}
