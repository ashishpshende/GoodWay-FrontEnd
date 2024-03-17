import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-view-unloader-list',
  templateUrl: './view-unloader-list.page.html',
  styleUrls: ['./view-unloader-list.page.scss'],
})
export class ViewUnloaderListPage implements OnInit {

  
  public loggedInUser: User;
  public users: User[];
  public skip: number = 0;
  public totalRecords: number = -1;
  public totalPages: number = -1;
  public countPerPage: number = 10;
  public limit: number = this.countPerPage;
  public currentPage: number = 1;
  public pages: number[] = new Array();
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
      this.userService.listBykeyword(this.searchText, this.skip, this.limit, async (results:any) => {
        this.handleResponse(results);
        this.loaderService.dismissLoader();
      }, () => {

        this.loaderService.dismissLoader();
      });
    }
    else {
      this.userService.listbyRole(KeywordConstants.ROLE_UNLOADER,true,this.skip, this.limit, async (results:any) => {
        this.handleResponse(results);
        this.loaderService.dismissLoader();
      }, () => {

        this.loaderService.dismissLoader();
      });
    }

  }

  handleResponse(response:any) {
    this.users = new Array();
    if (response.data.Items.length > 0)
    {
      response.data.Items.forEach((element:any) => {
        let user = new User(element);
        if (user.userName !== this.loggedInUser.userName || user.email !== this.loggedInUser.email) {
          user.icon = "/assets/icon/" + element.userRole+ ".png";
          this.users.push(user);
        }
      });
    }
   
  }

  handleRefresh(ev:any){

    if (this.searchText !== '') {
      this.userService.listBykeyword(this.searchText, this.skip, this.limit, async (results:any) => {
        this.handleResponse(results);
        ev.target.complete();
      }, () => {
        ev.target.complete();
      });
    }
    else {
      this.userService.list(this.skip, this.limit, async (results:any) => {
        this.handleResponse(results);
        ev.target.complete();
      }, () => {
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
  userSelected(selectedUser:User) {
    this.userService.selectedUser = selectedUser;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userId: selectedUser.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/view-dealer"], navigationExtras);
  }

  EditButtonClicked(selectedUser:User) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Id: selectedUser.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/update-dealer'], navigationExtras);
  }
  //Click Events
  AddUserButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/create-dealer"], navigationExtras);
  }


  //modal
  @ViewChild(IonModal) modal: IonModal ;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string ;

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
  PageClicked(page:any) {
    this.currentPage = page;
    this.limit = this.countPerPage;
    this.skip = this.countPerPage * (this.currentPage - 1);
    this.loadusers();
  }



}
