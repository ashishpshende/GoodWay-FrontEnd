import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSubDealerPageRoutingModule } from './update-sub-dealer-routing.module';

import { UpdateSubDealerPage } from './update-sub-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSubDealerPageRoutingModule
  ],
  declarations: [UpdateSubDealerPage]
})
export class UpdateSubDealerPageModule {}
