/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable max-len */
import { User } from 'src/app/models/user';
import { NetworkService } from './../network/network.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared-service/shared.service';
import { AuthorizationService } from '../Authorization/authorization.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { formatDate } from '@angular/common';
import { SecurityService } from '../security/security.service';
import { NgEventBus } from 'ng-event-bus';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Key } from 'protractor';
const AUTH_TOKEN_KEY = 'Authorization';
export class UserURLs {

  public static USER_LOGIN_URL = environment.apiURL + '/api/users/Login';
  public static LIST = environment.apiURL + '/sheets/Users?keys=id,UserName,Email,PhoneNumber,FirstName,LastNamae,Role,Status,CreatedAt,Id&skip={SKIP}&limit={LIMIT}&timestamp=' + new Date().getTime();
  public static SEARCH = environment.apiURL + '/sheets/Users?keys=id,UserName,Email,PhoneNumber,FirstName,LastNamae,Role,Status,CreatedAt,Id&where={{SEARCH}}&timestamp=' + new Date().getTime();
  public static READ = environment.apiURL + '/api/users/Login?id=';
  public static UPDATE = environment.apiURL + '/sheets/Users/{ROW_INDEX}?timestamp=' + new Date().getTime();
  public static SAVE = environment.apiURL + '/sheets/Users?timestamp=' + new Date().getTime();
  public static DELETE = environment.apiURL + '/sheets/Users/{ROW_INDEX}?timestamp=' + new Date().getTime();
  public static READ_BY_USER_NAME = environment.apiURL + '/sheets/Users?keys=UserName,Id&where={"UserName":"USER_NAME" }&timestamp=' + new Date().getTime();
  public static READ_BY_EMAIL = environment.apiURL + '/sheets/Users?keys=Email,Id&where={"Email": "EMAIL"}&timestamp=' + new Date().getTime();
  public static RESET_PASSWORD = environment.apiURL + '/sheets/Users/{ROW_INDEX}?timestamp=' + new Date().getTime();
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  public authenticationState = new BehaviorSubject(false);
  public loggedInUser: User;
  public selectedUser: User;
  public lastRoute: string;
  sampleuser: any = {
    Id: 0,
    Name: 'OOps, Unable to fetch User Name',
    Account: {
      Id: 0,
      Name: 'OOps, Unable to fetch Compnay Name',
    }

  };
  constructor(
    private eventBus: NgEventBus,
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private networkService: NetworkService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService) {

    this.genders = ['Male', 'Female', 'Others'];
    this.roles = ['SuperAdmin', 'Admin', 'User'];
    this.statuses = ['Active', 'InActive', 'Suspended'];
  }

  isSessionValid(success: (any), failure: (any)) {
    if (this.localStorageService.StoredPreference.LoggedInStatus) {
      this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;

      this.readById(this.loggedInUser.id,
        serverUser => {

          switch (serverUser.Status) {
            case 'Active':
              this.loggedInUser = serverUser;
              if (this.loggedInUser.Email === serverUser.Email)
                {success(this.loggedInUser);}
              else
                {this.logout(_success => { failure('EMAIL_UPDATED'); });}
              break;
            case 'Inactive':
            case 'InActive':
              this.logout(_success => { failure('INACTIVE_USER'); });
              break;
            case 'Suspended':
              this.logout(_success => { failure('SUSPENDED_USER'); });
              break;
            case 'ResetRequired':
              this.logout(_success => { failure('RESET_REQUIRED'); });
              break;
          }
        },
        _error => {
          failure('USER_NOT_FOUND');
        }
      );
    }
    else {
      failure('SOMETHING_WENT_WRONG');
    }
  }
  getUseDetails(success: (any), failure: (any)) {
    if (this.localStorageService.StoredPreference.LoggedInStatus === true) {
      this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
      this.readById(this.loggedInUser.id,
        serverUser => {
          switch (serverUser.Status) {
            case 'Active':
              this.loggedInUser = serverUser;
              if (this.loggedInUser.Email === serverUser.Email)
                {success(this.loggedInUser);}
              else
                {this.logout(_success => { failure('EMAIL_UPDATED'); });}
              break;
            case 'Inactive':
            case 'InActive':
              this.logout(_success => { failure('INACTIVE_USER'); });

              break;
            case 'Suspended':

              this.logout(_success => { failure('SUSPENDED_USER'); });
              break;
          }
        },
        _error => {
          failure('USER_NOT_FOUND');
        }
      );
    }
    else {
      failure('SOMETHING_WENT_WRONG');
    }
  }

