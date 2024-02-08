import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubDealerListPageRoutingModule } from './sub-dealer-list-routing.module';

import { SubDealerListPage } from './sub-dealer-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SubDealerListPageRoutingModule
  ],
  declarations: [SubDealerListPage]
})
export class SubDealerListPageModule {}
