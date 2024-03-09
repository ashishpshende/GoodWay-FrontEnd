import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { Transaction } from 'src/app/models/Transaction';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NetworkService } from '../network/network.service';
import { SecurityService } from '../security/security.service';
import { SharedService } from '../shared-service/shared.service';
import { environment } from 'src/environments/environment';
import { BaseModel } from 'src/app/models/BaseModel';
export class TransactionURLs {
  public static SAVE_TRANSACTION = environment.apiURL + '/api/transactions/save';
  public static TRANSACTION_LIST_BY_PARCELID = environment.apiURL + '/api/transactions/listByParcelNo?cnNo=';
  public static TRANSACTION_LIST_BY_ACTION = environment.apiURL + '/api/transactions/listByAction?action';
  public static TRANSACTION_LIST_BY_SUB_DEALER = environment.apiURL + '/api/transactions/list/bySubDealer?subdealer=';
  public static TRANSACTION_LIST_BY_DEALER = environment.apiURL + '/api/transactions/list/byDealer?dealer=';
  public static TRANSACTION_LIST_BY_CARRRIER = environment.apiURL + '/api/transactions/list/byCarrier?carrier=';
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public selectedTransaction:Transaction;  
  constructor( private eventBus: NgEventBus,
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private networkService: NetworkService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService) { }
    listByParcel(parcelId:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(TransactionURLs.TRANSACTION_LIST_BY_PARCELID+parcelId, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
      
    listByDealer(dealer:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(TransactionURLs.TRANSACTION_LIST_BY_DEALER+dealer, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    listBySubDealer(subDealer:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(TransactionURLs.TRANSACTION_LIST_BY_SUB_DEALER+subDealer, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    listByCarrier(career:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(TransactionURLs.TRANSACTION_LIST_BY_CARRRIER+career, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
    listByAction(action:string,skip: number = 0, limit: number = 10, success: (any), failure: (any)) {
      this.networkService.get(TransactionURLs.TRANSACTION_LIST_BY_ACTION+action, (response:any) => {
        success(response);
      }, () => {
        failure();
      });
    }
   
  save(transaction: Transaction, success: (any), failure: (any)) {
    transaction.createdOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    transaction.updatedOn = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
    this.networkService.post(TransactionURLs.SAVE_TRANSACTION, transaction.ToJSON(), (response:any) => {   
      success();
    }, () => {
      failure();
    });
  }
  
  
}
