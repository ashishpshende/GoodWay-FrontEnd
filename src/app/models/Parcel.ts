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

    //
    public icon: string;
    public qrIcon: string;


    constructor(requestJSON: any)  {
        super(requestJSON);
        this.qrIcon = "/assets/icon/qr-code.png";
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
    public toCreationJSON()
    {

        return {
            "cnNo" :  this.cnNo,
            "cnType" :  this.cnType,
            "dealer" :  this.dealer,
            "receiver" :  this.receiver,
            "to" :  this.to,
            "from" :  this.from,
            "mobile" :  this.mobile,
            "quantity" :  this.quantity,
            "weight" :  this.weight,
            "remarks" :  this.remarks,
            "parcelStatus" :  this.parcelStatus,
            "createdBy" :  (this.createdBy)?this.createdBy.id:"",
        }
    }
    public toUpdationJSON()
    {
        return {
            "id":this.id,
            "cnNo" :  this.cnNo,
            "cnType" :  this.cnType,
            "dealer" :  this.dealer,
            "receiver" :  this.receiver,
            "to" :  this.to,
            "from" :  this.from,
            "mobile" :  this.mobile,
            "quantity" :  this.quantity,
            "weight" :  this.weight,
            "remarks" :  this.remarks,
            "parcelStatus" :  this.parcelStatus,
            "updatedBy" :  (this.updatedBy)?this.updatedBy.id:"",
        }
    }
}