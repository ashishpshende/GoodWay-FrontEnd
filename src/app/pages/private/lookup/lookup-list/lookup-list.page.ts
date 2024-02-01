/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.page.html',
  styleUrls: ['./lookup-list.page.scss'],
})
export class LookupListPage implements OnInit {
  public loggedInUser: User;
  public skip = 0;
  public totalRecords = -1;
  public totalPages = -1;
  public countPerPage = 10;
  public limit: number = this.countPerPage;
  public currentPage = 1;
  public pages: number[];
  public showPagination = false;
  public editUserIcon = '';
  public searchToggle = false;
  public searchText = '';
  public allowNext = false;
  public allowPrev = false;
  public allowFirst = false;
  public allowLast = false;

  constructor(
    public loaderService: LoaderService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private languageService: LanguageService,
    public alertController: AlertController) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
      }
    });
  }

  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.loadScheduleSearch();
  }

  deleteSearch(succes: (any), failure: (any)) {
    this.loaderService.customLoader('Deleting Schedule Search...', 10000);
  }

  //Data loaders
  loadScheduleSearch() {

    this.loaderService.customLoader('Loading Schedule Search...', 50000);


  }

 

 

  async presentAlert(headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: '',
      message,
      buttons: [
        {
          text: this.languageService.translate('BUTTONS.YES'),
          role: 'confirm',
          handler: () => {
            this.deleteScheduleSearch();
          }
        },
        {
          text: this.languageService.translate('BUTTONS.NO'),
          role: 'confirm',
          handler: () => {}
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  deleteScheduleSearch() {
   
  }

  handleResponse(response) {
    this.pages = new Array();

    if(response.totalRecords<10)
    {
      this.allowFirst = false;
      this.allowPrev = false;
      this.allowLast = false;
      this.allowNext = false;
      this.currentPage = 1;
      this.pages.push(1);
    }
    else
    {
      this.totalPages = Math.ceil(response.totalRecords / 10);

      if (this.totalPages > 5) {
        if (this.currentPage === this.totalPages) {
          this.allowFirst = true;
          this.allowPrev = true;
          this.allowLast = false;
          this.allowNext = false;

          this.pages.push(this.currentPage - 2);
          this.pages.push(this.currentPage - 1);
          this.pages.push(this.currentPage);
        }
        else
          if (this.currentPage === 1) {
            this.allowFirst = false;
            this.allowPrev = false;
            this.allowLast = true;
            this.allowNext = true;

            this.pages.push(this.currentPage);
            this.pages.push(this.currentPage + 1);
            this.pages.push(this.currentPage + 2);
          }
          else {
            this.allowFirst = true;
            this.allowPrev = true;
            this.allowLast = true;
            this.allowNext = true;

            this.pages.push(this.currentPage - 1);
            this.pages.push(this.currentPage);
            this.pages.push(this.currentPage + 1);
          }

      }
      else {
        for (let index = 1; index <= this.totalPages; index++) {
          this.pages.push(index);
        }
      }
    }
  }

  handleRefresh(ev){
    this.loadScheduleSearch();
    ev.target.complete();
  }
  //Search
  ClearTextButtonClicked() {
    this.searchText = '';
    this.skip=0;
    this.currentPage = 1;
    this.loadScheduleSearch();
  }
  SearchToggleButtonClicked() {
    this.searchToggle = !this.searchToggle;
  }
  filterButtonClicked() {

  }
  searchTextButtonClicked() {
   
  }




  

  editButtonClicked(selectedSchduleSearch) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Id: selectedSchduleSearch.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/update-user'], navigationExtras);
  }

  getIcon(found) {
    if(found){
      return '/assets/icon/greendot.png';
    }
    return '/assets/icon/reddot.png';
  }

  //Click Events
  AddVehicleButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/create-lookup'], navigationExtras);
  }


  //modal
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  //Pagination
  FirstClicked() {
    this.currentPage = 1;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage-1);
    this.loadScheduleSearch();

  }
  PrevClicked() {
    this.currentPage--;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage-1);
    this.loadScheduleSearch();
  }
  NextClicked() {
    this.currentPage++;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage-1);
    this.loadScheduleSearch();
  }
  LastClicked() {
    this.currentPage = this.totalPages;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage - 1);
    this.loadScheduleSearch();
  }
  PageClicked(page) {
    this.currentPage = page;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage - 1);
    this.loadScheduleSearch();
  }

}
