import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDealerPageRoutingModule } from './create-dealer-routing.module';

import { CreateDealerPage } from './create-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDealerPageRoutingModule
  ],
  declarations: [CreateDealerPage]
})
export class CreateDealerPageModule {}
