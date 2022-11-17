
import { Status } from "../enuns/Status";
import { Usuario } from "../../models/usuario/Usuario";
import { Pagamento } from "../checkouts/Pagamento";
import { ProdutoPedido } from "../produto/ProdutoPedido"; 

export class Pedido {

    constructor(
        public id: string = "",
        public identificador: number = 0,
        public produtos: ProdutoPedido[] = [],
        public subTotal: number = 0,
        public total: number = 0,
        public desconto: number = 0,
        public itens: number = 0,
        public usuario: Usuario = new Usuario,
        public dataPedido?: Date,
        public dataEntregaga?: Date,
        public dataCancelamento?: Date,
        public ultimaAtualizacao?: Date,
        public status: string = Status.NEW,  
        public pagamento: Pagamento = new Pagamento
    ) {}
}