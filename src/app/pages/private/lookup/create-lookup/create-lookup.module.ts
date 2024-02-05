import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLookupPageRoutingModule } from './create-lookup-routing.module';

import { CreateLookupPage } from './create-lookup.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLookupPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateLookupPage]
})
export class CreateLookupPageModule {}
