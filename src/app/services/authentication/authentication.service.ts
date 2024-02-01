import { NetworkService } from '../network/network.service';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AuthorizationService } from '../Authorization/authorization.service';
import { environment } from 'src/environments/environment';
import { SecurityService } from '../security/security.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';
const AUTH_TOKEN_KEY = 'Authorization';
const USER_LOGIN_URL = environment.apiURL + '/sheets/Users?where={"UserName":"USER_NAME","Password":"PASSWORD"}';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticationStatus: boolean;
  authenticationState = new BehaviorSubject(false);
  constructor(
    private localStorage: LocalStorageService,
    private platform: Platform,
    private networkService: NetworkService) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }
  login(success: (any)) {
    this.localStorage.setItem(KeywordConstants.LOGGED_IN_STATUS, true).then(res => {
      this.authenticationState.next(true);
      this.authenticationStatus = true;
      success();
    });
  }

  logout(success: (any)) {
    this.localStorage.setItem(KeywordConstants.LOGGED_IN_STATUS, false).then(res => {
      this.authenticationState.next(false);
      this.authenticationStatus = false;
      this.localStorage.clear();
      success();
    });
  }
  isAuthenticated(success: (any), failure: (any)) {
    this.localStorage.getItem(KeywordConstants.LOGGED_IN_STATUS).then(res => {
      if (res != null && res != undefined) {
        this.authenticationState.next(true);
        this.authenticationStatus = true;
        success(true);
      }
      else {
        this.authenticationState.next(false);
        this.authenticationStatus = false;
        failure(false);
      }
    });
    return this.authenticationState.value;
  }
  checkToken() {
    this.isAuthenticated(result => {
      this.authenticationStatus = result;
    }, error => {
      this.authenticationStatus = false;
    });

  }
  getAuthenticationStatus = async (status) => {
    this.localStorage.getItem(KeywordConstants.LOGGED_IN_STATUS).then(res => {
      console.log("AuthenticationStatus: ", res);
        status(res);
    });
  }
}
