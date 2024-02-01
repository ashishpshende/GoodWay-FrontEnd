import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateUserPageRoutingModule } from './create-user-routing.module';
import { CreateUserPage } from './create-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CreateUserPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule {}

