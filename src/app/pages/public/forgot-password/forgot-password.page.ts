/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public userEmailValidationMessage:string="";
  public userNameValidationMessage:string="";

  public userEmail:string="";
  public userName:string="";
  public enableRequestButton:boolean=false;
  private localUser:User;
  private loading:any;
  private allowClose: boolean= false;
  constructor(
    private alertController: AlertController,
    private loadingController:LoadingController,
    private userService:UserService,
    private languageService:LanguageService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    this.localUser = new User(JSON.parse("{}"));
    this.userEmail = ""
    this.userName = "";
  }

  ionViewWillEnter() {
  }

  ngOnInit() {


  }
  userNameTextChanged()
  {
    this.validate();
  }
  emailTextChanged(){
    this.validate();
  }
  validate()
  {
    if(this.validateEmail() && this.validateUsername())
    {
      this.enableRequestButton = true;
      return true;
    }
    else
    {
      this.enableRequestButton = false;
      return false;
    }
  }
  validateUsername()
  {

    if(this.userName==null || this.userName ==undefined ||this.userName.length==0 )
    {
      this.userNameValidationMessage = this.languageService.translate('FORGOT_PASSWORD_PAGE.USER_NAME_SYNTAX_VALIDATING_MESSAGE');
      return false;
    }
    else
    {
      this.userNameValidationMessage = "";
      return true;
    }
    return true;
  }
  validateEmail()
  {
    var result =    HelperService.validateEmail(this.userEmail);
    if(this.userEmail.length>0 && !result)
    {
      this.userEmailValidationMessage = this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_SYNTAX_VALIDATING_MESSAGE');
    }
    else
    {
      this.userEmailValidationMessage = "";
    }
    return result;
  }
  async RequestPasswordButtonClicked() {
    const loader = await this.loadingCtrl.create({
      message:  this.languageService.translate('FORGOT_PASSWORD_PAGE.VALIDATING_MESSAGE'),
      duration: 3000
    });
    loader.present();
      this.userService.getUserByUserNameEmail(this.userName, this.userEmail, async response => {
        if(response === null|| response === undefined  || response.results.length === 0)
        {
          loader.dismiss();
            this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_NOT_SENT_TITLE'),this.languageService.translate('FORGOT_PASSWORD_PAGE.INVALID_DETAILS_MESSAGE'));
        }
        else
        {
          loader.dismiss();
          this.localUser = response.result[0];
          await this.updateUserCredentials();
        }

      },
      failure => {
        this.presentAlert('FORGOT_PASSWORD_PAGE.EMAIL_NOT_SENT_TITLE','FORGOT_PASSWORD_PAGE.VALIDATION_FAILED_MESSAGE')

      });

      // loader.onWillDismiss().then(() => {
      //   let navigationExtras: NavigationExtras = {
      //     queryParams: {
      //       ts: new Date().getMilliseconds()
      //     }
      //   };
      //   this.navCtrl.navigateRoot('/login',navigationExtras);
      // });
  }

 async updateUserCredentials()
  {
    const loader = await this.loadingCtrl.create({
      message:  this.languageService.translate('FORGOT_PASSWORD_PAGE.GENERATING_TEMP_PASSWORD'),
      duration: 3000
    });
    loader.present();
    this.localUser.Password = HelperService.generateTempPassowrd();
    this.userService.UpdateUserCredentials(this.localUser, async response => {
      if(response === null|| response === undefined )
      {
        loader.dismiss();
          this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_NOT_SENT_TITLE'),this.languageService.translate('FORGOT_PASSWORD_PAGE.INVALID_DETAILS_MESSAGE'));
      }
      else
      {
        loader.dismiss();
        this.sendEmail();
      }

    },
    failure => {
      this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_NOT_SENT_TITLE'),this.languageService.translate('FORGOT_PASSWORD_PAGE.VALIDATION_FAILED_MESSAGE'));

    });
  }
  async sendEmail()
  {
    this.loading = await this.loadingController.create({
      message:  this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_SENDING_MESSAGE'),
      duration: 2000,
    });

    this.loading.present();
    this.userService.sendForgotPasswordEmail(this.localUser.FirstName + ' '+ this.localUser.LastName,
    this.localUser.UserName,
    this.localUser.Email,
    this.localUser.Password,
     async response => {
      switch(response){
        case 'sent':
          this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_SENT_TITLE'), this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_SENT_MESSAGE'));
          break;
        default:
          this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_NOT_SENT_TITLE'), this.languageService.translate('FORGOT_PASSWORD_PAGE.EMAIL_EXHAUSTED'));
          break;
      }
      this.allowClose =true;
    },
    failure => {
      this.allowClose =false;
      this.presentAlert(this.languageService.translate('FORGOT_PASSWORD_PAGE.VALIDATION_FAILED_MESSAGE'),this.languageService.translate('FORGOT_PASSWORD_PAGE.VALIDATION_FAILED_MESSAGE'));

    });
  }
  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('FORGOT_PASSWORD_PAGE.VALIDATION_FAILED_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: "",
      message: message,
      buttons: [
         {
          text: this.languageService.translate('BUTTONS.OK'),
          handler: data => {
            if(this.allowClose)
            {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  ts: new Date().getMilliseconds()
                }
              };
              this.navCtrl.navigateRoot('/login',navigationExtras);
            }
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
