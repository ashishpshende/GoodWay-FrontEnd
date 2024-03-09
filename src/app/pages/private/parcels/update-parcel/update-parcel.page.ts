import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Parcel } from 'src/app/models/Parcel';
import { User } from 'src/app/models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Component({
  selector: 'app-update-parcel',
  templateUrl: './update-parcel.page.html',
  styleUrls: ['./update-parcel.page.scss'],
})
export class UpdateParcelPage implements OnInit {
  public loggedInUser: User;
  public parcel: Parcel;
  public cnTypes: Array<string> = [];
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private parcelService: ParcelService,
    private router: Router,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private loaderService: LoaderService
  ) {
    this.parcel = new Parcel({});
    this.loggedInUser = this.authorizationService.loggedInUser;
    this.cnTypes = this.parcelService.cnTypes;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        if (params['cnNo']) {
          this.parcel.cnNo = params['cnNo'];
          this.getParceDetails(this.parcel.cnNo);
        }
      }
    });
    if (this.authorizationService.loggedInUser.userRole != 'SubDealer') {
    }
  }

  getParceDetails(cnNo: string) {
    this.loaderService.customLoader('Loading Details...', 5000);
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          this.parcel = results.data;

          if (
            this.parcel.parcelTo === this.loggedInUser.city ||
            this.loggedInUser.userRole === 'Admin'
          ) {
            this.parcelService.selectedParcel = results.data;
          } else {
          }
        } else {
        }
      },
      () => {}
    );
  }
  goToParcelList() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/parcel-list'], navigationExtras);
  }
  validateMobileNumber() {
    // Remove non-digit characters from the mobile number
    this.parcel.mobile = this.parcel.mobile.replace(/\D/g, '');

    // Implement any additional validation logic as needed
    const phoneRegex = /^\d{10}$/; // Example: 10 digits only

    if (phoneRegex.test(this.parcel.mobile) && this.parcel.mobile.length===10) {
      console.log('Valid phone number:', this.parcel.mobile);
      // Add further logic if the phone number is valid
    } else {
      this.presentAlert(
        this.languageService.translate(
          'PARCEL_UPDATE.INVALID_MOBILE_NUMBER_TITLE'
        ),
        this.languageService.translate(
          'PARCEL_UPDATE.INVALID_MOBILE_NUMBER_MESSAGE'
        )
      );
    }
    // If you need the cleaned mobile number for further processing
  }
  validateWeight() {
    this.parcel.weight = this.parcel.weight.replace(/\D/g, '');
    if (Number.parseInt(this.parcel.weight) > 0) {
      console.log('Valid Weight:', this.parcel.weight);
    } else {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.INVALID_WEIGHT_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.INVALID_WEIGHT_MESSAGE')
      );
    }
  }
  validateQuantity() {
    this.parcel.quantity = this.parcel.quantity.replace(/\D/g, '');

    if (Number.parseInt(this.parcel.quantity) > 0) {
      console.log('Valid quantity:', this.parcel.quantity);
    } else {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.INVALID_QUANTITY_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.INVALID_QUANTITY_MESSAGE')
      );
    }
  }
  validateAmount() {
    if (!this.parcel.amount) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_AMOUNT_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_AMOUNT_MESSAGE')
      );
    }
  }
  validate(): boolean {
    if (!this.parcel.cnType) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_CN_TYPE_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_CN_TYPE_MESSAGE')
      );
      return false;
    }
    if (!this.parcel.quantity) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_QUANTITY_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_QUANTITY_MESSAGE')
      );
      return false;
    }
    if (!this.parcel.weight) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_WEIGHT_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_WEIGHT_MESSAGE')
      );
      return false;
    }
    if (!this.parcel.amount) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_AMOUNT_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_AMOUNT_MESSAGE')
      );
      return false;
    }

    if (!this.parcel.parcelFrom) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_FROM_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_FROM_MESSAGE')
      );
      return false;
    }

    if (!this.parcel.parcelTo) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_TO_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_TO_MESSAGE')
      );
      return false;
    }

    if (!this.parcel.receiver) {
      this.presentAlert(
        this.languageService.translate('PARCEL_UPDATE.EMPTY_RECEIVER_TITLE'),
        this.languageService.translate('PARCEL_UPDATE.EMPTY_RECEIVER_MESSAGE')
      );
      return false;
    }

    if (!this.parcel.mobile) {
      this.presentAlert(
        this.languageService.translate(
          'PARCEL_UPDATE.EMPTY_MOBILE_NUMBER_TITLE'
        ),
        this.languageService.translate(
          'PARCEL_UPDATE.EMPTY_MOBILE_NUMBER_MESSAGE'
        )
      );
      return false;
    }
    if (this.parcel.mobile.length<10) {
      this.presentAlert(
        this.languageService.translate(
          'PARCEL_UPDATE.INVALID_MOBILE_NUMBER_TITLE'
        ),
        this.languageService.translate(
          'PARCEL_UPDATE.INVALID_MOBILE_NUMBER_MESSAGE'
        )
      );
      return false;
    }
    return true;
  }
  updateButtonClicked() {
    if (this.validate()) {
      this.loaderService.customLoader('Updating Parcel...', 10000);
      this.parcel.createdOn = formatDate(
        new Date(),
        KeywordConstants.DATE_FORMAT_STRING,
        KeywordConstants.DATE_FORMAT_LANGUAGE,
        KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET
      );
      this.parcel.updatedOn = formatDate(
        new Date(),
        KeywordConstants.DATE_FORMAT_STRING,
        KeywordConstants.DATE_FORMAT_LANGUAGE,
        KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET
      );
      this.parcelService.update(
        this.parcel,
        (results: any) => {
          this.goToParcelList();
          this.loaderService.dismissLoader();
        },
        () => {
          this.loaderService.dismissLoader();
        }
      );
    }
  }
  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('PARCEL_UPDATE.TITLE'),
    message = this.languageService.translate(
      'PARCEL_UPDATE.REGISTRATION_FAILED'
    )
  ) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert-class',
      header: headerTitle,
      subHeader: '',
      message,
      buttons: [this.languageService.translate('BUTTONS.OK')],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}
