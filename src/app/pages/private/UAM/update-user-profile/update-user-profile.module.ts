import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserProfilePageRoutingModule } from './update-user-profile-routing.module';

import { UpdateUserProfilePage } from './update-user-profile.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateUserProfilePageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [UpdateUserProfilePage]
})
export class UpdateUserProfilePageModule {}
