import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private isAutorized = false;

  constructor() { }

  login(login: boolean){
    console.log("login(login: boolean) " + login)
    this.isAutorized = login;
  }
  
  isUserLoged(){
    return this.isAutorized;
  }
}
