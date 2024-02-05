// import { HelperService } from 'src/app/helpers/helper-service.ts';
export class BaseModel {
    name: string ;
    description: string ;
    createdBy: BaseModel ;
    createdOn: string ;
    updatedBy: BaseModel ;
    updatedOn: string ;
    id: number;
    constructor(requestJSON: any)
    {
        if(requestJSON)
        {
            this.name = (requestJSON.name) ?? requestJSON.name;
            this.description = (requestJSON.Description) ?? requestJSON.Description;
            this.createdOn = (requestJSON.createdOn) ?? requestJSON.createdOn;
            this.updatedOn = (requestJSON.updatedOn) ?? requestJSON.updatedOn;
            this.createdBy = (requestJSON.createdBy) ?? new BaseModel(requestJSON.createdBy) ;
            this.updatedBy = (requestJSON.updatedBy) ?? new BaseModel(requestJSON.updatedBy)  ;
            this.id = requestJSON.id;
        }
     

    }

   static  getDefaultObject() {
       const defaultObject = new BaseModel(JSON);
        return defaultObject;
    }
    public toJSON()
    {
        return {
            "id" :  this.id,
            "name" :  this.name
        }
    }
}
