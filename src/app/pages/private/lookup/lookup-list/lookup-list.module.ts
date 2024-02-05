import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LookupListPageRoutingModule } from './lookup-list-routing.module';

import { LookupListPage } from './lookup-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LookupListPageRoutingModule,
    TranslateModule
  ],
  declarations: [LookupListPage]
})
export class LookupListPageModule {}
