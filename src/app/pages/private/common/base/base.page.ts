import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
})
export class BasePage implements OnInit {
  public loggedInUser: User;
  constructor(public router: Router,
    public localStorageService:LocalStorageService) { 

    this.router.events.forEach((event) => {
     
      if(event instanceof NavigationEnd) {
      
      if( this.loggedInUser ==null)
        this.loggedInUser = new User(JSON.parse("{}"));
        console.log("Checking User: loadUserFromLocalDB on route change event"); 
        this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
      }
    
    });

  }
  ngOnInit() {
  }

}
