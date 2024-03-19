/* eslint-disable max-len */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationExtras,
  NavigationStart,
  Router,
} from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { NgEventBus } from 'ng-event-bus';
import { User } from '../../../../models/User';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import {
  LocalNotificationsPlugin,
  LocalNotifications,
  Attachment,
  ActionPerformed,
} from '@capacitor/local-notifications';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {
  public loggedInUser: User;
  loading: any;
  showSearchBox: boolean = false;
  showScanner: boolean = false;

  isSupported = false;
  isAvailable = false;

  public cnNumber: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private platform: Platform
  ) {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    if(this.platform.is('android') || this.platform.is('ios'))
    {
      this.showScanner = true;
    }
    this.showSearchBox = false;
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.serveBasedOnUserRole();
      }
    });
  }
  serveBasedOnUserRole() {
    //Role wise changes
  this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;

  }
  //Page Life Cycle
  ngAfterViewInit(): void {
    this.initializeLoader();
    this.serveBasedOnUserRole();
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.userService.isSessionValid(
      (results: any) => {
        this.loading.dismiss();
      },
      (errors: any) => {
        this.loading.dismiss();
        switch (errors) {
          case 'EMAIL_UPDATED':
            this.presentAlert(
              this.languageService.translate(
                'SESSION.EMAIL_UPDATED_ERROR_TITLE'
              ),
              this.languageService.translate('SESSION.EMAIL_UPDATED_MESSAGE')
            );
            break;
          case 'INACTIVE_USER':
            this.presentAlert(
              this.languageService.translate(
                'SESSION.INACTIVE_ACCOUNT_ERROR_TITLE'
              ),
              this.languageService.translate(
                'SESSION.ERROR_INACTIVE_ACCOUNT_MESSAGE'
              )
            );
            break;
          case 'SUSPENDED_USER':
            this.presentAlert(
              this.languageService.translate(
                'SESSION.SUSPENDED_ACCOUNT_ERROR_TITLE'
              ),
              this.languageService.translate(
                'SESSION.ERROR_SUSPENDED_ACCOUNT_MESSAGE'
              )
            );
            break;
          case 'USER_NOT_FOUND':
            this.presentAlert(
              this.languageService.translate(
                'SESSION.USER_NOT_FOUND_ERROR_TITLE'
              ),
              this.languageService.translate('SESSION.USER_NOT_FOUND_MESSAGE')
            );
            break;
          case 'SOMETHING_WENT_WRONG1':
            this.presentAlert(
              this.languageService.translate(
                'SESSION.SOMETHING_WENT_WRONG_ERROR_TITLE'
              ),
              this.languageService.translate(
                'SESSION.SOMETHING_WENT_WRONG_MESSAGE'
              )
            );
            break;
          default:
            this.loading.dismiss();
            this.logout();
            break;
        }
      }
    );
  }
  ngOnInit() {
    BarcodeScanner.installGoogleBarcodeScannerModule().then((result) => {});
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then((result) => {
      this.isAvailable = result.available;
    });
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }

  // async performYourWorkHere() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       this.checkScheduleSearch();
  //       resolve(true);
  //     }, 2000);
  //   });
  // }

  checkScheduleSearch(success: any, failure: any) {}

  generateNotification() {
    const notfi = LocalNotifications.schedule({
      notifications: [
        {
          title: 'Search Results Available',
          body: 'Click here for details...',
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 2),
            allowWhileIdle: true,
          },
          sound: 'sound.wav',
          smallIcon: 'ic_stat_org_logo',
          actionTypeId: '',
          extra: {
            data: 'Results matching with the scheduled search',
          },
        },
      ],
    });
    console.log('scheduled notifications: ' + notfi);
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notificationAction: ActionPerformed) => {
        this.router.navigate(['/home/lookup-list']);
      }
    );
  }

  //Click Events
  searchTileClicked() {
    this.showSearchBox = !this.showSearchBox;
    // this.router.navigate(['/home/search-parcel']);
  }
  scanQRCodeTileClicked() {
    if (this.isAvailable === false)
      this.presentAlert(
        'QR Scanner Alert!',
        'QR Scanner not available on current Device.'
      );
    if (this.isSupported == false)
      this.presentAlert(
        'QR Scanner Alert!',
        'QR Scanner not supported on current Device.'
      );

    this.scan();
  }
  addParcelTileClicked() {
    this.router.navigate(['/home/create-parcel']);
  }
  usersTileClicked() {
    this.router.navigate(['/home/sub-dealer-list']);
  }
  settingsTileClicked() {
    this.router.navigate(['/home/settings']);
  }
  visualizationTileClicked() {}

  logout() {
    this.router.navigate(['login']);
  }

  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'),
    message = this.languageService.translate(
      'LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE'
    )
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: '',
      message,
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.OK'),
          role: 'confirm',
          handler: () => {
            //this.logout();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  //Loaders
  async initializeLoader() {
    this.loading = await this.loadingController.create({
      message: this.languageService.translate('SESSION.VALIDATING_MESSAGE'),
      duration: 5000,
    });
    this.loading.present();
  }
  //QR Code Scanner

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert(
        this.languageService.translate('QR_CODE.PERMISSION_DENIED_ALERT_TITLE'),
        this.languageService.translate(
          'SESSION.PERMISSION_DENIED_ALERT_MESSAGE'
        )
      );

      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.cnNumber = barcodes[0].rawValue;
    this.parcelSelected(this.cnNumber);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  public searchButtonClicked() {
    if (!this.cnNumber) {
      this.presentAlert(
        this.languageService.translate(
          'PARCELS_SEARCH_PAGE.INVALID_CN_NUMBER_ALERT_TITLE'
        ),
        this.languageService.translate(
          'PARCELS_SEARCH_PAGE.EMPTY_CN_NUMBER_ALERT_MESSAGE'
        )
      );
    } else if (this.cnNumber.length < 3) {
      this.presentAlert(
        this.languageService.translate(
          'PARCELS_SEARCH_PAGE.INVALID_CN_NUMBER_ALERT_TITLE'
        ),
        this.languageService.translate(
          'PARCELS_SEARCH_PAGE.INVALID_CN_NUMBER_ALERT_MESSAGE'
        )
      );
    } else {
      this.parcelSelected(this.cnNumber);
      this.cnNumber = '';
    }
  }
  public parcelSelected(selectedCN: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        cnNo: selectedCN,
      },
    };
    this.router.navigate(['home/qr-code'], navigationExtras);
  }
}
