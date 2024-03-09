import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDealerPageRoutingModule } from './update-dealer-routing.module';

import { UpdateDealerPage } from './update-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDealerPageRoutingModule
  ],
  declarations: [UpdateDealerPage]
})
export class UpdateDealerPageModule {}
