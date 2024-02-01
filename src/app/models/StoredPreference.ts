
import { HelperService } from '../services/helpers/helper-service';
import { BaseModel } from './BaseModel';
import { User } from './user';

export class StoredPreference {
    public LoggedInStatus: boolean;
    public LoggedInUser: User;
    public LoggedInUserId: number;
    public LoggedInUserEmail: string;
    public LoggedInUserName: string;
    public SelectedLanguage: string;
    constructor(requestJSON: JSON)  {
    }
   
}
