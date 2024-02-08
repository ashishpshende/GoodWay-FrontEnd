import { Injectable, numberAttribute } from '@angular/core';
import { User } from '../../models/User';
import { NetworkService } from '../network/network.service';
import { HelperService } from 'src/app/services/helpers/helper-service';
import { environment } from 'src/environments/environment';
import { KeywordConstants } from 'src/assets/constants/constants';
import { LocalStorageService } from '../localStorage/local-storage.service';
const USER_DETAIL_URL = environment.apiURL + '/users/info'
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  loggedInUser: User ;
  constructor(private networkService: NetworkService,
    private  localStorageService:LocalStorageService) { 
    console.log("AuthorizationService Initialized.")
    this.loggedInUser =   this.localStorageService.StoredPreference.LoggedInUser 

  }
}