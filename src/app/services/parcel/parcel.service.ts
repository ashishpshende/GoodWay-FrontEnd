import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { Parcel } from 'src/app/models/Parcel';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NetworkService } from '../network/network.service';
import { SecurityService } from '../security/security.service';
import { SharedService } from '../shared-service/shared.service';
import { environment } from 'src/environments/environment';
export class ParcelURLs {
  public static SAVE_PARCEL = environment.apiURL + '/api/parcels/save';
  public static UPDATE_PARCEL = environment.apiURL +'/api/parcels/update';
  public static UPDATE_PARCEL_STATUS = environment.apiURL + '/api/parcels/updatStatus';
  public static READ_PARCEL = environment.apiURL + '/api/parcels/info?id';
  public static PARCEL_LIST = environment.apiURL + '/api/parcels/list';
}
@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  
  constructor( private eventBus: NgEventBus,
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private networkService: NetworkService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService) { }

    list(skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.PARCEL_LIST, response => {
        success(response);
      }, error => {
        console.log('Error:' + error);
        failure();
      });
    }
    read(id: string, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.READ_PARCEL+id, response => {
        success(response.results);
      }, error => {
        console.log('Error:' + error);
        failure();
      });
    }
  save(parcel: Parcel, success: (any), failure: (any)) {
    parcel.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    parcel.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.post(ParcelURLs.SAVE_PARCEL, parcel, response => {   
      success();
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  update(parcel: Parcel, success: (any), failure: (any)) {
    parcel.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    parcel.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.post(ParcelURLs.UPDATE_PARCEL, parcel, response => {   
      success();
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
  updateStatus(parcel: Parcel, success: (any), failure: (any)) {
    parcel.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    parcel.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.post(ParcelURLs.UPDATE_PARCEL_STATUS, parcel, response => {   
      success();
    }, error => {
      console.log('Error:' + error);
      failure();
    });
  }
}
