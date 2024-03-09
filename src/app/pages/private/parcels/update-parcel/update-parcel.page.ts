import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Parcel } from 'src/app/models/Parcel';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-parcel',
  templateUrl: './update-parcel.page.html',
  styleUrls: ['./update-parcel.page.scss'],
})
export class UpdateParcelPage {
  public autocompleteOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape'];

  public parcel: Parcel;
  public cnTypes: Array<string> = [];
  constructor( public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private parcelService: ParcelService,
    private router: Router,
    private loaderService: LoaderService) {
      this.parcel = new Parcel({});
      this.cnTypes = ['TBB', 'Standard', 'Fragile'];
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
  saveButtonClicked()
  {
    this.loaderService.customLoader("Updating Parcel...", 10000);
    this.parcel.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.parcel.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.parcelService.update(this.parcel, (results:any) => {
      this.goToParcelList();
      this.loaderService.dismissLoader();
    }, () =>{
      this.loaderService.dismissLoader();
    });
  }
}
