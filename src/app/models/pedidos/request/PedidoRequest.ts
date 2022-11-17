import { CardHolder } from "src/app/models/checkouts/CardHolder"; 
import { ProdutoPedido } from "../../produto/ProdutoPedido";
import { Usuario } from "../../usuario/Usuario";
import { Registro } from "../Registro";
 

export class PedidoRequest{ 
 
    constructor(  
        public registro?: Registro,
        public produtos: ProdutoPedido[]= [],
        public total: number = 0,
        public desconto: number = 0,
        public itens: number = 0,
        public usuario: Usuario = new Usuario  
    ){}
}