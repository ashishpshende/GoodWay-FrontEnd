import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSubDealerPageRoutingModule } from './create-sub-dealer-routing.module';

import { CreateSubDealerPage } from './create-sub-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSubDealerPageRoutingModule
  ],
  declarations: [CreateSubDealerPage]
})
export class CreateSubDealerPageModule {}
