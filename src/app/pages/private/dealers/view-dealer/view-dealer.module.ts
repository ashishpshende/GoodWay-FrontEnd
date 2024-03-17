import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDealerPageRoutingModule } from './view-dealer-routing.module';

import { ViewDealerPage } from './view-dealer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViewDealerPageRoutingModule
  ],
  declarations: [ViewDealerPage]
})
export class ViewDealerPageModule {}
