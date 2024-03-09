import { BaseModel } from './BaseModel';
import { formatDate, getLocaleDateFormat } from '@angular/common';
export class Transaction extends BaseModel {
  public icon: string;
  public action: string;
  public userId: string;
  public userRole: string;
  public userFullName: string;
  public parcelId: string;
  constructor(requestJSON: any) {
    super(requestJSON);
    this.action = requestJSON.action;
    this.icon = '/assets/icon/' + this.action + '.png';
    this.userId = requestJSON.city;
    this.userRole = requestJSON.userRole;
    this.parcelId = requestJSON.parcelId;
    this.userFullName = requestJSON.userFullName;
    this.createdOn = requestJSON.createdOn;
  }
  public clear() {
    this.action = '';
    this.userId = '';
    this.userFullName = '';
    this.icon = '/assets/icon/' + this.action + '.png';
    this.parcelId = '';
    this.createdOn = '';
  }

  public ToJSON() {
    return {
      id: this.id,
      userFullName: this.userFullName,
      parcelId: this.parcelId,
      action: this.action,
      userId: this.userId,
      userRole: this.userRole,
      createdOn: '',
    };
  }
}
