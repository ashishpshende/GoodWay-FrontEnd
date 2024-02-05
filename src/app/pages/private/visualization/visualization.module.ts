import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VisualizationPageRoutingModule } from './visualization-routing.module';
import { VisualizationPage } from './visualization.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizationPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [VisualizationPage]
})
export class VisualizationPageModule {}
