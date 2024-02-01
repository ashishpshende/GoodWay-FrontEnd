import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Authentication/authentication.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private localStorageService:LocalStorageService,
    private router:Router) { }
  async  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>
  {    
    console.log("canActivate: Route: ", state.url);//'candidates'
    if(this.localStorageService!=null)
    {
        if (!this.localStorageService.StoredPreference.LoggedInStatus) {
          this.router.navigate(['/login']);
          return false;
        }      
    }
  }

  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("canActivateChild: Route: ", state.url);//'candidates'
  }
}