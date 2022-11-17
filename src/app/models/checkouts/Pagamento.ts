import { PaymentPointOfInteraction } from "./PaymentPointOfInteraction";

export class Pagamento{ 
    constructor( 
        public id: number = 0,
 //       public dataCriacao: Date,
 //       public dataAprovacao: Date,
 //       public ultimaAtualizacao: Date,
 //       public dataExpiracao: Date,
 //       public dataEstorno: Date, 
        public issuerId: string = "",
        public metodoPagamento: string = "",
        public status: string = "",
        public detalhes: string = "",
        public valor: number = 0,
        public total: number = 0,
        public descontos: number = 0,
        public valorParcela: number = 0,
        public parcelas: number = 0,
        public quatroDigitosCartao: string = "",
        public qrCodeBase64: string = "",
        public qrCode: string = "",
        public url: string = "",
        public barcode: string = "",
    ){}

}