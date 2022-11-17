import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { Endereco } from "../models/usuario/Endereco";

@Injectable({
    providedIn: 'root'
  })
export class EnderecoService{

    constructor(private httpClient: HttpClient){}
 
    findAddressByCep(cep: string): Observable<Endereco> {  
        return  this.httpClient.get<Endereco>("https://viacep.com.br/ws/" + cep +"/json")             
    }

}