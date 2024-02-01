/* eslint-disable max-len */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit,AfterViewInit {
  public showPasswordStrengthMessage: Boolean;
  public onForgotPasswordForm: FormGroup;
  public showOldPasswordValidationMessage: Boolean;
  public showNewPasswordValidationMessage: Boolean;
  public showConfirmPasswordValidationMessage: Boolean;
  public email: string;
  public oldPasswordValidationMessage: string;
  public newPasswordValidationMessage: string;
  public confirmPasswordValidationMessage: string;
  public oldPassword: string;
  public newPassword: string;
  public confirmPassword: string;
  public passwordStrength: number;
  public passwordResetStatus: boolean;
  loading: any;

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private languageService: LanguageService,
    public loadingController: LoadingController,
    public userService: UserService,
    public alertController: AlertController,
  ) {
    this.passwordResetStatus = false;
    this.showPasswordStrengthMessage = true;
    this.passwordStrength = 0;
  }
  ngAfterViewInit(): void {
    this.email = '';//"ashishhende@gmail.com";
    this.oldPassword =  '';//"password";
    this.newPassword =  '';//"Password1";
    this.confirmPassword =  '';//"Password1";
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];

    });
  }
  newPasswordTextChanged() {

    if (this.newPassword.length == 0) {
      this.showNewPasswordValidationMessage = false;
      this.showPasswordStrengthMessage =true;
      return;
    }
    else
    {
      this.showPasswordStrengthMessage =false;
    }

    this.passwordStrength = HelperService.getPasswordStrength(this.newPassword);
    if (this.passwordStrength == -1) {
      this.showNewPasswordValidationMessage = true;
      this.newPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.PASSWORD_LENGTH_MESSAGE').replace('{MIN_PASSWORD_STRENGTH}', '8');
    }
    else {
      if (this.passwordStrength < 1) {
        this.showNewPasswordValidationMessage = true;
        this.newPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.NEW_PASSWORD_STRENGTH_MESSAGE');
      }
      else {
        this.showNewPasswordValidationMessage = false;
      }
    }
    console.log(this.passwordStrength);
  }
  async ngOnInit() {

  }
  validate() {
    var isValid = true;
    if (this.oldPassword == '') {
      this.showOldPasswordValidationMessage = true;
      this.oldPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE');
      isValid = false;
    }
    if (this.newPassword == '') {
      this.showNewPasswordValidationMessage = true;
      this.newPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE');
      isValid = false;
    }
    if (this.confirmPassword == '') {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE');
      isValid = false;
    }
    if (this.oldPassword === this.newPassword) {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.CONFIRM_NEW_PASSWORD_MESSAGE');
      isValid = false;
    }
    if (this.confirmPassword !== this.newPassword) {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate('RESET_PASSWORD.PASSWORD_NOT_MATCHING_ERROR_MESSAGE');
      isValid = false;
    }
    return isValid;
  }


  languageLinkClicked() {
    this.languageService.presentLanguageSelctionMenu(changed=>{});
  }

  cancelButtonClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate([this.userService.lastRoute],navigationExtras)
  }
  async resetButtonClicked() {
    this.confirmPasswordValidationMessage = '';
    if (this.validate()) {

      this.loading = await this.loadingController.create({
        message: this.languageService.translate('RESET_PASSWORD.PROGRESS_MESSAGE'),
        duration: 10000,
      });
      this.loading.present();
      this.userService.checkUser(this.email, this.oldPassword, response => {

        this.userService.ResetPassword(response.id, this.newPassword, response => {
          this.loading.dismiss();
          this.passwordResetStatus = true;
          this.presentAlert(this.languageService.translate('RESET_PASSWORD.SUCCESS'), this.languageService.translate('RESET_PASSWORD.SUCCESS_MESSAGE'));

        }, failure => {
          this.loading.dismiss();
          this.presentAlert(this.languageService.translate('RESET_PASSWORD.FAILED'), this.languageService.translate('RESET_PASSWORD.FAILED_MESSAGE'));
        });

      },
        failure => {
          this.loading.dismiss();
          switch (failure) {
            case 'INVALID_CREDENTAILS':
              this.presentAlert(this.languageService.translate('RESET_PASSWORD.INVALID_CREDENTIALS_ERROR_TITLE'),this.languageService.translate('RESET_PASSWORD.ERROR_INVALID_CREDENTIALS_MESSAGE'));
              break;
            case 'INACTIVE_USER':
              this.presentAlert(this.languageService.translate('RESET_PASSWORD.INACTIVE_ACCOUNT_ERROR_TITLE'),this.languageService.translate('RESET_PASSWORD.ERROR_INACTIVE_ACCOUNT_MESSAGE'));
              break;
            case 'SUSPENDED_USER':
              this.presentAlert(this.languageService.translate('RESET_PASSWORD.SUSPENDED_ACCOUNT_ERROR_TITLE'),this.languageService.translate('RESET_PASSWORD.ERROR_SUSPENDED_ACCOUNT_MESSAGE'));
              break;
            case 'RESET_REQUIRED':
              this.presentAlert(this.languageService.translate('RESET_PASSWORD.PASSWORD_RESET_REQUIRED_ERROR_TITLE'),this.languageService.translate('RESET_PASSWORD.PASSWORD_RESET_REQUIRED_ACCOUNT_MESSAGE'));
              break;
          }


        });

    }
  }

  async presentLoading(loading) {
    await loading.present();
  }

  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('RESET_PASSWORD.FAILED'), message = this.languageService.translate('RESET_PASSWORD.FAILED_MESSAGE')) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: '',
      message: message,
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.OK'),
          handler: data => {
            if(this.passwordResetStatus)
            {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  ts: new Date().getTime()
                }
              };
              this.router.navigate(['/login'],navigationExtras)
            }

          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
