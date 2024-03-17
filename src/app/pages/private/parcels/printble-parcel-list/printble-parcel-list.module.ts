import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { IonicModule } from '@ionic/angular';

import { PrintbleParcelListPageRoutingModule } from './printble-parcel-list-routing.module';

import { PrintbleParcelListPage } from './printble-parcel-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    QRCodeModule,
    PrintbleParcelListPageRoutingModule
  ],
  declarations: [PrintbleParcelListPage]
})
export class PrintbleParcelListPageModule {}
