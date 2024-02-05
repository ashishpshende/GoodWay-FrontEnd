import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSubDealerPageRoutingModule } from './view-sub-dealer-routing.module';

import { ViewSubDealerPage } from './view-sub-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSubDealerPageRoutingModule
  ],
  declarations: [ViewSubDealerPage]
})
export class ViewSubDealerPageModule {}
