import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    email = ""
    token = ""

    constructor(private httpClient: HttpClient) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error("Method not implemented.");
    }

    logout(): string {
        return localStorage.getItem('token')!;
    }

    saveToken(email: string, token: string) {

        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', token); 

        const options = new HttpHeaders()
            .set('Authorization', 'Bearer ' + token);
        this.httpClient.post<User>("https://www.googleapis.com/oauth2/v3/userinfo", "", { 'headers': options }).subscribe(result => {
            localStorage.setItem('name', result.name!);
            localStorage.setItem('picture', result.picture!);
            localStorage.setItem('email', result.email!);
        })
    }

}


 