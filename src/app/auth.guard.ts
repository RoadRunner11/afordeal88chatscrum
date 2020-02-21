import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SrumdataService } from './srumdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private _scrumdataService: SrumdataService, private _router:Router){}


  canActivate(): boolean{
    if (this._scrumdataService.loggedIn()){
      return true
    }else{
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
