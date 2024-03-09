
import { KeywordConstants } from 'src/assets/constants/constants';
import { BaseModel } from './BaseModel';
import { formatDate } from '@angular/common';
export class User  extends BaseModel {
    public prefix: string;
    public icon: string;
    public statusIcon: string;
    public userStatus: string;
    public userRole: string;
    public phoneNumber: string;
    public email: string;
    public city: string;
    public imageUrl: string ;
    public userName: string;
    public password: string ;
    public confirmPassword: string ;
    public resetRequired: boolean ;
    constructor(requestJSON: any)  {
        super(requestJSON);
        this.prefix = requestJSON.prefix;
        this.userName =  requestJSON.userName;
        this.email =   requestJSON.email;
        this.city =   requestJSON.city;
        this.userRole = requestJSON.userRole;
        this.phoneNumber = requestJSON.phoneNumber;
        this.userStatus = requestJSON.userStatus;
        this.statusIcon = '/assets/icon/'+ this.userStatus +'.png';
        this.icon = '/assets/icon/'+ this.userRole +'.png';
        if(requestJSON.ResetRequired==='1'){
            this.resetRequired = true;
        }
    }
    public clear() {
        this.userName =  '';
        this.email =   '';
        this.userName = '';
        this.phoneNumber ='';
        this.userStatus = '';
        this.statusIcon = '/assets/icon/'+this.userStatus+'.png';
    }
    public ToCredentialsJSON()
    {
        this.updatedOn = formatDate(new Date(),     KeywordConstants.DATE_FORMAT_STRING,
        KeywordConstants.DATE_FORMAT_LANGUAGE,
        KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,);
        return {
            userName: this.userName,
            email: this.email,
            resetRequired : true,
            updatedOn: this.updatedOn
          };
    }
    public ToProfileJSON() {
        return {
          userName: this.userName,
          password: this.password,
          email: this.email,
          phoneNumber: this.phoneNumber,
          name: this.name,
          Id: this.id
        };
      }
      public ToJSON() {
        return {
          id: this.id,
          name: this.name,
          userName: this.userName,
          city: this.city,
          prefix: this.prefix,
          userRole: this.userRole,
          email: this.email,
          phoneNumber: this.phoneNumber,
          userStatus: this.userStatus
        };
       
      }
}
