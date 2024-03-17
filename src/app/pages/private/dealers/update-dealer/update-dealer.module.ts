import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDealerPageRoutingModule } from './update-dealer-routing.module';

import { UpdateDealerPage } from './update-dealer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    UpdateDealerPageRoutingModule
  ],
  declarations: [UpdateDealerPage]
})
export class UpdateDealerPageModule {}
