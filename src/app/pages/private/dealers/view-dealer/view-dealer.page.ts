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
  selector: 'app-view-dealer',
  templateUrl: './view-dealer.page.html',
  styleUrls: ['./view-dealer.page.scss'],
})
export class ViewDealerPage implements OnInit, AfterViewInit {
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
    this.loader = new User(JSON.parse('{}'));
    this.genders = this.userService.genders;
    this.roles = this.userService.roles;
    this.statuses = this.userService.statuses;
    this.loader.userRole = 'User';
    this.loader.name = '';
    this.loader.email = '';
    this.loader.phoneNumber = '';
    this.loader.userName = '';
    this.loader.userStatus = 'Active';
  }
  ngOnInit() {
    this.enableSave = false;
  }
  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const userId = Number.parseInt(params['userId'], 10);
      this.loadUserDetails(userId);
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
      },
    };
    this.router.navigate(['home/dealer-list'], navigationExtras);
  }
  
  UpdateButtonClicked() {
    this.userService.selectedUser = this.loader;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        userId:this.loader.id
      },
    };
    this.router.navigate(['home/update-dealer'], navigationExtras);
  }

}
