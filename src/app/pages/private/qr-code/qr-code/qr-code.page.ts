import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  public selectedParcel:Parcel;
  public loggedInUser:User;

  constructor(
    private parcelService:ParcelService,
    private router: Router,
    private authorizationService:AuthorizationService
  ) { 
    this.selectedParcel = parcelService.selectedParcel;
    this.loggedInUser = this.authorizationService.loggedInUser;
  }

  ngOnInit() {

  }
  markAsDelivered()
  {

  }
  viewButtonClicked()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/view-parcel"], navigationExtras);
  }
  editButtonClicked()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/update-parcel"], navigationExtras);
  }
  closeuttonClicked()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/parcel-list"], navigationExtras);
  }
}
