import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardHolder } from "../models/checkouts/CardHolder";
import { ResponseCheckout } from "../models/checkouts/ResponseCheckout";
import { HEADERS, HOST } from "../models/enuns/BEARER";


@Injectable({
    providedIn: 'root'
})
export class PaymentService {


    constructor(private httpClient: HttpClient) { }

    responsePay = {} as ResponseCheckout

    processPayment(card: CardHolder): Observable<ResponseCheckout> {
        return this.httpClient.post<ResponseCheckout>(HOST + "/pay/card", JSON.stringify(card), HEADERS)
    }



}