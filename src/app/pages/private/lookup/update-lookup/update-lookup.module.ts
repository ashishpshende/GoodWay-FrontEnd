import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLookupPageRoutingModule } from './update-lookup-routing.module';

import { UpdateLookupPage } from './update-lookup.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLookupPageRoutingModule,
    TranslateModule
  ],
  declarations: [UpdateLookupPage]
})
export class UpdateLookupPageModule {}
