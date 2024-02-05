import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { StoredPreference } from '../../models/StoredPreference';
import { User } from 'src/app/models/User';
import { KeywordConstants } from 'src/assets/constants/constants';
import { PlatformService } from '../platformService/platform.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  StoredPreference: StoredPreference;
  token!: string | '';
  constructor(
    // private nativeStorage:NativeStorage,
    private platformService:PlatformService,
    public storage: Storage) {
    this.StoredPreference = new StoredPreference(JSON.parse("{}"));
  }
  LoadStoredPreference(success:any) {
  
    this.getItem(KeywordConstants.SELECTED_APP_LANGUAGE).then((selected_Language:string) => {
      if (selected_Language == null) {
        this.getItem(KeywordConstants.DEFAULT_APP_LANGUAGE).then((default_Language:string) => {
          this.StoredPreference.SelectedLanguage = default_Language;
        });
      }
      else {
        this.StoredPreference.SelectedLanguage = selected_Language;
      }
    });
    this.getItem(KeywordConstants.LOGGED_IN_STATUS).then((loggedIn: boolean) => {
      if (loggedIn != null) {
        this.StoredPreference.LoggedInStatus = loggedIn;
        if (loggedIn) {
          //load User Object
          this.getItem(KeywordConstants.USER_OBJECT).then(userInfo => {
              this.StoredPreference.LoggedInUser = new User(userInfo);
              this.StoredPreference.LoggedInUserId = this.StoredPreference.LoggedInUser.id;
              this.StoredPreference.LoggedInUserName = this.StoredPreference.LoggedInUser.UserName;
              this.StoredPreference.LoggedInUserEmail = this.StoredPreference.LoggedInUser.Email;
              success()
          });
        }
        else {
          this.CreateAndAssigneEmptyUser()
          success()
        }
      }
      else {
        this.StoredPreference.LoggedInStatus = false;
        this.CreateAndAssigneEmptyUser();
        success();
      }
    });
  }
  CreateAndAssigneEmptyUser() {
    this.StoredPreference.LoggedInUser = new User(JSON.parse("{}"));
    this.StoredPreference.LoggedInUserId = -1;
    this.StoredPreference.LoggedInUserEmail = "";
    this.StoredPreference.LoggedInUserName = "";

  }
  SaveStoredPreference() {
  }
  setItem(key: string, value: any): Promise<any> {
    if (this.platformService.currentPlatform === 'native') {
     // return this.nativeStorage.setItem(key, value);
      return  Promise.resolve("");

    }
    else {
      return this.storage.set(key, value);
    }
  }
  getItem(key: string): Promise<any> {
    if (this.platformService.currentPlatform === 'native') {
      //return this.nativeStorage.getItem(key);
      return  Promise.resolve("");
    }
    else {
      return this.storage.get(key);
    }
  }
  public clear() {
    if (this.platformService.currentPlatform === 'native') {
      // this.nativeStorage.clear().then(() => {
      //   console.log('Local Storage Cleared');
      // });
      return  Promise.resolve("");

    }
    else {
      this.storage.clear().then(() => {
        console.log('Local Storage Cleared');
      });
    }
  }
}
