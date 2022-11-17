 
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

 
@Injectable()
 
export class AuthController implements HttpInterceptor {

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let str = req.url;
    console.log('STR' + str)
    return next.handle(req);
  }
   
 
}
