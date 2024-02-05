import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealerListPageRoutingModule } from './dealer-list-routing.module';

import { DealerListPage } from './dealer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerListPageRoutingModule
  ],
  declarations: [DealerListPage]
})
export class DealerListPageModule {}