  logout(success: (any)) {

    this.authenticationService.logout(_authenticationSuccess => {
      if (!this.loggedInUser)
        {this.loggedInUser.FirstName = '';}
      this.loggedInUser.LastName = '';
      this.loggedInUser.UserName = '';
      this.loggedInUser.Email = '';
      this.loggedInUser.Gender = '';
      this.loggedInUser.DateOfBirth = '';
      this.loggedInUser.Role = '';
      this.loggedInUser.PhoneNumber = '';
      this.loggedInUser.Status = '';
      this.loggedInUser.StatusIcon = '';
      success();
    });
  }
  login(userName: string, password: string, success: (any), failure: (any)) {
    this.loggedInUser = new User(JSON.parse('{}'));
    var requestParams = {
          username: userName,
                password: this.securityService.hash(password)
    };


    this.networkService.post(UserURLs.USER_LOGIN_URL, requestParams, response => {
      if (response.statusCode==='SUCCESS') {
        this.loggedInUser = new User(response.data);
          switch (this.loggedInUser.Status) {
            case 'Active':
              if (this.loggedInUser.ResetRequired === true) {
                failure('RESET_REQUIRED');
              }
              else
              {
                this.authenticationService.login(_authenticationSuccess => {
                  this.setLocalUser(this.loggedInUser);
                  success();
                });
              }
              break;
            case 'Inactive':
            case 'InActive':
              failure('INACTIVE_USER');
              break;
            case 'Suspended':
              failure('SUSPENDED_USER');
              break;
          }
      }
      else {
        failure('INVALID_CREDENTAILS');
      }
    }, error => {
      console.log('Error:' + error);
      console.log(`Error:${error}`);
      failure('INVALID_CREDENTAILS');
    });
  }

