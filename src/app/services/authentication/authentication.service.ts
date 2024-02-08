import { NetworkService } from '../network/network.service';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticationStatus: boolean ;
  authenticationState = new BehaviorSubject(false);
  constructor(
    private localStorage: LocalStorageService,
    private platform: Platform,
    private networkService: NetworkService) {
      this.authenticationStatus = false;
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
    this.localStorage.getItem(KeywordConstants.LOGGED_IN_STATUS).then(result => {
      if (result.value) {
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
    this.isAuthenticated((result:any) => {
      this.authenticationStatus = result;
    }, () => {
      this.authenticationStatus = false;
    });

  }
  getAuthenticationStatus = async (status:any) => {
    this.localStorage.getItem(KeywordConstants.LOGGED_IN_STATUS).then(result => {
      console.log("AuthenticationStatus: ", result.value);
        status(result.value);
    });
  }
}
