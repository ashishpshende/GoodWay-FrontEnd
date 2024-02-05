/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-create-lookup',
  templateUrl: './create-lookup.page.html',
  styleUrls: ['./create-lookup.page.scss'],
})
export class CreateLookupPage implements OnInit {
  public enableSave=false;
  public emailValidationMessage='';
  public phoneNumberValidationMessage='';
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  public showRegistrationValidationMessage = false;
  constructor(
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService
  ) {

  }
  ngOnInit() {
    this.enableSave = false;
  }
  ionViewWillEnter() {
  }
  SaveScheduleSearch(succes: (any), failure: (any)) {
    this.loaderService.customLoader('Saving Schedule Search...', 10000);
  }
  goToScheduleSearchList()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/lookup-list'], navigationExtras);
  }

   SaveButtonClicked() {

  }

  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('SIGN_UP.TITLE'), message = this.languageService.translate('SIGN_UP.REGISTRATION_FAILED')) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert-class',
      header: headerTitle,
      subHeader: '',
      message,
      buttons: [this.languageService.translate('BUTTONS.OK')]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
