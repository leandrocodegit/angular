import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs" 
import { QRCode } from "src/app/models/qrcode/QRCode";

@Injectable({
    providedIn: 'root'
  })
export class ProdutoService{

    constructor(private httpClient: HttpClient){}
 
    buscaQRCode(id: string): Observable<QRCode> { 
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*" 
            })
          }; 
        return this.httpClient.get<QRCode>('http://localhost:9095/api/v1/qrcode/' + id,  options)
    }

}