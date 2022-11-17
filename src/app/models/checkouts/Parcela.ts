import { Payer } from "./Payer"

export class Parcela {    

    constructor(
        public parcelas: number = 1, 
        public valorParcela: number = 0,
        public totalAmount: number = 0,
        public format: string = "",
        public juros: number = 0
    ) {}
}  