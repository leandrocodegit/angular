import { Parcela } from "./Parcela";

 

export class FormularioCartao {
    

    constructor(
       public token: string = "",
       public issuer: string = "",
       public cartao: string = "",
       public mes: string = "",
       public ano: string = "",
       public cvv: string = "", 
       public amount: number = 0,
       public descricao: string = "",
       public payment_method_id: string = "",
       public transaction_amount: string = "",
       public installments: number = 1,       
       public numero_pedido: number = 0,
       public nome: string = "",
       public nomeCartao: string = "",
       public email: string = "",
       public documento: string = "",
       public parcela: Parcela = new Parcela
    ) {}
}