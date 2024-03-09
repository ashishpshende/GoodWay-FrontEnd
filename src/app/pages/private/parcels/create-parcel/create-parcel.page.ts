import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Parcel } from 'src/app/models/Parcel';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.page.html',
  styleUrls: ['./create-parcel.page.scss'],
})
export class CreateParcelPage {
  public autocompleteOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape'];

  public parcel: Parcel;
  public cnTypes: Array<string> = [];
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private parcelService: ParcelService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.parcel = new Parcel({});
    this.parcel.cnNo = this.userService.loggedInUser.prefix;
    this.cnTypes = this.parcelService.cnTypes;
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

    if (phoneRegex.test(this.parcel.mobile)) {
      console.log('Valid phone number:', this.parcel.mobile);
      // Add further logic if the phone number is valid
    } else {
      this.presentAlert(
        this.languageService.translate(
          'PARCEL_CREATE.INVALID_MOBILE_NUMBER_TITLE'
        ),
        this.languageService.translate(
          'PARCEL_CREATE.INVALID_MOBILE_NUMBER_MESSAGE'
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
        this.languageService.translate('PARCEL_CREATE.INVALID_WEIGHT_TITLE'),
        this.languageService.translate('PARCEL_CREATE.INVALID_WEIGHT_MESSAGE')
      );
    }
  }
  validateQuantity() {
    this.parcel.quantity = this.parcel.quantity.replace(/\D/g, '');

    if (Number.parseInt(this.parcel.quantity) > 0) {
      console.log('Valid quantity:', this.parcel.quantity);
    } else {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.INVALID_QUANTITY_TITLE'),
        this.languageService.translate('PARCEL_CREATE.INVALID_QUANTITY_MESSAGE')
      );
    }
  }
  validateAmount() {
    if (!this.parcel.amount) 
    {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_AMOUNT_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_AMOUNT_MESSAGE')
      );
    }
  }
  validate(): boolean {
    if (!this.parcel.cnType) 
    {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_CN_TYPE_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_CN_TYPE_MESSAGE')
      );
      return false;
    } 
    if (!this.parcel.quantity) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_QUANTITY_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_QUANTITY_MESSAGE')
      );
      return false;
    }     
    if (!this.parcel.weight) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_WEIGHT_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_WEIGHT_MESSAGE')
      );
      return false;
    } 
    if (!this.parcel.amount) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_AMOUNT_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_AMOUNT_MESSAGE')
      );
      return false;
    } 

    if (!this.parcel.parcelFrom) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_FROM_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_FROM_MESSAGE')
      );
      return false;
    } 

    if (!this.parcel.parcelTo) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_TO_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_TO_MESSAGE')
      );
      return false;
    } 

    if (!this.parcel.receiver) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_RECEIVER_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_RECEIVER_MESSAGE')
      );
      return false;
    } 

    if (!this.parcel.mobile) {
      this.presentAlert(
        this.languageService.translate('PARCEL_CREATE.EMPTY_MOBILE_NUMBER_TITLE'),
        this.languageService.translate('PARCEL_CREATE.EMPTY_MOBILE_NUMBER_MESSAGE')
      );
      return false;
    } 

    return true;
  }
  saveButtonClicked() {
    if (this.validate()) {
      this.loaderService.customLoader('Saving Parcel...', 10000);
      this.parcel.cnNo = this.userService.loggedInUser.prefix;
      this.parcel.createdBy = this.userService.loggedInUser;
      this.parcel.updatedBy = this.userService.loggedInUser;
      this.parcel.createdOn = formatDate(
        new Date(),
        'dd-MM-yyyy hh:mm:ss',
        'en-US',
        '+0530'
      );
      this.parcel.updatedOn = formatDate(
        new Date(),
        'dd-MM-yyyy hh:mm:ss',
        'en-US',
        '+0530'
      );
      this.parcelService.save(
        this.parcel,
        (results: any) => {
          this.goToParcelList();
          this.loaderService.dismissLoader();
        },
        () => {
          this.loaderService.dismissLoader();
        }
      );
    } else {
    }
  }

  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('PARCEL_CREATE.TITLE'),
    message = this.languageService.translate(
      'PARCEL_CREATE.REGISTRATION_FAILED'
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
