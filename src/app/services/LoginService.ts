 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs"; 
import { Usuario } from "../models/usuario/Usuario";

@Injectable({
    providedIn: 'root'
  })
export class LoginService{

    email = ""
    token = ""

    constructor(
        private http: HttpClient
    ){}
 
    saveToken(email: string, token: string){
        this.email = email
        this.token = token
    }

    buscaCadastro(email: string): Observable<Usuario>{
        const options = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
      return   this.http.get<Usuario>("http://localhost:9096/api/v1/user/" + email, { 'headers': options })  
    }


}