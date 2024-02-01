/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  public loggedInUser: User;
  public users: User[];
  public skip: number = 0;
  public totalRecords: number = -1;
  public totalPages: number = -1;
  public countPerPage: number = 10;
  public limit: number = this.countPerPage;
  public currentPage: number = 1;
  public pages: number[];
  public showPagination: boolean = false;
  public editUserIcon = '';
  public searchToggle: boolean = false;
  public searchText: string = "";

  public allowNext: boolean = false;
  public allowPrev: boolean = false;
  public allowFirst: boolean = false;
  public allowLast: boolean = false;

  constructor(private userService: UserService,
    public loaderService: LoaderService,
    private router: Router,
    private localStorageService: LocalStorageService) {
    this.users = new Array<User>();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
      }
    });
  }
  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.loadusers();
  }


  //Data loaders
  loadusers() {

    this.loaderService.customLoader("Loading Users...", 5000);

    if (this.searchText !== "") {
      this.userService.listBykeyword(this.searchText, this.skip, this.limit, async results => {
        this.handleResponse(results);
        this.loaderService.dismissLoader();
      }, error => {

        this.loaderService.dismissLoader();
      });
    }
    else {
      this.userService.list(this.skip, this.limit, async results => {
        this.handleResponse(results);
        this.loaderService.dismissLoader();
      }, error => {

        this.loaderService.dismissLoader();
      });
    }

  }

  handleResponse(response) {
    this.users = new Array();
    if (response.results.length > 10)
      this.showPagination = true;
    response.results.forEach(element => {
      let user = new User(element);
      if (user.UserName !== this.loggedInUser.UserName || user.Email !== this.loggedInUser.Email) {
        user.Icon = "/assets/icon/" + element.Role + ".png";
        this.users.push(user);
      }
    });

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
      this.totalPages = Math.ceil(response.totalRecords / 10)

      if (this.totalPages > 5) {
        if (this.currentPage == this.totalPages) {
          this.allowFirst = true;
          this.allowPrev = true;
          this.allowLast = false;
          this.allowNext = false;

          this.pages.push(this.currentPage - 2);
          this.pages.push(this.currentPage - 1);
          this.pages.push(this.currentPage);
        }
        else
          if (this.currentPage == 1) {
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

    if (this.searchText !== '') {
      this.userService.listBykeyword(this.searchText, this.skip, this.limit, async results => {
        this.handleResponse(results);
        ev.target.complete();
      }, error => {
        ev.target.complete();
      });
    }
    else {
      this.userService.list(this.skip, this.limit, async results => {
        this.handleResponse(results);
        ev.target.complete();
      }, error => {
        ev.target.complete();
      });
    }
  }
  //Search
  ClearTextButtonClicked() {
    this.searchText = "";
    this.skip=0;
    this.currentPage = 1;
    this.loadusers();
  }
  SearchToggleButtonClicked() {
    this.searchToggle = !this.searchToggle;
  }
  FilterButtonClicked() {

  }
  SearchTextButtonClicked() {
    this.skip = 0;
    this.currentPage = 1;
    if (this.searchText != "")
      this.loadusers();
  }




  //Event Handlers
  userSelected(selectedUser) {
    this.userService.selectedUser = selectedUser;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        Id: selectedUser.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/user-details"], navigationExtras);
  }

  EditButtonClicked(selectedUser) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Id: selectedUser.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/update-user'], navigationExtras);
  }
  //Click Events
  AddUserButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/create-user"], navigationExtras);
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
    this.loadusers();

  }
  PrevClicked() {
    this.currentPage--;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage-1);
    this.loadusers();
  }
  NextClicked() {
    this.currentPage++;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage-1);
    this.loadusers();
  }
  LastClicked() {
    this.currentPage = this.totalPages;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage - 1);
    this.loadusers();
  }
  PageClicked(page) {
    this.currentPage = page;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage - 1);
    this.loadusers();
  }
}
