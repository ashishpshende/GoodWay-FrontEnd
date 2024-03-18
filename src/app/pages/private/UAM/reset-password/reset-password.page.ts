/* eslint-disable max-len */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { User } from 'src/app/models/User';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { LanguageService } from 'src/app/services/language/language.service';
import { SecurityService } from 'src/app/services/security/security.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements AfterViewInit {
  public user:User;
  public onForgotPasswordForm: FormGroup;
  public email: string;
  public userName: string;

  // Old Password Check
  public showPasswordStrengthMessage: Boolean;
  public showOldPasswordValidationMessage: Boolean;
  public oldPasswordValidationMessage: string;
  public oldPassword: string;

  // New Password Check
  public showNewPasswordValidationMessage: Boolean;
  public newPasswordValidationMessage: string;
  public newPassword: string;

  // Confirm Password Check
  public showConfirmPasswordValidationMessage: Boolean;
  public confirmPasswordValidationMessage: string;
  public confirmPassword: string;

  public passwordStrength: number;
  public passwordResetStatus: boolean;
  loading: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    public loadingController: LoadingController,
    public userService: UserService,
    public alertController: AlertController,
    private securityService:SecurityService
  ) {
    this.passwordResetStatus = false;
    this.showPasswordStrengthMessage = true;
    this.passwordStrength = 0;
    this.user = this.userService.loggedInUser;
  }
  ngAfterViewInit(): void {
    this.email = ''; 
    this.userName = '';
    this.oldPassword = ''; 
    this.newPassword = ''; 
    this.confirmPassword = '';     
  }

  //#region old Password Check 
  

  //#endregion

  newPasswordTextChanged() {
    if (this.newPassword.length == 0) {
      this.showNewPasswordValidationMessage = false;
      this.showPasswordStrengthMessage = true;
      return;
    } else {
      this.showPasswordStrengthMessage = false;
    }

    this.passwordStrength = HelperService.getPasswordStrength(
      this.newPassword ? this.newPassword : ''
    );
    if (this.passwordStrength == -1) {
      this.showNewPasswordValidationMessage = true;
      this.newPasswordValidationMessage = this.languageService
        .translate('RESET_PASSWORD.PASSWORD_LENGTH_MESSAGE')
        .replace('{MIN_PASSWORD_STRENGTH}', '8');
    } else {
      if (this.passwordStrength < 1) {
        this.showNewPasswordValidationMessage = true;
        this.newPasswordValidationMessage = this.languageService.translate(
          'RESET_PASSWORD.NEW_PASSWORD_STRENGTH_MESSAGE'
        );
      } else {
        this.showNewPasswordValidationMessage = false;
      }
    }
    console.log(this.passwordStrength);
  }

  validate() {
    var isValid = true;

    //Old Password Check
    if (this.oldPassword == '') {
      this.showOldPasswordValidationMessage = true;
      this.oldPasswordValidationMessage = this.languageService.translate(
        'RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE'
      );
      isValid = false;
    }
    
    //New Password Check
    if (this.newPassword == '') {
      this.showNewPasswordValidationMessage = true;
      this.newPasswordValidationMessage = this.languageService.translate(
        'RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE'
      );
      isValid = false;
    }
    if (this.oldPassword === this.newPassword) {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate(
        'RESET_PASSWORD.CONFIRM_NEW_PASSWORD_MESSAGE'
      );
      isValid = false;
    }


    //Confirm Password Check
    if (this.confirmPassword == '') {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate(
        'RESET_PASSWORD.EMPTY_DETAILS_ERROR_TITLE'
      );
      isValid = false;
    }
    if (this.confirmPassword !== this.newPassword) {
      this.showConfirmPasswordValidationMessage = true;
      this.confirmPasswordValidationMessage = this.languageService.translate(
        'RESET_PASSWORD.PASSWORD_NOT_MATCHING_ERROR_MESSAGE'
      );
      isValid = false;
    }
    return isValid;
  }



  cancelButtonClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime(),
      },
    };
    this.router.navigate([this.userService.lastRoute], navigationExtras);
  }
  async resetButtonClicked() {
    this.confirmPasswordValidationMessage = '';
    if (this.validate()) {
      this.loading = await this.loadingController.create({
        message: this.languageService.translate(
          'RESET_PASSWORD.PROGRESS_MESSAGE'
        ),
        duration: 10000,
      });
      this.loading.present();
      this.userService.ResetPassword(
        this.user.id,
        this.user.name,
        this.oldPassword,
        this.newPassword,
        (result:any) => {
          if(result.statusCode==="SUCCESS")
          {
            this.loading.dismiss();
            this.passwordResetStatus = true;
            this.presentAlert(
              this.languageService.translate('RESET_PASSWORD.SUCCESS'),
              this.languageService.translate('RESET_PASSWORD.SUCCESS_MESSAGE')
            );
          }
          else
          {
            this.loading.dismiss();
            this.presentAlert(
              this.languageService.translate('RESET_PASSWORD.FAILED'),
              this.languageService.translate('RESET_PASSWORD.FAILED_MESSAGE')
            );
          }
        },
        () => {
          this.loading.dismiss();
          this.presentAlert(
            this.languageService.translate('RESET_PASSWORD.FAILED'),
            this.languageService.translate('RESET_PASSWORD.FAILED_MESSAGE')
          );
        }
      );
    }
  }

  async presentLoading(loading: any) {
    await loading.present();
  }

  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('RESET_PASSWORD.FAILED'),
    message = this.languageService.translate('RESET_PASSWORD.FAILED_MESSAGE')
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: '',
      message: message,
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.OK'),
          handler: (data) => {
            if (this.passwordResetStatus) {
              this.userService.logout(null);
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  ts: new Date().getTime(),
                },
              };
              this.router.navigate(['/login'], navigationExtras);
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
