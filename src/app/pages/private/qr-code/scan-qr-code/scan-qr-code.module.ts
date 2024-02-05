import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrCodePageRoutingModule } from './scan-qr-code-routing.module';

import { ScanQrCodePage } from './scan-qr-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQrCodePageRoutingModule
  ],
  declarations: [ScanQrCodePage]
})
export class ScanQrCodePageModule {}
