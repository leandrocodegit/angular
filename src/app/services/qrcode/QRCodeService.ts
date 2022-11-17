import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";  
import { BEARER, HEADERS, HOST } from "src/app/models/enuns/BEARER";
import { QRCode } from "src/app/models/qrcode/QRCode";

@Injectable({
    providedIn: 'root'
  })
export class QRCodeService{

    constructor(private httpClient: HttpClient){}
 
    findQRcodeById(id: string): Observable<QRCode> { 
        console.log("Buscando " + id)
        return  this.httpClient.get<QRCode>( HOST + "/qrcode/" + id + "/false", HEADERS)             
    }

}