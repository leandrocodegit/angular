 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs"; 
import { BEARER, HEADERS, HOST } from "src/app/models/enuns/BEARER";
import { Usuario } from "../../models/usuario/Usuario";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService{

    email = ""
    token = ""

    constructor(
        private http: HttpClient
    ){}
 
    saveToken(email: string, token: string){
        this.email = email
        this.token = token
    }

    buscaUsuario(): Observable<Usuario>{ 
     var options =  HEADERS.headers 
        .set('type', localStorage.getItem('type') as string)
        .set('token', localStorage.getItem('token') as string) 
      return  this.http.get<Usuario>( HOST + "/usuario", { 'headers': options })
    }

    atualizarUsuario(user: Usuario): Observable<Usuario>{
      return this.http.patch<Usuario>( HOST + "/usuario", JSON.stringify(user) , HEADERS)
    }


}