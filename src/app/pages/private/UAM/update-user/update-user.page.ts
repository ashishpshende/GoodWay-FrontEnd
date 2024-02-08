/* eslint-disable eqeqeq */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from '../../../../models/User';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements AfterViewInit {
  public user: User;
  public genders: Array<string>=[];
  public roles: Array<string>=[];
  public statuses: Array<string>=[];
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
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


  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number.parseInt(params['Id'], 10);
      this.loadUserDetails(id);
    });
  }
  loadUserDetails(id: number)
  {
    this.loaderService.customLoader("Loading User Details...", 10000);
    this.userService.readById(id,(resp:any) => {
      this.user = new User(resp.result[0]);
      this.user.icon ="person-sharp";
      this.loaderService.dismissLoader();
    }, () => {
      this.loaderService.dismissLoader();
    });
  }
  goToUserList()
  {
    this.userService.selectedUser = this.user;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/user-list"], navigationExtras);
  }
  updateButtonClicked()
  {
    if (this.validate()) {
      this.checkEmailExistance(
        () => {
          this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"),
          this.languageService.translate("SIGN_UP.USER_WITH_EMAIL_ALREADY_EXISTS"));
        },

        () => {


          this.checkUserNameExistance(() => {
            this.presentAlert(this.languageService.translate("SIGN_UP.ALREADY_REGISTERED"),
             this.languageService.translate("SIGN_UP.USER_WITH_USERNAME_ALREADY_EXISTS"));

          }, () => {

            this.updateUser(() => {
              this.goToUserList();
            }, () => {
              this.presentAlert(this.languageService.translate("SIGN_UP.REGISTRATION_FAILED"),
              this.languageService.translate("SIGN_UP.REGISTRATION_FAILED_MESSAGE"));

            });

          });
        });

    }
    else {
      this.presentAlert(this.languageService.translate("SIGN_UP.EMPTY_DETAILS"),
       this.languageService.translate("SIGN_UP.EMPTY_DETAILS_MESSAGE"));
    }

  }
  checkEmailExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for Email...", 10000);
    this.userService.readByEmail(this.user.email, (results:any) => {
      this.loaderService.dismissLoader();
      let occurance = 0;
      if(results.length>0)
      {
        results.forEach((user:User) => {
          if(this.user.email.toLowerCase() === user.email.toLowerCase() && this.user.id !== user.id)
          {
            occurance++;
          }
        });
        if(occurance>0)
        {
          present(new User(results[0]));
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
  checkUserNameExistance(present: (any), absent: (any)) {
    this.loaderService.customLoader("Checking for User Name...", 10000);
    this.userService.readByUserName(this.user.userName, (results:any) => {
      this.loaderService.dismissLoader();
      let occurance = 0;
      if(results.length>0)
      {
        results.forEach((user:User) => {
          if(this.user.userName === user.userName && this.user.id !== user.id)
          {
            occurance++;
          }
        });
        if(occurance>0)
        {
          present(new User(results[0]));
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
  updateUser(_succes: (any), _failure: (any)) {
    this.loaderService.customLoader("Saving User...", 10000);
    this.user.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.userService.UpdateUser(this.user, (results:any) => {
      this.loaderService.dismissLoader();
      this.goToUserList();
    }, () => {

      this.loaderService.dismissLoader();
    });
  }

  validate(): boolean {
    if (this.user.name) {
      return false;
    }
    if (this.user.email) {
      return false;
    }
    if (this.user.phoneNumber) {
      return false;
    }
    if (this.user.userName) {
      return false;
    }
    return true;
  }

  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('SIGN_UP.TITLE'),
  message = this.languageService.translate('SIGN_UP.REGISTRATION_FAILED')) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert-class',
      header: headerTitle,
      subHeader: "",
      message,
      buttons: [this.languageService.translate('BUTTONS.OK')]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

}
