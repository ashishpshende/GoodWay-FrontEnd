import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserProfilePageRoutingModule } from './view-user-profile-routing.module';

import { ViewUserProfilePage } from './view-user-profile.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserProfilePageRoutingModule,    
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [ViewUserProfilePage]
})
export class ViewUserProfilePageModule {}
