/* eslint-disable max-len */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { KeywordConstants } from 'src/assets/constants/constants';

import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  authorizationToken: string;
  @BlockUI("CreateFormInstance") blockFormInstanceUI: NgBlockUI;
  headers: HttpHeaders;
  token: string;
  constructor(

    public alertController: AlertController,
    private httpClient: HttpClient
    ) {



    this.token = environment.API_KEY;
    this.headers = new HttpHeaders();
    this.headers.set("Source", "IONIC");
    this.headers.set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.READ_ONLY_API_KEY);
    this.headers.set("X-Spreadsheet-Id", environment.SpreadsheetId)

  }

  get(url: string, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = this.headers;
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser);
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId);
    }
    headers = headers.append(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.READ_ONLY_API_KEY); // add a new header, creating a new object

    this.httpClient.get(url, { headers }).subscribe(data => {
      success(data);
    },
      error => {
        failure('Log the error here: '+ error.error.text);
      });
  }
  post(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = new HttpHeaders().set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.API_KEY);
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser);
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId);
    }
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(url,data, { headers }).subscribe(response => {
      success(response);
    },
      error => {
        failure('Log the error here: ', error);
      });
  }
  postFormData(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = new HttpHeaders().set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.API_KEY);
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser);
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId);
    }

    this.httpClient.post(url,data, { headers: headers }).subscribe(response => {
      success(response);
    },
      error => {
        failure('Log the error here: ', error);
      });
  }
  patch(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = new HttpHeaders().set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.API_KEY); // create header object
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser);
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId);
    }

    headers = headers.append(KeywordConstants.AUTH_TOKEN_KEY, "Bearer " + environment.READ_ONLY_API_KEY);

    headers = headers.append("Content-Type", "application/json;");
    this.httpClient.patch(url,data, { headers: headers }).subscribe(response => {
      success(response);
    },
      error => {
        failure('Log the error here: ', error);
      });
  }

  delete(url: string,data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = new HttpHeaders().set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.API_KEY); // create header object
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser);
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId);
    }
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.delete(url, { headers: headers }).subscribe(response => {
      success(response);
    },
      error => {
        failure('Log the error here: ', error);
      });
  }

  put(url: string, data: any, success: (any), failure: (any)) {
    this.blockFormInstanceUI.start();
    let headers = new HttpHeaders().set(KeywordConstants.AUTH_TOKEN_KEY, 'Bearer ' + environment.API_KEY); // create header object
    if(url.indexOf("sheets/Users") > -1){
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadSheetIdUser); // add a new header, creating a new object
    }
    else{
      headers = headers.append(KeywordConstants.SPREADSHEET_ID_KEY, environment.SpreadsheetId); // add a new header, creating a new object
    }

    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.put(url,data, { headers }).subscribe(response => {
      success(response);
    },
      error => {
        failure('Log the error here: ', error);
      });


  }
}
