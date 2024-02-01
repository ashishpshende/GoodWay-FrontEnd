/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-update-lookup',
  templateUrl: './update-lookup.page.html',
  styleUrls: ['./update-lookup.page.scss'],
})
export class UpdateLookupPage implements OnInit {

  public showRegistrationValidationMessage = false;
  constructor(public loadingCtrl: LoadingController,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService) {

   }

  ngOnInit() {
  }

  goToScheduleSearchList()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/lookup-list'], navigationExtras);
  }

  saveButtonClicked() {
   
  }
  updateScheduleSearch(succes: (any), failure: (any)) {
    this.loaderService.customLoader('Saving Schedule Search...', 10000);
  }

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

  foundChanged(ev){
  }
}
