/* eslint-disable max-len */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user/user.service';
import { LanguageService } from '../../../services/language/language.service';
import { User } from 'src/app/models/user';
import { Routes } from '../../../../resources/routes';
import { AlertController } from '@ionic/angular';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  public currentPageTitle: string;
  public loggedInUser: User = new User(JSON.parse("{}"));
  public routes = new Routes();
  public userFullName : string ="";
  public userName : string ="";
  public userEmail : string ="";

  public avatarIcon = '/assets/img/user/default-male.png';


  public appPages = [
    { identifier: 'dashboard', title: this.translateService.instant('HOME_PAGE.PAGE_TITLE'), url: '/home/dashboard', icon: 'home-sharp' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    public alertController: AlertController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private languageService: LanguageService,
    private eventBus: NgEventBus) {


    this.loggedInUser = new User(JSON.parse("{}"));

    this.router.events.subscribe((state) => {
      if (state["url"] != null && state["url"] != undefined) {
        var states = state["url"].split('/');
        var key = this.routes.routes[(states[states.length - 1]).split('?')[0]];
        if (key == undefined || key == null) key = 'HOME_PAGE.PAGE_TITLE';
        this.currentPageTitle = this.translateService.instant(key);
      }
    });


    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
       this.serveBasedOnUserRole();
      }
    });

  }
  //Page Life Cycle
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.loadLocalUser();
  }
  loadLocalUser()
  {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.userFullName = this.loggedInUser.FirstName + " " + this.loggedInUser.LastName;
    this.userName = this.loggedInUser.UserName;
    this.userEmail = this.loggedInUser.Email;
    this.avatarIcon = this.loggedInUser.Gender === 'Male' ? '/assets/img/user/default-male.png' : '/assets/img/user/default-female.png';
  }

  menuButtonClicked()
  {
    this.serveBasedOnUserRole();
  }
  serveBasedOnUserRole()
  {
    this.loadLocalUser();
    this.appPages = [
      { identifier: 'dashboard', title: this.translateService.instant('HOME_PAGE.PAGE_TITLE'), url: '/home/dashboard', icon: 'home-sharp' }
    ];

    if (this.loggedInUser.Role === 'SuperAdmin') {
      this.appPages.push({ identifier: 'vehicle', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/vehicle-list', icon: 'car-sharp' });
      this.appPages.push({ identifier: 'user', title: this.translateService.instant('USERS_PAGE.PAGE_TITLE'), url: '/home/user-list', icon: 'person-sharp' });
      this.appPages.push({ identifier: 'createvehicle', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-vehicle', icon: 'add-sharp' });
      this.appPages.push({ identifier: 'visualization', title: this.translateService.instant('REPORTS.PAGE_TITLE'), url: '/home/visualization', icon: 'pie-chart-outline' });
      // this.appPages.push({ identifier: 'schedulesearch', title: this.translateService.instant('SCHEDULED_SEARCH_PAGE.PAGE_TITLE'), url: '/home/lookup-list', icon: 'search-circle-outline' });
    }

    if (this.loggedInUser.Role === 'Admin') {
      this.appPages.push({ identifier: 'vehicle', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/vehicle-list', icon: 'car-sharp' });
      this.appPages.push({ identifier: 'createvehicle', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-vehicle', icon: 'add-sharp' });
      this.appPages.push({ identifier: 'visualization', title: this.translateService.instant('REPORTS.PAGE_TITLE'), url: '/home/visualization', icon: 'pie-chart-outline' });
      this.appPages.push({ identifier: 'schedulesearch', title: this.translateService.instant('SCHEDULED_SEARCH_PAGE.PAGE_TITLE'), url: '/home/lookup-list', icon: 'search-circle-outline' });
    }

    if (this.loggedInUser.Role === 'User') {
      this.appPages.push({ identifier: 'createvehicle', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-vehicle', icon: 'add-sharp' });
    }
  }

  //Event Handlers
  MenuItemClicked(title: string, link: string) {

    this.translateService.get(title, response => {
      this.currentPageTitle = response;
    });
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate([link], navigationExtras);

  }
  async LogoutMenuItemClicked() {
    const alert = await this.alertController.create({
      cssClass: 'language-alert-class',
      header: this.languageService.translate("BUTTONS.LOGOUT"),
      message: this.languageService.translate("MESSAGES.LOGOUT_CONFIRM_MESSAGE"),
      buttons: [
        {
          text: this.languageService.translate("BUTTONS.CANCEL"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {
          }
        },
        {
          cssClass: 'primary',
          text: this.languageService.translate("BUTTONS.LOGOUT"),

          handler: (result) => {

            this.userService.logout(success=>{

              this.router.navigate(['login']);
            });

          }
        }
      ]
    });
    await alert.present();
  }
  async ShareMenuItemClicked() {
    const alert = await this.alertController.create({
      cssClass: 'language-alert-class',
      header: this.languageService.translate("BUTTONS.SHARE"),
      message: this.languageService.translate("MESSAGES.SHARE_CONFIRM_MESSAGE"),
      buttons: [
        {
          text: this.languageService.translate("BUTTONS.CANCEL"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {
          }
        }, {
          cssClass: 'primary',
          text: this.languageService.translate("BUTTONS.OK"),
          handler: (result) => {
          }
        }
      ]
    });
    await alert.present();
  }
  SettingMenuItemClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['/home/settings'], navigationExtras);
  }
  PrivacyPolicyLinkClicked() {
    this.router.navigate(['/privacy-policy']);
  }
  AboutUsLinkClicked() {
    this.router.navigate(['/about-us']);
  }
  userProfileClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['view-user-profile'], navigationExtras);
  }
}
