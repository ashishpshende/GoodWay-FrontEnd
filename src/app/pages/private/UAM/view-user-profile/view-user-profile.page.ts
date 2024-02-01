import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.page.html',
  styleUrls: ['./view-user-profile.page.scss'],
})
export class ViewUserProfilePage implements OnInit,AfterViewInit {
  public user:User
  constructor(private userService:UserService,
    private localStorageService:LocalStorageService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService) {

    if(this.userService.selectedUser!=null && this.userService.selectedUser!=undefined  )
    {
      this.user = this.userService.selectedUser;
    }
    else
    {
      this.user = new User(JSON.parse("{}"));
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.user = this.localStorageService.StoredPreference.LoggedInUser;

  }
  gotoResetPassword()
  {
    this.userService.selectedUser = this.user;
    this.userService.lastRoute = "view-user-profile";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        email: this.user.Email,
        ts: new Date().getTime()
      }
    };
    this.router.navigate(["reset-password"], navigationExtras);
  }
  goToHome()
  {
    this.userService.selectedUser = this.user;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(["home"], navigationExtras);
  }
  EditButtonClicked()
  {
    this.userService.selectedUser = this.user;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getTime()
      }
    };
    this.router.navigate(["update-user-profile"], navigationExtras);
  }
}
