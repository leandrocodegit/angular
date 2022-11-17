import { Payer } from "./Payer"

export class PaymentRequest {
     
    token: string
    issuerId: string
    paymentMethodId: string
    transactionAmount: string
    installments: number
    numeroPedido: number
    payer: Payer
 

    constructor(
        token: string,
        issuerId: string,
        paymentMethodId: string,
        transactionAmount: string,
        installments: number,
        numeroPedido: number,
        payer: Payer
    ) {
        this.token = token
        this.issuerId = issuerId        
        this.paymentMethodId = paymentMethodId
        this.transactionAmount = transactionAmount 
        this.installments = installments
        this.numeroPedido = numeroPedido
        this.payer = payer 
    }
}