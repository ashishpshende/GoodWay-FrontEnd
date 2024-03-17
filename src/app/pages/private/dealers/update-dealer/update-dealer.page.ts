import { AfterViewInit, Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Component({
  selector: 'app-update-dealer',
  templateUrl: './update-dealer.page.html',
  styleUrls: ['./update-dealer.page.scss'],
})
export class UpdateDealerPage implements OnInit, AfterViewInit {
  public enableSave: boolean = false;
  public emailValidationMessage: string = '';
  public phoneNumberValidationMessage: string = '';
  public loader: User;
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService
  ) {  
    this.loader = new User({});
    this.genders = this.userService.genders;
    this.roles = this.userService.roles;
    this.statuses = this.userService.statuses;   
  }
  ngOnInit() {
    this.enableSave = false;
  }
  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const userid = Number.parseInt(params['userId'], 10);
      this.loadUserDetails(userid);
    });
  }
  loadUserDetails(id: number) {
    this.loaderService.customLoader('Loading User Details...', 10000);
    this.userService.readById(
      id,
      (resp: any) => {
        this.loader = new User(resp);
        this.loader.icon = 'person-sharp';
        this.loaderService.dismissLoader();
      },
      () => {
        this.loaderService.dismissLoader();
      }
    );
  }
  goToDealerList() {
    this.userService.selectedUser = this.loader;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        userId:this.loader.id
      },
    };
    this.router.navigate(['home/dealer-list'], navigationExtras);
  }
  emailTextChanged() {
    this.validate();
  }
  phoneNumberTextChanged() {
    this.validate();
  }

  validate() {
    this.enableSave = false;
      if (HelperService.validateEmail(this.loader.email)) {
        this.emailValidationMessage = '';
      } else {
        this.emailValidationMessage = this.languageService.translate(
          'USER_PROFILE.EMAIL_SYNTAX_VALIDATING_MESSAGE'
        );
        return false;
      }
      if (HelperService.validateMobileNumber(this.loader.phoneNumber)) {
        this.phoneNumberValidationMessage = '';
      } else {
        this.phoneNumberValidationMessage = this.languageService.translate(
          'USER_PROFILE.PHONE_SYNTAX_VALIDATING_MESSAGE'
        );
        return false;
      }
      return true;
  }
  UpdateUser(succes: any, failure: any) {
    this.loaderService.customLoader('Updating User...', 10000);
    this.loader.createdBy = this.userService.loggedInUser;
    this.loader.updatedOn = formatDate(
      new Date(),
      KeywordConstants.DATE_FORMAT_STRING,
      KeywordConstants.DATE_FORMAT_LANGUAGE,
      KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET
    );
    this.userService.UpdateUser(
      this.loader,
      () => {
        this.goToDealerList();
        this.loaderService.dismissLoader();
      },
      () => {
        this.loaderService.dismissLoader();
      }
    );
  }



  UpdateButtonClicked() {
    if (this.userService.Validate(this.loader)) {
      this.UpdateUser(
        () => {
          this.goToDealerList();
        },
        () => {
          this.presentAlert(
            this.languageService.translate('UPDATE_DEALER.REGISTRATION_FAILED'),
            this.languageService.translate(
              'UPDATE_DEALER.REGISTRATION_FAILED_MESSAGE'
            )
          );
        }
      );
    } else {
      this.presentAlert(
        this.languageService.translate('UPDATE_DEALER.EMPTY_DETAILS'),
        this.languageService.translate('UPDATE_DEALER.EMPTY_DETAILS_MESSAGE')
      );
    }
  }
  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('UPDATE_DEALER.TITLE'),
    message = this.languageService.translate('UPDATE_DEALER.REGISTRATION_FAILED')
  ) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert-class',
      header: headerTitle,
      subHeader: '',
      message: message,
      buttons: [this.languageService.translate('BUTTONS.OK')],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
