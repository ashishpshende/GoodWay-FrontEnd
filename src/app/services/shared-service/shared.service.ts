import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currencySymbol:string;
  geoLattitude:number;
  geoLongitude:number;
  constructor() {
    this.currencySymbol =  '$'
   }
}
