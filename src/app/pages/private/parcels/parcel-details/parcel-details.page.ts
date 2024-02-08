import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';

import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.page.html',
  styleUrls: ['./parcel-details.page.scss'],
})
export class ParcelDetailsPage implements OnInit  {

  public selectedParcel:Parcel ;
  public loggedInUser:User ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parcelService:ParcelService,
    public loaderService: LoaderService,
    private authorizationService:AuthorizationService
  ) { 
    
    this.selectedParcel = parcelService.selectedParcel;
    this.loggedInUser = this.authorizationService.loggedInUser;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if (params) {     
      if(params["cnNo"])
      {
        this.selectedParcel.cnNo = params["cnNo"];
        this.getParceDetails(this.selectedParcel.cnNo);
      }     
    }
  });
  }
  getParceDetails(cnNo:string)
  {
    this.parcelService.readByCnNo(cnNo,async (results:any) => {
        if(results.statusCode=="SUCCESS")
        {
          this.selectedParcel = results.data;
          this.parcelService.selectedParcel = results.data;
        }
        else
        {

        }
      },
      () => {
      }
    );
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
