import { HelperService } from '../services/helpers/helper-service';
import { BaseModel } from './BaseModel';
import { formatDate } from '@angular/common';
export class Parcel  extends BaseModel{

    public CNNo: string;
    public CNType: string;
    public Dealer: string;
    public Receiver: string;
    public To: string;
    public From: string;
    public Mobile: string;
    public Quantity: string;
    public Weight: string;
    public Remarks: string;
    public ParcelStatus: string;
    constructor(requestJSON: any)  {
        super(requestJSON);
        this.CNNo =  requestJSON.cnNo;
        this.CNType =  requestJSON.cnType;
        this.Dealer =  requestJSON.dealer;
        this.Receiver =  requestJSON.receiver;
        this.To =  requestJSON.to;
        this.From =  requestJSON.from;
        this.Mobile =  requestJSON.mobile;
        this.Quantity =  requestJSON.quantity;
        this.Weight =  requestJSON.weight;
        this.Remarks =  requestJSON.remarks;
        this.ParcelStatus =  requestJSON.parcelStatus;
    }
}