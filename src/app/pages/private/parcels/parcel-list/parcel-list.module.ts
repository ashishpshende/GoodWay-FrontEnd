import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelListPageRoutingModule } from './parcel-list-routing.module';

import { ParcelListPage } from './parcel-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelListPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ParcelListPage]
})
export class ParcelListPageModule {}
