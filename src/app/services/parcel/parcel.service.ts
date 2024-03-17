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
import { BaseModel } from 'src/app/models/BaseModel';
export class ParcelURLs {
  public static SAVE_PARCEL = environment.apiURL + '/api/parcels/save';
  public static UPDATE_PARCEL = environment.apiURL +'/api/parcels/update';
  public static UPDATE_PARCEL_STATUS = environment.apiURL + '/api/parcels/updateStatus';
  public static READ_PARCEL = environment.apiURL + '/api/parcels/info?id=';
  public static READ_PARCEL_BY_CN = environment.apiURL + '/api/parcels/infoByCnNo?cnNo=';
  public static PARCEL_LIST = environment.apiURL + '/api/parcels/list';
  public static PARCEL_LIST_BY_STATUS = environment.apiURL + '/api/parcels/list/byStatuses?statuses=';
  public static PARCEL_LIST_BY_SUB_DEALER = environment.apiURL + '/api/parcels/list/bySubDealer?subdealer=';

}
@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  public selectedParcels:Parcel[];
  public selectedParcel:Parcel;
  public cnTypes = ['TBB', 'Standard', 'Fragile'];
  constructor( private eventBus: NgEventBus,
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private networkService: NetworkService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService) { }

    list(skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.PARCEL_LIST, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    listByStatus(status:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.PARCEL_LIST_BY_STATUS+status, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    listBySubDealer(subDealer:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.PARCEL_LIST_BY_SUB_DEALER+subDealer, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    read(id: string, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.READ_PARCEL+id, (response:any) => {
        success(response.results);
      }, () => {
        failure();
      });
    }
    readByCnNo(cnNo: string, success: (any), failure: (any)) {
      this.networkService.get(ParcelURLs.READ_PARCEL_BY_CN+cnNo, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
  save(parcel: Parcel, success: (any), failure: (any)) {
    this.networkService.post(ParcelURLs.SAVE_PARCEL, parcel.toCreationJSON(), (response:any) => {   
      success();
    }, () => {
      failure();
    });
  }
  update(parcel: Parcel, success: (any), failure: (any)) {
    this.networkService.put(ParcelURLs.UPDATE_PARCEL, parcel, (response:any) => {   
      success();
    }, () => {
      failure();
    });
  }
  updateStatus(parcel: Parcel, success: (any), failure: (any)) {
    var param = {
      "parcelStatus": parcel.parcelStatus,
      "id": parcel.id
    }; 
    this.networkService.post(ParcelURLs.UPDATE_PARCEL_STATUS, param, (result:any) => {   
      success(result);
    }, () => {
      failure();
    });
  }
}