  checkUser(email: string, password: string, success: (any), failure: (any)) {
    this.loggedInUser = new User(JSON.parse('{}'));
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('EMAIL', email).replace('PASSWORD', this.securityService.hash(password)), response => {

      if (response.results.length !== 0) {
        var user = response.results[0];
        switch (user.Status) {
          case 'Active':
            success(user);
            break;
          case 'Inactive':
          case 'InActive':
            failure('INACTIVE_USER');
            break;
          case 'Suspended':
            failure('SUSPENDED_USER');
            break;
        }
      }
      else {
        failure('INVALID_CREDENTAILS');
      }
    }, error => {
      console.log(`Error:${error}`);
      failure('INVALID_CREDENTAILS');
    });
  }
  Validate(user: User): boolean {
    if (user.FirstName == null || user.FirstName === undefined || user.FirstName === '') {
      return false;
    }


    if (user.LastName == null || user.LastName === undefined || user.LastName === '') {
      return false;
    }

    if (user.Gender == null || user.Gender === undefined || user.Gender === '') {
      return false;
    }

    if (user.Email == null || user.Email === undefined || user.Email === '') {
      return false;
    }

    if (user.PhoneNumber == null || user.PhoneNumber === undefined || user.PhoneNumber === '') {
      return false;
    }

    if (user.UserName == null || user.UserName === undefined || user.UserName === '') {
      return false;
    }


    return true;

  }
  list(skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.LIST.replace('{SKIP}', skip.toString()).replace('{LIMIT}', limit.toString()), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  listBykeyword(searchKeyword: string, skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.LIST.replace('{SKIP}', skip.toString()).replace('{LIMIT}', limit.toString()).replaceAll('USER_NAME', searchKeyword), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  search(reg_no: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.SEARCH.replace('{REG_NO}', reg_no), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  read(reg_no: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.SEARCH.replace('{REG_NO}', reg_no), response => {
      success(response.results);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  readById(id: number, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ.replace('{ROW_INDEX}', id.toString()), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  readByEmail(email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ.replace('EMAIL', email), response => {
      success(response.result);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  readByUserName(userName: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('USER_NAME', userName), response => {
      success(response.result);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  SaveUser(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    user.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.post(UserURLs.SAVE, this.ToJSON(user), response => {
      user.id = response.id;
      success(user);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  UpdateUser(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToUpdateJSON(user), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  UpdateUserCredentials(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToCredentialsJSON(user), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  ResetPassword(Id: number, newPassword: string, success: (any), failure: (any)) {
    var requestParams = {
      UpdatedOn: formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530'),
      Password: this.securityService.hash(newPassword),
      ResetRequired: 0
    };
    this.networkService.put(UserURLs.RESET_PASSWORD.replace('{ROW_INDEX}', Id.toString()), requestParams, response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  DeleteUser(user: User, success: (any), failure: (any)) {
    this.networkService.delete(UserURLs.DELETE.replace('{ROW_INDEX}', user.id.toString()), this.ToJSON(user), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }

  //Profile
  UpdateUserProfile(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    //user.Password = this.securityService.hash(user.Password);
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToUpdateJSON(user), response => {
      console.log('UpdateUserProfile',response);
      this.setLocalUser(response);
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  setLocalUser(userObject)
  {
    this.authorizationService.loggedInUser = userObject;
    if(userObject.Role)
    {
      this.localStorageService.StoredPreference.LoggedInUser = userObject;
    }
    else
    {
      this.localStorageService.StoredPreference.LoggedInUser.FirstName = userObject.FirstName;
      this.localStorageService.StoredPreference.LoggedInUser.LastName = userObject.LastName;
      this.localStorageService.StoredPreference.LoggedInUser.UserName = userObject.UserName ;
      this.localStorageService.StoredPreference.LoggedInUser.Gender = userObject.Gender;
      this.localStorageService.StoredPreference.LoggedInUser.PhoneNumber = userObject.PhoneNumber;
      this.localStorageService.StoredPreference.LoggedInUser.Email = userObject.Email;

    }
    this.localStorageService.StoredPreference.LoggedInStatus = true;
    this.localStorageService.StoredPreference.LoggedInUserEmail = userObject.Email;
    this.localStorageService.StoredPreference.LoggedInUserName = userObject.UserName;
    this.localStorageService.StoredPreference.LoggedInUserId = userObject.id;
    this.localStorageService.setItem(KeywordConstants.USER_OBJECT, userObject);
    this.localStorageService.setItem(KeywordConstants.USER_EMAIL, userObject.Email);
    this.localStorageService.setItem(KeywordConstants.USER_NAME, userObject.UserName);
    this.localStorageService.setItem(KeywordConstants.USER_ROW_INDEX, userObject.id);
    this.localStorageService.setItem(KeywordConstants.DEFAULT_APP_LANGUAGE, 'en');

  }
  ToJSON(user: User) {

    if (user.id != null && user.id !== undefined && user.id !== 0)
      {return {
        UserName: user.UserName,
        Password: this.securityService.hash(user.Password),
        Email: user.Email,
        PhoneNumber: user.PhoneNumber,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Gender: user.Gender,
        Role: user.Role,
        Status: user.Status,
        Id: user.id,
        CreatedOn: user.createdOn,
        UpdatedOn: user.updatedOn,
        ResetRequired: user.ResetRequired ? 1 : 0
      };}
    else
      {return {
        UserName: user.UserName,
        Password: this.securityService.hash(user.Password),
        Email: user.Email,
        PhoneNumber: user.PhoneNumber,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Gender: user.Gender,
        Role: user.Role,
        Status: user.Status,
        CreatedOn: user.createdOn,
        UpdatedOn: user.updatedOn,
        ResetRequired: user.ResetRequired ? 1 : 0
      };}
  }
  getUserByUserNameEmail(userName: string,email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('USER_NAME', userName).replace('EMAIL', email).replace('USER_NAME', userName), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  getUserByEmail(email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_EMAIL.replace('EMAIL', email), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  sendForgotPasswordEmail(userFullName: string,userName: string,email: string,password: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.RESET_PASSWORD.replace('{USER_NAME}', userName).replace('{EMAIL}', email).replace('{PASSWORD}', password).replace('{USER_FULL_NAME}', userFullName), response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  sendForgotUserEmail(userFullName: string,email: string,userName: string, success: (any), failure: (any)) {
    var url = UserURLs.READ.replace('{USER_NAME}', userName).replace('{EMAIL}', email).replace('{USER_FULL_NAME}', userFullName);
    this.networkService.get(url, response => {
      success(response);
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  ToUpdateJSON(user: User) {

    return {
      UserName: user.UserName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Gender: user.Gender,
      Role: user.Role,
      Status: user.Status,
      UpdatedOn: user.updatedOn
    };
  }

  ToProfileJSON(user: User) {
    return {
      UserName: user.UserName,
      Password: this.securityService.hash(user.Password),
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Gender: user.Gender,
      Id: user.id
    };
  }
      public ToCredentialsJSON(user: User)
    {
      user.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
        return {
            UserName: user.UserName,
            Email: user.Email,
            Password: this.securityService.hash(user.Password),
            ResetRequired : 1,
            UpdatedOn: user.updatedOn
          };
    }
}
