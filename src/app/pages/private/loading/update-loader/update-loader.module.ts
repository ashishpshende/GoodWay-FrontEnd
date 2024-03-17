import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLoaderPageRoutingModule } from './update-loader-routing.module';

import { UpdateLoaderPage } from './update-loader.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UpdateLoaderPageRoutingModule
  ],
  declarations: [UpdateLoaderPage]
})
export class UpdateLoaderPageModule {}
