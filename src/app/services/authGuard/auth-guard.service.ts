import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private localStorageService:LocalStorageService,
    private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> {
    
      if(this.localStorageService!=null)
      {
          if (!this.localStorageService.StoredPreference.LoggedInStatus) {
            this.router.navigate(['/login']);
            return Promise.resolve(false);
          }      
      }
      return Promise.resolve(true);
  }
  

  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  }
}