/* eslint-disable max-len */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { NgEventBus } from 'ng-event-bus';
import { User } from 'src/app/models/user';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import {BackgroundFetch} from '@transistorsoft/capacitor-background-fetch';
import {LocalNotificationsPlugin, LocalNotifications, Attachment, ActionPerformed} from '@capacitor/local-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {
  public loggedInUser: User;
  loading: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private platform: Platform) {
    this.loggedInUser = new User(JSON.parse('{}'));

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
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.serveBasedOnUserRole();
    this.userService.isSessionValid(results => {
      this.loading?.dismiss();
    }, errors => {
      this.loading?.dismiss();
      switch (errors) {
        case 'EMAIL_UPDATED':
          this.presentAlert(this.languageService.translate('SESSION.EMAIL_UPDATED_ERROR_TITLE'), this.languageService.translate('SESSION.EMAIL_UPDATED_MESSAGE'));
          break;
        case 'INACTIVE_USER':
          this.presentAlert(this.languageService.translate('SESSION.INACTIVE_ACCOUNT_ERROR_TITLE'), this.languageService.translate('SESSION.ERROR_INACTIVE_ACCOUNT_MESSAGE'));
          break;
        case 'SUSPENDED_USER':
          this.presentAlert(this.languageService.translate('SESSION.SUSPENDED_ACCOUNT_ERROR_TITLE'), this.languageService.translate('SESSION.ERROR_SUSPENDED_ACCOUNT_MESSAGE'));
          break;
        case 'USER_NOT_FOUND':
          this.presentAlert(this.languageService.translate('SESSION.USER_NOT_FOUND_ERROR_TITLE'), this.languageService.translate('SESSION.USER_NOT_FOUND_MESSAGE'));
          break;
        case 'SOMETHING_WENT_WRONG1':
          this.presentAlert(this.languageService.translate('SESSION.SOMETHING_WENT_WRONG_ERROR_TITLE'), this.languageService.translate('SESSION.SOMETHING_WENT_WRONG_MESSAGE'));
          break;
        default:
          this.loading?.dismiss();
          this.logout();
          break;
      }
    });
  }
  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }
  async initBackgroundFetch() {
    const status = await BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      enableHeadless: true,
    }, async (taskId) => {
      console.log('[BackgroundFetch] EVENT:', taskId);
      // Perform your work in an awaited Promise
      this.checkScheduleSearch(res=>{
        if(res){
          this.generateNotification();
          console.log('CheckScheduleSearch notification triggred by background fetch: ' + res);
        }
      },error=>{
        console.log('CheckScheduleSearch result background fetch: ' + error);
      });
      console.log('[BackgroundFetch] work completed');
      // [REQUIRED] Signal to the OS that your work is complete.
      BackgroundFetch.finish(taskId);
    }, async (taskId) => {
      // The OS has signalled that your remaining background-time has expired.
      // You must immediately complete your work and signal #finish.
      console.log('[BackgroundFetch] TIMEOUT:', taskId);
      // [REQUIRED] Signal to the OS that your work is complete.
      BackgroundFetch.finish(taskId);
    });

    // Checking BackgroundFetch status:
    if (status !== BackgroundFetch.STATUS_AVAILABLE) {
      // Uh-oh:  we have a problem:
      if (status === BackgroundFetch.STATUS_DENIED) {
        alert('The user explicitly disabled background behavior for this app or for the whole system.');
      } else if (status === BackgroundFetch.STATUS_RESTRICTED) {
        alert('Background updates are unavailable and the user cannot enable them again.');
      }
    }
  }

  // async performYourWorkHere() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       this.checkScheduleSearch();
  //       resolve(true);
  //     }, 2000);
  //   });
  // }

  checkScheduleSearch(success: (any), failure: (any)){

  }

  generateNotification(){
    const notfi = LocalNotifications.schedule({
      notifications:[
        {
          title: 'Search Results Available',
          body: 'Click here for details...',
          id: 1,
          schedule:{ at: new Date( Date.now()+1000*2), allowWhileIdle: true },
          sound: 'sound.wav',
          smallIcon: 'ic_stat_org_logo',
          actionTypeId: '',
          extra:{
            data: 'Results matching with the scheduled search'
          }
        }
      ]
    });
    console.log('scheduled notifications: '+ notfi);
    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction: ActionPerformed) => {
      this.router.navigate(['/home/lookup-list']);
    });
  }

  //Click Events
  searchTileClicked() {
    this.router.navigate(['/home/search-parcel']);
  }
  addParcelTileClicked() {
    this.router.navigate(['/home/create-parcel']);
  }
  usersTileClicked() {
    this.router.navigate(['/home/user-list']);
  }
  settingsTileClicked() {
    this.router.navigate(['/home/settings']);
  }
  visualizationTileClicked(){}


  logout() {
    this.router.navigate(['login']);
  }


  //Alerts
  async presentAlert(headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
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
          }
        }
      ]
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
}
