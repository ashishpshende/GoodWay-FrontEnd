import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { StoredPreference } from '../../models/StoredPreference';
import { User } from 'src/app/models/User';
import { KeywordConstants } from 'src/assets/constants/constants';
import { PlatformService } from '../platformService/platform.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  StoredPreference: StoredPreference;
  token!: string | '';
  constructor(
    private platformService: PlatformService,
    public storage: Storage
  ) {
    this.StoredPreference = new StoredPreference(JSON.parse('{}'));
  }
  LoadStoredPreference(success: any) {
    this.getItem(KeywordConstants.SELECTED_APP_LANGUAGE).then(
      (selected_Language: any) => {
        if (selected_Language.value) {
          this.getItem(KeywordConstants.DEFAULT_APP_LANGUAGE).then(
            (default_Language: any) => {
              this.StoredPreference.SelectedLanguage = default_Language.value;
            }
          );
        } else {
          this.StoredPreference.SelectedLanguage = selected_Language.value;
        }
      }
    );
    this.getItem(KeywordConstants.LOGGED_IN_STATUS).then((loggedIn: any) => {
      if (loggedIn.value) {
        this.StoredPreference.LoggedInStatus = loggedIn;
        if (loggedIn.value === "true") {
          this.getItem(KeywordConstants.USER_OBJECT).then((userInfo) => {
            this.StoredPreference.LoggedInUser = new User(
              JSON.parse(userInfo.value)
            );
            this.StoredPreference.LoggedInUserId =
              this.StoredPreference.LoggedInUser.id;
            this.StoredPreference.LoggedInUserName =
              this.StoredPreference.LoggedInUser.userName;
            this.StoredPreference.LoggedInUserEmail =
              this.StoredPreference.LoggedInUser.email;
            success();
          });
        } else {
          this.CreateAndAssigneEmptyUser();
          success();
        }
      } else {
        this.StoredPreference.LoggedInStatus = false;
        this.CreateAndAssigneEmptyUser();
        success();
      }
    });
  }
  CreateAndAssigneEmptyUser() {
    this.StoredPreference.LoggedInUser = new User(JSON.parse('{}'));
    this.StoredPreference.LoggedInUserId = -1;
    this.StoredPreference.LoggedInUserEmail = '';
    this.StoredPreference.LoggedInUserName = '';
  }
  SaveStoredPreference() {}
  public async setItem(key: string, value: any): Promise<any> {
    try {
      await Preferences.set({
        key: key,
        value: value,
      });
    } catch (ex: any) {
      return Promise.resolve('');
    }
  }
  public async getItem(key: string): Promise<any> {
    try {
      var value = await Preferences.get({
        key: key,
      });
      return Promise.resolve(value);
    } catch (ex: any) {
      return Promise.resolve('');
    }
  }
  public async clear() {
    await Preferences.clear();
  }
}
