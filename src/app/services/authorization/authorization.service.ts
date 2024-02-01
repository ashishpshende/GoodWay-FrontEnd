import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { NetworkService } from '../network/network.service';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { environment } from 'src/environments/environment';
const USER_DETAIL_URL = environment.apiURL + '/users/info'
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  loggedInUser: User;
  constructor(private networkService: NetworkService) { 
    console.log("AuthorizationService Initialized.")
    this.loggedInUser = this.getStoredUser();

  }
   
  storeUser(user:User)
  {
    localStorage.setItem("USER_NAME",user.name.toString());

   
    if(user.Account !=null && user.Account != undefined)
    {
      localStorage.setItem("ACCOUNT_NAME",user.Account.name.toString());
    }
   

  }
  getStoredUser()
  {
    var user:User;

    if(localStorage.getItem("USER_ID")!=null)
    {
     
      user = new User(HelperService.EmptyJSON());
      user.name = localStorage.getItem("USER_NAME");
      this.loggedInUser = user;
    }

    return user;
  }
}