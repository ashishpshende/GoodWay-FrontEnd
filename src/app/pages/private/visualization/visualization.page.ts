import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { User } from '../../../models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { VisualizationService } from 'src/app/services/visualization/visualization.service';



@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.page.html',
  styleUrls: ['./visualization.page.scss'],
})
export class VisualizationPage  {
  
}
