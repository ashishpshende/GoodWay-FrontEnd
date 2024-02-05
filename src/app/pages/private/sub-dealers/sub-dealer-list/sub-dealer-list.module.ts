import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubDealerListPageRoutingModule } from './sub-dealer-list-routing.module';

import { SubDealerListPage } from './sub-dealer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubDealerListPageRoutingModule
  ],
  declarations: [SubDealerListPage]
})
export class SubDealerListPageModule {}
