import { Payer } from "./Payer"

export class CardHolder {
    

    constructor(
        public token: string = "", 
        public metodoPagamento: string = "",
        public valor: string = "",
        public parcelas: number = 0,
        public numeroPedido: string = "",
        public usuario: Payer = new Payer
    ) {}
}