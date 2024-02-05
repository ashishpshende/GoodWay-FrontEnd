import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPageRoutingModule } from './update-user-routing.module';

import { UpdateUserPage } from './update-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterPageRoutingModule } from 'src/app/pages/public/register/register-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateUserPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [UpdateUserPage]
})
export class UpdateUserPageModule {}
