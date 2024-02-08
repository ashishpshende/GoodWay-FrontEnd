import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {
  public user: User;
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  public onRegisterForm: FormGroup ;
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.user = new User(JSON.parse("{}"));
    this.genders = this.userService.genders;
    this.roles = this.userService.roles;
    this.statuses = this.userService.statuses;
    this.user.userRole= "User";
    this.user.userStatus = "InActive";
    //For testing
    this.user.name = "";
    this.user.email = "";
    this.user.phoneNumber = "";
    this.user.userName = "";
  }
  ionViewWillEnter() {
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  SaveUser(succes: (any), failure: (any)) {
    this.loaderService.customLoader("Saving User...", 10000);
    this.user.password = "password";
    this.user.resetRequired = true;
    this.userService.SaveUser(this.user, () => {
      this.loaderService.dismissLoader();
      succes(this.user);
    }, () => {
      this.loaderService.dismissLoader();
      failure();
    });
  }
  checkEmailExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for Email...", 10000);
    this.userService.readByEmail(this.user.email, (results:any) => {
      this.loaderService.dismissLoader();
      if (results.length != 0) {
        present(new User(results[0]))
      }
      else {
        absent();
      }
    }, () => {
      this.loaderService.dismissLoader();
      absent();
    });
  }
  checkUserNameExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for User Name...", 10000);
    this.userService.readByUserName(this.user.userName, (results:any) => {
      this.loaderService.dismissLoader();
      if (results.length != 0) {
        present(new User(results[0]))
      }
      else {
        absent();
      }
    }, () => {
      this.loaderService.dismissLoader();
      absent();
    });
  }

  SaveButtonClicked() {
    if (this.userService.Validate(this.user)) {
      this.checkEmailExistance(
        () => {
          this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_EMAIL_ALREADY_EXISTS"))
        },
        () => {
          this.checkUserNameExistance(() => {
            this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_USERNAME_ALREADY_EXISTS"))

          }, () => {
            this.SaveUser((response:User) => {
              this.user = response;

              this.GotoLogin();
            }, () => {
              this.presentAlert(this.languageService.translate("SIGN_UP.REGISTRATION_FAILED"), this.languageService.translate("SIGN_UP.REGISTRATION_FAILED_MESSAGE"))
            });
          });
        });
    }
    else {
      this.presentAlert(this.languageService.translate("SIGN_UP.EMPTY_DETAILS"), this.languageService.translate("SIGN_UP.EMPTY_DETAILS_MESSAGE"))
    }
  }
  CancelButtonClicked() {
    this.GotoLogin();
  }
  GotoLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["login"], navigationExtras);
  }
  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('SIGN_UP.TITLE'), message = this.languageService.translate('SIGN_UP.REGISTRATION_FAILED')) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert-class',
      header: headerTitle,
      subHeader: "",
      message: message,
      buttons: [this.languageService.translate('BUTTONS.OK')]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

}
