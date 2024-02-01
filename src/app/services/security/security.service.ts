import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor() { }

  hash(inputText)
  {
    var result = "";
    for (let index = 0; index < inputText.length; index++) {
      const element = inputText[index];
      result += (element.charCodeAt(0).toString(16)+"-");    
    }
    result = result.substring(0, result.length - 1);
   return result; 
  }

}
