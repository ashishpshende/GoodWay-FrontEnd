import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helpers/helper-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  public enableSave:boolean=false;
  public emailValidationMessage:string="";
  public phoneNumberValidationMessage:string="";
  public user: User;
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
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
    this.user.FirstName = "";
    this.user.LastName = "";
    this.user.Email = "";
    this.user.PhoneNumber = "";
    this.user.UserName = "";
    this.user.Gender = "";
    this.user.Status = "Active";
  }
  ngOnInit() {
    this.enableSave = false;
  }
  ngAfterViewInit(): void {

  }
  emailTextChanged(){
    this.validate();
  }
  phoneNumberTextChanged(){
    this.validate();
  }

  validate()
  {
    if(HelperService.validateEmail(this.user.Email) && HelperService.validateMobileNumber(this.user.PhoneNumber))
    {
      this.enableSave =true;
      this.emailValidationMessage="";
      this.phoneNumberValidationMessage="";
      return true;
    }
    else
    {
      this.enableSave =false;
      if(HelperService.validateEmail(this.user.Email))
      {
        this.emailValidationMessage="";

      }
      else{
        this.emailValidationMessage=this.languageService.translate("USER_PROFILE.EMAIL_SYNTAX_VALIDATING_MESSAGE");
        return false;
      }
      if(HelperService.validateMobileNumber(this.user.PhoneNumber))
      {
        this.phoneNumberValidationMessage="";
      }
      else{
        this.phoneNumberValidationMessage=this.languageService.translate("USER_PROFILE.PHONE_SYNTAX_VALIDATING_MESSAGE");
        return false;
      }

    }

  }
  ionViewWillEnter() {
  }
  SaveUser(succes: (any), failure: (any)) {
    this.loaderService.customLoader("Saving User...", 10000);
    this.user.Password = "password";
    this.user.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.user.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.user.ResetRequired = true;
    this.userService.SaveUser(this.user, results => {

      this.goToUserList();
      this.loaderService.dismissLoader();
    }, error => {
      this.loaderService.dismissLoader();
    });
  }
  goToUserList()
  {
    this.userService.selectedUser = this.user;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/user-list'], navigationExtras);
  }

  checkEmailExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for Email...", 10000);
    this.userService.readByEmail(this.user.Email, results => {
      this.loaderService.dismissLoader();

      if(results.length!=0)
      {
        present(new User(results[0]))
      }
      else
      {
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
      if(results.length!=0)
      {
        present(new User(results[0]))
      }
      else
      {
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
              this.goToUserList();
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
