// import { HelperService } from 'src/app/helpers/helper-service.ts';
export class BaseModel {
    name: string;
    description: string;
    createdBy: BaseModel | null;
    createdOn: string;
    updatedBy: BaseModel | null;
    updatedOn: string;
    id: number;
    constructor(requestJSON: any)
    {
        this.name = (requestJSON.name != null &&  requestJSON.name !== undefined) ? requestJSON.name : '';
        this.description = (requestJSON.Description != null &&  requestJSON.Description !== undefined) ? requestJSON.Description : '';
        this.createdOn = (requestJSON.createdOn !== null &&  requestJSON.createdOn !== undefined) ? requestJSON.createdOn : '';
        this.updatedOn = (requestJSON.updatedOn !== null &&  requestJSON.updatedOn !== undefined) ? requestJSON.updatedOn : '';
        this.createdBy = (requestJSON.createdBy) ? new BaseModel(requestJSON.createdBy) : null ;
        this.updatedBy = (requestJSON.updatedBy) ? new BaseModel(requestJSON.updatedBy) : null ;
        this.id = requestJSON.id;

    }

   static  getDefaultObject() {
       const defaultObject = new BaseModel(JSON);
        return defaultObject;
    }
}
