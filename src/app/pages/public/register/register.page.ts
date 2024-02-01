import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User;
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  public onRegisterForm: FormGroup;
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
    this.user.Role = "User";
    this.user.Status = "InActive";
    //For testing
    this.user.FirstName = "";
    this.user.LastName = "";
    this.user.Email = "";
    this.user.PhoneNumber = "";
    this.user.UserName = "";
    this.user.Gender = "";
  }
  ionViewWillEnter() {
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }
  SaveUser(succes: (any), failure: (any)) {
    this.loaderService.customLoader("Saving User...", 10000);
    this.user.Password = "password";
    this.user.ResetRequired = true;
    this.userService.SaveUser(this.user, results => {
      this.loaderService.dismissLoader();
      succes(this.user);
    }, error => {
      this.loaderService.dismissLoader();
      failure();
    });
  }
  checkEmailExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for Email...", 10000);
    this.userService.readByEmail(this.user.Email, results => {
      this.loaderService.dismissLoader();
      if (results.length != 0) {
        present(new User(results[0]))
      }
      else {
        absent();
      }
    }, error => {
      this.loaderService.dismissLoader();
      absent();
    });
  }
  checkUserNameExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for User Name...", 10000);
    this.userService.readByUserName(this.user.UserName, results => {
      this.loaderService.dismissLoader();
      if (results.length != 0) {
        present(new User(results[0]))
      }
      else {
        absent();
      }
    }, error => {
      this.loaderService.dismissLoader();
      absent();
    });
  }

  SaveButtonClicked() {
    if (this.userService.Validate(this.user)) {
      this.checkEmailExistance(
        existinguser => {
          this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_EMAIL_ALREADY_EXISTS"))
        },
        absent => {
          this.checkUserNameExistance(existinguser => {
            this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_USERNAME_ALREADY_EXISTS"))

          }, absent => {
            this.SaveUser(success => {
              this.user = success;

              this.GotoLogin();
            }, failure => {
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
