/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../network/network.service';
import { SecurityService } from '../security/security.service';


export class VisualizationURLs
{
  public static GET_LOCALIZATION_BY_SHOW_BY_FIELD_APP_SCRIPT = environment.appScriptApiURL +  '?sheetid='+ environment.SpreadsheetId +'&visualize=chart&showby={SHOW_BY}&sheetname=Vehicles';
}

@Injectable({
  providedIn: 'root'
})
export class VisualizationService
{
  public showBy = new Array<string>();
  constructor(private securityService: SecurityService,
    private networkService: NetworkService) {
      this.LoadMetaData();
    }

    LoadMetaData(){      
    }
    loadVisualization(selectedField: string, success: (any), failure: (any)){
      this.networkService.get(VisualizationURLs.GET_LOCALIZATION_BY_SHOW_BY_FIELD_APP_SCRIPT.replace('{SHOW_BY}', selectedField),response=>{
        success(response);
      },error=>{
          console.log('Error:' + error);
          failure();
      });
    }
}
