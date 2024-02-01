/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.page.html',
  styleUrls: ['./forgot-username.page.scss'],
})
export class ForgotUsernamePage implements OnInit {
  public userEmailValidationMessage:string="";
  public userEmail:string="";
  public enableRequestButton:boolean=false;
  private localUser:User;
  private loading:any;
  private allowClose: boolean= false;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private userService:UserService,
    private languageService:LanguageService,
    public loadingCtrl: LoadingController,
  ) {
    this.localUser = new User(JSON.parse("{}"));
    this.userEmail = ""

  }

  ionViewWillEnter() {
  }

  ngOnInit() {


  }
  emailTextChanged(){
    var result =    this.enableRequestButton =  HelperService.validateEmail(this.userEmail);
    if(this.userEmail.length>0 && !result)
    {
      this.userEmailValidationMessage = this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_SYNTAX_VALIDATING_MESSAGE');
    }
    else
    {
      this.userEmailValidationMessage = "";
    }
    return result;
  }
  async RequestUserNameButtonClicked() {
    const loader = await this.loadingCtrl.create({
      message:  this.languageService.translate('FORGOT_USER_NAME_PAGE.VALIDATING_MESSAGE'),
      duration: 3000
    });
    loader.present();
      this.userService.getUserByEmail(this.userEmail, async response => {
        if(response == null|| response === undefined  || response.results.length === 0)
        {
          loader.dismiss();
            this.presentAlert(this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_NOT_SENT_TITLE'),this.languageService.translate('FORGOT_USER_NAME_PAGE.INVALID_DETAILS_MESSAGE'));
        }
        else
        {
          loader.dismiss();
          this.localUser = response.result[0];
          this.sendEmail();
        }

      },
      failure => {
        this.presentAlert('FORGOT_USER_NAME_PAGE.EMAIL_NOT_SENT_TITLE','FORGOT_USER_NAME_PAGE.VALIDATION_FAILED_MESSAGE')

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
  async sendEmail()
  {
    this.loading = await this.loadingController.create({
      message:  this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_SENDING_MESSAGE'),
      duration: 2000,
    });
    this.loading.present();
    this.userService.sendForgotUserEmail(this.localUser.FirstName + ' '+ this.localUser.LastName,this.localUser.Email,this.localUser.UserName, async response => {
      switch(response){
        case 'sent':
          this.presentAlert(this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_SENT_TITLE'), this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_SENT_MESSAGE'));
          break;
        default:
          this.presentAlert(this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_NOT_SENT_TITLE'), this.languageService.translate('FORGOT_USER_NAME_PAGE.EMAIL_EXHAUSTED'));
          break;
      }

      this.allowClose =true;
    },
    failure => {
      this.allowClose =false;
      this.presentAlert(this.languageService.translate("FORGOT_USER_NAME_PAGE.VALIDATION_FAILED_MESSAGE"),this.languageService.translate("FORGOT_USER_NAME_PAGE.VALIDATION_FAILED_MESSAGE"))

    });
  }
  // // //
  goToLogin() {
    this.router.navigate(['/']);
  }
  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('FORGOT_USER_NAME_PAGE.VALIDATION_FAILED_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
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
              this.router.navigate(['/login'],navigationExtras);
            }
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
