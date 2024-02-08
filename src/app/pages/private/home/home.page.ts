/* eslint-disable max-len */
import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user/user.service';
import { LanguageService } from '../../../services/language/language.service';
import { User } from '../../../models/User';
import { Routes } from '../../../../resources/routes';
import { AlertController } from '@ionic/angular';
import { NgEventBus } from 'ng-event-bus';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  public currentPageTitle: string;
  public loggedInUser: User = new User(JSON.parse('{}'));
  public routes = new Routes();
  public userFullName: string;
  public userName: string;
  public userEmail: string;

  public avatarIcon = '/assets/img/user/default-male.png';

  public appPages = [
    {
      identifier: 'dashboard',
      title: this.translateService.instant('HOME_PAGE.PAGE_TITLE'),
      url: '/home/dashboard',
      icon: 'home-sharp',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public alertController: AlertController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private languageService: LanguageService,
    private eventBus: NgEventBus
  ) {
    this.currentPageTitle = '';
    this.userFullName = '';
    this.userName = '';
    this.userEmail = '';

    this.router.events.subscribe((state: any) => {
      if (state['url'] != null && state['url'] != undefined) {
        var states = state['url'].split('/');
        //Need to Update the logic
        //  var key = this.routes.routes[(states[states.length - 1]).split('?')[0]];
        // if (!key)
        //   key = 'HOME_PAGE.PAGE_TITLE';
        // this.currentPageTitle = this.translateService.instant(key);
      }
    });

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.serveBasedOnUserRole();
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadLocalUser();
  }
  loadLocalUser() {
    this.loggedInUser =
      this.localStorageService.StoredPreference.LoggedInUser ?? new User({});
    this.userFullName = this.loggedInUser.name;
    this.userName = this.loggedInUser.userName;
    this.userEmail = this.loggedInUser.email;
    this.avatarIcon = '/assets/img/user/default-male.png';
  }

  menuButtonClicked() {
    this.serveBasedOnUserRole();
  }
  serveBasedOnUserRole() {
    this.loadLocalUser();
    this.appPages = [
      {
        identifier: 'dashboard',
        title: this.translateService.instant('HOME_PAGE.PAGE_TITLE'),
        url: '/home/dashboard',
        icon: 'home-sharp',
      },
    ];

    // if (this.loggedInUser.userRole=== 'SuperAdmin') {
    //   this.appPages.push({ identifier: 'parcels', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/parcel-list', icon: 'cube-sharp' });
    //   this.appPages.push({ identifier: 'user', title: this.translateService.instant('USERS_PAGE.PAGE_TITLE'), url: '/home/user-list', icon: 'person-sharp' });
    //   this.appPages.push({ identifier: 'createparcel', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-parcel', icon: 'add-sharp' });
    //   this.appPages.push({ identifier: 'visualization', title: this.translateService.instant('REPORTS.PAGE_TITLE'), url: '/home/visualization', icon: 'pie-chart-outline' });
    // }

    //if (this.loggedInUser.userRole=== 'Admin') {
    this.appPages.push({
      identifier: 'parcel',
      title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'),
      url: '/home/parcel-list',
      icon: 'cube-sharp',
    });
    // this.appPages.push({ identifier: 'createparcel', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-parcel', icon: 'add-sharp' });
    //this.appPages.push({ identifier: 'user', title: this.translateService.instant('USERS_PAGE.PAGE_TITLE'), url: '/home/user-list', icon: 'person-sharp' });
    //  this.appPages.push({ identifier: 'dealer', title: this.translateService.instant('DEALERS_PAGE.PAGE_TITLE'), url: '/home/dealer-list', icon: 'people-sharp' });
    this.appPages.push({
      identifier: 'subdealer',
      title: this.translateService.instant('SUB_DEALERS_PAGE.PAGE_TITLE'),
      url: '/home/sub-dealer-list',
      icon: 'people-sharp',
    });

    // }

    // if (this.loggedInUser.userRole=== 'Dealer') {
    //   this.appPages.push({ identifier: 'createparcel', title: this.translateService.instant('DASHBOARD.ADD_PARCEL'), url: '/home/create-parcel', icon: 'add-sharp' });
    //   this.appPages.push({ identifier: 'parcel', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/parcel-list', icon: 'cube-sharp' });
    //   this.appPages.push({ identifier: 'subdealer', title: this.translateService.instant('SUB_DEALERS_PAGE.PAGE_TITLE'), url: '/home/sub-dealer-list', icon: 'person-sharp' });

    // }
    // if (this.loggedInUser.userRole=== 'SubDealer') {
    //   this.appPages.push({ identifier: 'parcel', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/parcel-list', icon: 'cube-sharp' });
    // }
    // this.appPages.push({ identifier: 'parcel', title: this.translateService.instant('PARCELS_PAGE.PAGE_TITLE'), url: '/home/parcel-list', icon: 'cube-sharp' });
  }

  //Event Handlers
  MenuItemClicked(title: string, link: string) {
    this.translateService.get(title, (response: any) => {
      this.currentPageTitle = response;
    });
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate([link], navigationExtras);
  }
  async LogoutMenuItemClicked() {
    const alert = await this.alertController.create({
      cssClass: 'language-alert-class',
      header: this.languageService.translate('BUTTONS.LOGOUT'),
      message: this.languageService.translate(
        'MESSAGES.LOGOUT_CONFIRM_MESSAGE'
      ),
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {},
        },
        {
          cssClass: 'primary',
          text: this.languageService.translate('BUTTONS.LOGOUT'),

          handler: (result) => {
            this.userService.logout(() => {
              this.router.navigate(['login']);
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async ShareMenuItemClicked() {
    const alert = await this.alertController.create({
      cssClass: 'language-alert-class',
      header: this.languageService.translate('BUTTONS.SHARE'),
      message: this.languageService.translate('MESSAGES.SHARE_CONFIRM_MESSAGE'),
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {},
        },
        {
          cssClass: 'primary',
          text: this.languageService.translate('BUTTONS.OK'),
          handler: (result) => {},
        },
      ],
    });
    await alert.present();
  }
  SettingMenuItemClicked() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
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
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['view-user-profile'], navigationExtras);
  }
}
