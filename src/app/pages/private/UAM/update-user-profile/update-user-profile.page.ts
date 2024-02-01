import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.page.html',
  styleUrls: ['./update-user-profile.page.scss'],
})
export class UpdateUserProfilePage  implements OnInit,AfterViewInit {
  public enableSave:boolean=false;
  public user: User;
  public genders: Array<string>=[];
  public roles: Array<string>=[];
  public statuses: Array<string>=[];
  public emailValidationMessage:string="";
  public phoneNumberValidationMessage:string="";

  constructor(public navCtrl: NavController,
    private localStorageService:LocalStorageService,
    public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService) {

      this.genders = ['Male',"Female","Others"];
      this.roles = ["SuperAdmin","Admin","User"];
      this.statuses = ["Active","InActive","Suspended"];
    if(this.userService.selectedUser!=null && this.userService.selectedUser != undefined  )
    {
      this.user = this.userService.selectedUser;
    }
    else
    {
      this.user = new User(JSON.parse("{}"));

    }
     }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
      this.user = this.localStorageService.StoredPreference.LoggedInUser;
  }

  CancelUpdate()
  {
    this.userService.selectedUser = this.user;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["view-user-profile"], navigationExtras);
  }

  GoToHomePage()
  {
    this.userService.selectedUser = this.user;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home","dashboard"], navigationExtras);
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

  UpdateButtonClicked()
  {
    if (this.userService.Validate(this.user)) {
      this.checkEmailExistance(
        () => {
          this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_EMAIL_ALREADY_EXISTS"))
        },
        () => {
          this.checkUserNameExistance(() => {
            this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"), this.languageService.translate("SIGN_UP.USER_WITH_USERNAME_ALREADY_EXISTS"))

          }, () => {

            this.UpdateUser(() => {


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
  checkEmailExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for Email...", 10000);
    this.userService.readByEmail(this.user.Email, results => {
      this.loaderService.dismissLoader();

      if(results.length>1)
      {
        present(new User(results[0]))
      }
      else
      {
        absent();
      }
    }, () => {
      this.loaderService.dismissLoader();
      absent();
    });
  }
  checkUserNameExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for User Name...", 10000);
    this.userService.readByUserName(this.user.UserName, results => {
      this.loaderService.dismissLoader();
      var occurance = 0;
      if(results.length>1)
      {
        results.forEach(user => {
          if(this.user.UserName === user.UserName)
          {
            occurance++;
          }
        });
        if(occurance>1)
        {
          present(new User(results[0]))
        }
        else
        {
          absent();
        }
      }
      else
      {
        absent();
      }
    }, () => {
      this.loaderService.dismissLoader();
      absent();
    });
  }
  UpdateUser(succes: (any), failure: (any)) {
    this.loaderService.customLoader("Saving User...", 10000);
    this.user.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.userService.UpdateUserProfile(this.user, () => {
      this.loaderService.dismissLoader();
      this.GoToHomePage();
    }, () => {

      this.loaderService.dismissLoader();
    });
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
