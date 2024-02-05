import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';

import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.page.html',
  styleUrls: ['./parcel-details.page.scss'],
})
export class ParcelDetailsPage  {

  public selectedParcel:Parcel ;
  public loggedInUser:User ;

  constructor(
    private router: Router,
    private parcelService:ParcelService,
    private authorizationService:AuthorizationService
  ) { 
    this.selectedParcel = parcelService.selectedParcel;
    this.loggedInUser = this.authorizationService.loggedInUser;
  }
 
  goToParcelList()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/parcel-list"], navigationExtras);
  }
  qrClicked()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/qr-code"], navigationExtras);
  }
}
