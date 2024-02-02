import { HelperService } from '../services/helpers/helper-service';
import { BaseModel } from './BaseModel';
import { formatDate } from '@angular/common';
export class Parcel  extends BaseModel{

    public cnNo: string;
    public cnType: string;
    public dealer: string;
    public receiver: string;
    public to: string;
    public from: string;
    public mobile: string;
    public quantity: string;
    public weight: string;
    public remarks: string;
    public parcelStatus: string;
    constructor(requestJSON: any)  {
        super(requestJSON);
        this.cnNo =  requestJSON.cnNo;
        this.cnType =  requestJSON.cnType;
        this.dealer =  requestJSON.dealer;
        this.receiver =  requestJSON.receiver;
        this.to =  requestJSON.to;
        this.from =  requestJSON.from;
        this.mobile =  requestJSON.mobile;
        this.quantity =  requestJSON.quantity;
        this.weight =  requestJSON.weight;
        this.remarks =  requestJSON.remarks;
        this.parcelStatus =  requestJSON.parcelStatus;
    }
}