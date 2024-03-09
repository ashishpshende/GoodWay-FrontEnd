import { User } from 'src/app/models/User';
import { NetworkService } from './../network/network.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared-service/shared.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { formatDate } from '@angular/common';
import { SecurityService } from '../security/security.service';
import { NgEventBus } from 'ng-event-bus';
import { AuthenticationService } from '../authentication/authentication.service';
export class UserURLs {

  public static USER_LOGIN_URL = environment.apiURL + '/api/users/Login';
  public static LIST = environment.apiURL+ '/api/users/list';
  public static LIST_BY_ROLE = environment.apiURL+ '/api/users/list?role=';
  public static LIST_ACTIVE_BY_ROLE = environment.apiURL+ '/api/users/list?status=Active&role=';

  public static SEARCH = environment.apiURL + '/api/users/search';
  public static READ = environment.apiURL + '/api/users/info?id=';
  public static UPDATE = environment.apiURL + '/api/users/update';
  public static SAVE = environment.apiURL + '/api/users/save';
  public static DELETE = environment.apiURL + '/api/users/delete';
  public static READ_BY_USER_NAME = environment.apiURL + '/api/users/readByEmail';
  public static READ_BY_EMAIL = environment.apiURL + '/api/users/readByEmail';
  public static RESET_PASSWORD = environment.apiURL + '/api/users/reset';
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public genders: Array<string> = [];
  public roles: Array<string> = [];
  public statuses: Array<string> = [];
  public authenticationState = new BehaviorSubject(false);
  public loggedInUser: User ;
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
    }
    else {
      failure('SOMETHING_WENT_WRONG');
    }
  }
  getUseDetails(success: (any), failure: (any)) {
    if (this.localStorageService.StoredPreference.LoggedInStatus === true) {
      this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;     
    }
    else {
      failure('SOMETHING_WENT_WRONG');
    }
  }

  logout(success: (any)) {

    this.authenticationService.logout(() => {
      if (this.loggedInUser)
      {
      this.loggedInUser.userName = '';
      this.loggedInUser.email = '';
      this.loggedInUser.userRole = '';
      this.loggedInUser.phoneNumber = '';
      this.loggedInUser.userStatus = '';
      this.loggedInUser.statusIcon = '';
      success();
    }});
  }
  login(userName: string, password: string, success: (any), failure: (any)) {
    this.loggedInUser = new User(JSON.parse('{}'));
    var requestParams = {
          username: userName,
                password: this.securityService.hash(password)
    };


    this.networkService.post(UserURLs.USER_LOGIN_URL, requestParams, (response:any) => {
      if (response.statusCode==='SUCCESS') {
        this.loggedInUser = new User(response.data);
          switch (this.loggedInUser.userStatus) {
            case 'Active':
              if (this.loggedInUser.resetRequired === true) {
                failure('RESET_REQUIRED');
              }
              else
              {
                this.authenticationService.login(() => {
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
    }, () => {
      failure('INVALID_CREDENTAILS');
    });
  }

  checkUser(email: string, password: string, success: (any), failure: (any)) {
    this.loggedInUser = new User(JSON.parse('{}'));
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('EMAIL', email).replace('PASSWORD', this.securityService.hash(password)), (response:any) => {

      if (response.results.length !== 0) {
        var user = response.results[0];
        switch (user.userStatus) {
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
    }, () => {
      failure('INVALID_CREDENTAILS');
    });
  }
  Validate(user: User): boolean {
    if (user.name) {
      return false;
    }
    if (user.email == null || user.email === undefined || user.email === '') {
      return false;
    }

    if (user.phoneNumber == null || user.phoneNumber === undefined || user.phoneNumber === '') {
      return false;
    }

    if (user.userName == null || user.userName === undefined || user.userName === '') {
      return false;
    }


    return true;

  }
  list(skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.LIST, (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  listbyRole(role:string,showActiveOnly:boolean ,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {

    this.networkService.get((showActiveOnly?UserURLs.LIST_ACTIVE_BY_ROLE:UserURLs.LIST_BY_ROLE)+role, (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  listBykeyword(searchKeyword: string, skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.LIST, (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  search(reg_no: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.SEARCH.replace('{REG_NO}', reg_no), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  read(reg_no: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.SEARCH.replace('{REG_NO}', reg_no), (response:any) => {
      success(response.results);
    }, () => {
      failure();
    });
  }
  readById(id: number, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ, (response:any) => {
      success(response.data);
    }, () => {
      failure();
    });
  }
  readByEmail(email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ.replace('EMAIL', email), (response:any) => {
      success(response.result);
    }, () => {
      failure();
    });
  }
  readByUserName(userName: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('USER_NAME', userName), (response:any) => {
      success(response.result);
    }, () => {
      failure();
    });
  }
  SaveUser(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(),  
    KeywordConstants.DATE_FORMAT_STRING,
    KeywordConstants.DATE_FORMAT_LANGUAGE,
    KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
    user.updatedOn = formatDate(new Date(),  
    KeywordConstants.DATE_FORMAT_STRING,
    KeywordConstants.DATE_FORMAT_LANGUAGE,
    KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
    this.networkService.post(UserURLs.SAVE, this.ToJSON(user), (response:any) => {
      user.id = response.id;
      success(user);
    }, () => {
      failure();
    });
  }
  UpdateUser(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(),  
    KeywordConstants.DATE_FORMAT_STRING,
    KeywordConstants.DATE_FORMAT_LANGUAGE,
    KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToUpdateJSON(user), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  UpdateUserCredentials(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(), 
    KeywordConstants.DATE_FORMAT_STRING,
    KeywordConstants.DATE_FORMAT_LANGUAGE,
    KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToCredentialsJSON(user), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  ResetPassword(Id: number, newPassword: string, success: (any), failure: (any)) {
    var requestParams = {
      UpdatedOn: formatDate(new Date(), 
      KeywordConstants.DATE_FORMAT_STRING,
      KeywordConstants.DATE_FORMAT_LANGUAGE,
      KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,),
      Password: this.securityService.hash(newPassword),
      ResetRequired: 0
    };
    this.networkService.put(UserURLs.RESET_PASSWORD.replace('{ROW_INDEX}', Id.toString()), requestParams, (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  DeleteUser(user: User, success: (any), failure: (any)) {
    this.networkService.delete(UserURLs.DELETE.replace('{ROW_INDEX}', user.id.toString()), this.ToJSON(user), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }

  //Profile
  UpdateUserProfile(user: User, success: (any), failure: (any)) {
    user.createdOn = formatDate(new Date(),
    KeywordConstants.DATE_FORMAT_STRING,
    KeywordConstants.DATE_FORMAT_LANGUAGE,
    KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
    //user.Password = this.securityService.hash(user.Password);
    this.networkService.put(UserURLs.UPDATE.replace('{ROW_INDEX}', user.id.toString()), this.ToUpdateJSON(user), (response:any) => {
      console.log('UpdateUserProfile',response);
      this.setLocalUser(response);
      success(response);
    }, () => {
      failure();
    });
  }
  setLocalUser(userObject:User)
  {
    this.authorizationService.loggedInUser = userObject;
    this.localStorageService.StoredPreference.LoggedInUser = userObject;
    this.localStorageService.StoredPreference.LoggedInStatus = true;
    this.localStorageService.StoredPreference.LoggedInUserEmail = userObject.email;
    this.localStorageService.StoredPreference.LoggedInUserName = userObject.userName;
    this.localStorageService.StoredPreference.LoggedInUserId = userObject.id;
    
    this.localStorageService.setItem(KeywordConstants.USER_OBJECT,JSON.stringify(userObject.ToJSON()));
    this.localStorageService.setItem(KeywordConstants.USER_EMAIL, userObject.email);
    this.localStorageService.setItem(KeywordConstants.USER_NAME, userObject.userName);
    this.localStorageService.setItem(KeywordConstants.USER_ROW_INDEX, userObject.id);
    this.localStorageService.setItem(KeywordConstants.DEFAULT_APP_LANGUAGE, 'en');
    this.localStorageService.setItem(KeywordConstants.SELECTED_APP_LANGUAGE, 'en');


  }
  ToJSON(user: User) {

    if (user.id != null && user.id !== undefined && user.id !== 0)
      {return {
        UserName: user.userName,
        Password: this.securityService.hash(user.password??""),
        Email: user.email,
        PhoneNumber: user.phoneNumber,
        name: user.name,
        Role: user.userRole,
        Status: user.userStatus,
        Id: user.id,
        CreatedOn: user.createdOn,
        UpdatedOn: user.updatedOn,
        ResetRequired: user.resetRequired ? 1 : 0
      };}
    else
      {return {
        UserName: user.userName,
        Password: this.securityService.hash(user.password??""),
        Email: user.email,
        PhoneNumber: user.phoneNumber,
        Role: user.userRole,
        Status: user.userStatus,
        CreatedOn: user.createdOn,
        UpdatedOn: user.updatedOn,
        ResetRequired: user.resetRequired ? 1 : 0
      };}
  }
  getUserByUserNameEmail(userName: string,email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_USER_NAME.replace('USER_NAME', userName).replace('EMAIL', email).replace('USER_NAME', userName), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  getUserByEmail(email: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.READ_BY_EMAIL.replace('EMAIL', email), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  sendForgotPasswordEmail(userFullName: string,userName: string,email: string,password: string, success: (any), failure: (any)) {
    this.networkService.get(UserURLs.RESET_PASSWORD.replace('{USER_NAME}', userName).replace('{EMAIL}', email).replace('{PASSWORD}', password).replace('{USER_FULL_NAME}', userFullName), (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  sendForgotUserEmail(userFullName: string,email: string,userName: string, success: (any), failure: (any)) {
    var url = UserURLs.READ.replace('{USER_NAME}', userName).replace('{EMAIL}', email).replace('{USER_FULL_NAME}', userFullName);
    this.networkService.get(url, (response:any) => {
      success(response);
    }, () => {
      failure();
    });
  }
  ToUpdateJSON(user: User) {

    return {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      navigator: user.name,
      userRole: user.userRole,
      userStatus: user.userStatus,
      updatedOn: user.updatedOn
    };
  }

  ToProfileJSON(user: User) {
    return {
      userName: user.userName,
      password: this.securityService.hash(user.password??""),
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      id: user.id
    };
  }
      public ToCredentialsJSON(user: User)
    {
      user.updatedOn = formatDate(new Date(), 
      KeywordConstants.DATE_FORMAT_STRING,
      KeywordConstants.DATE_FORMAT_LANGUAGE,
      KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
        return {
            UserName: user.userName,
            Email: user.email,
            Password: this.securityService.hash(user.password??""),
            ResetRequired : 1,
            UpdatedOn: user.updatedOn
          };
    }
}
