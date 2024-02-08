import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { LoadingController, AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  public selectedParcel: Parcel;
  public loggedInUser: User;

  constructor(
    private parcelService: ParcelService,
    private router: Router,
    private loaderService: LoaderService,    
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService
  ) {
    this.selectedParcel = new Parcel({});
    this.loggedInUser = this.authorizationService.loggedInUser;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        if (params['cnNo']) {
          this.selectedParcel.cnNo = params['cnNo'];
          this.getParceDetails(this.selectedParcel.cnNo);
        }
      }
    });
  }

  markAsDelivered() {

    this.loaderService.customLoader("Updating Details...", 5000);
    this.selectedParcel.parcelStatus = KeywordConstants.PARCEL_STATUS_DELIVERED;
    this.parcelService.updateStatus(this.selectedParcel,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {

        } else {
        }
      },
      () => {
        this.loaderService.dismissLoader();
      }
    );
  }
  viewButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/view-parcel'], navigationExtras);
  }
  editButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/update-parcel'], navigationExtras);
  }
  closeuttonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/parcel-list'], navigationExtras);
  }
  getParceDetails(cnNo: string) {
    this.loaderService.customLoader("Loading Details...", 5000);
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          this.selectedParcel = results.data;
          this.parcelService.selectedParcel = results.data;
        } else {
        }
      },
      () => {}
    );
  }
    //Alerts
    async presentAlert(headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: headerTitle,
        subHeader: '',
        message,
        buttons: [
          {
            text: this.languageService.translate('BUTTONS.OK'),
            role: 'confirm',
            handler: () => {
              //this.logout();
            }
          }
        ]
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    }
}
