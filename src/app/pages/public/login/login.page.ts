import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { NgEventBus } from 'ng-event-bus';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,AfterViewInit {
  userName: string;
  password: string;
  showUsernameValidationMessage: boolean;
  showPasswordValidationMessage: boolean;
  frontendValidation: boolean;
  backendValidation: boolean;
  public appTitle: String;
  resetRequired: boolean;
  loading: any;

  public user = null;
  constructor(
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private userService: UserService,
    private languageService: LanguageService  ) {


    this.showUsernameValidationMessage = false;
    this.showPasswordValidationMessage = false;
  }
  ngAfterViewInit(): void {
    this.userName =  '';
    this.password =  '';
  }

  ionViewWillEnter() {

  }
  validate() {
    var result = true;
    if (this.userName == null || this.userName === '') {

      this.showUsernameValidationMessage = true;
      result = false;
    }
    if (this.password == null || this.password === '') {
      this.showPasswordValidationMessage = true;
      result = false;
    }
    return result;
  }
  async ngOnInit() {
    this.resetRequired = false;
  }

  async presentLoading(loading) {
    await loading.present();
  }


  goToRegister() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(['/register'],navigationExtras);
  }

  goToHome() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(['/home'],navigationExtras);
  }

  //Click Events
  forgotPasswordLinkClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(['/forgot-password'],navigationExtras)
  }
  forgotUserLinkClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(['/forgot-username'],navigationExtras)
  }
  async loginButtonClicked() {
    this.backendValidation = false;
    if (this.validate()) {
      this.loading = await this.loadingController.create({
        message:  this.languageService.translate('LOGIN.SIGN_IN_PROGRESS_MESSAGE'),
        duration: 10000,
      });
      this.loading.present();
      this.userService.login(this.userName, this.password, async () => {
        this.backendValidation = true;
        this.loading.dismiss();
        let navigationExtras: NavigationExtras = {
          queryParams: {
            ts: new Date().getTime()
          }
        };
        this.router.navigate(['/home'],navigationExtras);
      },
        failure => {
          this.loading.dismiss();
          this.backendValidation = false;
          switch (failure) {
            case "INVALID_CREDENTAILS":
              this.resetRequired = false;
              this.presentAlert(this.languageService.translate('LOGIN.INVALID_CREDENTIALS_ERROR_TITLE'),this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE'));
              break;
            case "INACTIVE_USER":
              this.resetRequired = false;
              this.presentAlert(this.languageService.translate('LOGIN.INACTIVE_ACCOUNT_ERROR_TITLE'),this.languageService.translate('LOGIN.ERROR_INACTIVE_ACCOUNT_MESSAGE'));
              break;
            case "SUSPENDED_USER":
              this.resetRequired = false;
              this.presentAlert(this.languageService.translate('LOGIN.SUSPENDED_ACCOUNT_ERROR_TITLE'),this.languageService.translate('LOGIN.ERROR_SUSPENDED_ACCOUNT_MESSAGE'));
              break;
            case "RESET_REQUIRED":
              this.resetRequired = true;
              this.presentAlert(this.languageService.translate('LOGIN.PASSWORD_RESET_REQUIRED_ERROR_TITLE'),this.languageService.translate('LOGIN.PASSWORD_RESET_REQUIRED_ACCOUNT_MESSAGE'));
              break;
          }

        });
    }
    else {

    }
  }
  signupLinkClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(['/register'],navigationExtras)
  }
  languageLinkClicked() {

    this.languageService.presentLanguageSelctionMenu(()=>{});
  }


  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: "",
      message: message,
      buttons: [
         {
          text: this.languageService.translate('BUTTONS.OK'),
          handler: () => {
            if(this.resetRequired)
            {
              this.userService.lastRoute = "login";
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  ts: new Date().getTime()
                }
              };
              this.router.navigate(['reset-password'],navigationExtras);
            }
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
